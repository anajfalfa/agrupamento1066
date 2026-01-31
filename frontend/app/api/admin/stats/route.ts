import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth-utils";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !isAdmin(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const [
            totalUsers,
            activeScouts,
            pendingRequests,
            urgentRequests,
            lowStockItems
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({ where: { role: "SCOUT" } }),
            prisma.request.count({ where: { status: "PENDING" } }),
            prisma.request.count({
                where: {
                    status: "PENDING",
                    createdAt: { lt: new Date(Date.now() - 48 * 60 * 60 * 1000) } // Older than 48h as "urgent"
                }
            }),
            prisma.inventoryItem.count({
                where: {
                    quantity: { lte: prisma.inventoryItem.fields.minQuantity }
                }
            })
        ]);

        return NextResponse.json({
            stats: {
                totalUsers,
                activeScouts,
                pendingRequests,
                urgentRequests,
                lowStockItems
            }
        });
    } catch (error) {
        console.error("Stats API Error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}

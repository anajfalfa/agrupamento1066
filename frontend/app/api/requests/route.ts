import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

// GET requests
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const type = searchParams.get("type");
    const userId = searchParams.get("userId");

    // If not leader, can only see their own requests
    const effectiveUserId = isLeader(session.user as any) ? userId : (session.user as any).id;

    try {
        const requests = await prisma.request.findMany({
            where: {
                status: status || undefined,
                type: type || undefined,
                userId: effectiveUserId || undefined,
            },
            include: {
                user: { select: { name: true, email: true, scoutNumber: true } },
                items: {
                    include: { inventoryItem: true }
                }
            },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(requests);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
}

// POST new request (Any user)
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { type, details, items } = body; // items: [{ id, quantity }]

        const newRequest = await prisma.request.create({
            data: {
                type,
                details,
                userId: (session.user as any).id,
                items: {
                    create: items.map((item: any) => ({
                        inventoryItemId: item.id,
                        quantity: item.quantity,
                    })),
                },
            },
        });

        return NextResponse.json(newRequest);
    } catch (error) {
        console.error("Create request error:", error);
        return NextResponse.json({ error: "Failed to create request" }, { status: 500 });
    }
}

// PATCH update request status (Leader only)
export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, status } = body;

        const requestToUpdate = await prisma.request.findUnique({
            where: { id },
            include: { items: true },
        });

        if (!requestToUpdate) return NextResponse.json({ error: "Request not found" }, { status: 404 });

        // If APPROVED, handle specific logic
        if (status === "APPROVED" && requestToUpdate.status !== "APPROVED") {
            // 1. Decrement inventory stock for material/uniforms
            for (const item of requestToUpdate.items) {
                await prisma.inventoryItem.update({
                    where: { id: item.inventoryItemId },
                    data: { quantity: { decrement: item.quantity } },
                });
            }

            // 2. Increment field nights for the user if it's a validation request
            if (requestToUpdate.type === "FIELD_NIGHT_VALIDATION" && requestToUpdate.details) {
                try {
                    const fieldNightData = JSON.parse(requestToUpdate.details);
                    const nightsCount = parseInt(fieldNightData.nights || "0");

                    if (nightsCount > 0) {
                        await prisma.scoutInfo.update({
                            where: { userId: requestToUpdate.userId },
                            data: { fieldNights: { increment: nightsCount } },
                        });
                    }
                } catch (e) {
                    console.error("Failed to parse field night details during approval", e);
                }
            }
        }

        const updatedRequest = await prisma.request.update({
            where: { id },
            data: {
                status,
                reviewedBy: session.user?.name || "Unknown",
                reviewedAt: new Date(),
            },
        });

        return NextResponse.json(updatedRequest);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update request" }, { status: 500 });
    }
}

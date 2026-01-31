import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader, canChangeRoles } from "@/lib/auth-utils";

// GET all users (Admin only)
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const users = await prisma.user.findMany({
            include: {
                scoutInfo: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// PATCH update user (Admin only)
export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, scoutNumber, role, status, section, managedSection } = body;

        // Check if user has permission to change roles
        if (role && !canChangeRoles(session.user as any)) {
            return NextResponse.json({ error: "No permission to change roles" }, { status: 403 });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                scoutNumber: scoutNumber !== undefined ? scoutNumber : undefined,
                role: role !== undefined ? role : undefined,
                status: status !== undefined ? status : undefined,
                managedSection: managedSection !== undefined ? managedSection : undefined,
                scoutInfo: section !== undefined ? {
                    upsert: {
                        create: { section },
                        update: { section }
                    }
                } : undefined
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Update user error:", error);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
    }
}

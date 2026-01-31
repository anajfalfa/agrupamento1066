import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const user = await prisma.user.findUnique({
            where: { id: (session.user as any).id },
            include: { scoutInfo: true }
        });

        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        // Don't send password
        const { password, ...safeUser } = user;
        return NextResponse.json(safeUser);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { birthDate } = body;

        const user = await prisma.user.update({
            where: { id: (session.user as any).id },
            data: {
                scoutInfo: {
                    upsert: {
                        create: { birthDate: new Date(birthDate) },
                        update: { birthDate: new Date(birthDate) }
                    }
                }
            }
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error("Profile update error:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}

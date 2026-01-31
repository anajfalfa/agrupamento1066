import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    try {
        const reservations = await prisma.reservation.findMany({
            where: {
                type: type || undefined,
                status: status || undefined,
            },
            include: {
                user: { select: { name: true, email: true } },
                payments: true,
            },
            orderBy: { startDate: 'desc' },
        });

        return NextResponse.json(reservations);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reservations" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const body = await request.json();
        const { title, description, startDate, endDate, type, location } = body;

        const reservation = await prisma.reservation.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                type,
                location,
                userId: (session.user as any).id,
            }
        });

        return NextResponse.json(reservation);
    } catch (error) {
        console.error("Reservation creation error:", error);
        return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, status } = body;

        const reservation = await prisma.reservation.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(reservation);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update reservation" }, { status: 500 });
    }
}

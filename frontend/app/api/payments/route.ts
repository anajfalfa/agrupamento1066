import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    try {
        const payments = await prisma.payment.findMany({
            where: {
                status: status || undefined,
                // If not leader, only see own payments
                userId: isLeader(session.user as any) ? undefined : (session.user as any).id,
            },
            include: {
                user: { select: { name: true, scoutNumber: true } },
                reservation: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(payments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { amount, userId, reservationId, method, reference } = body;

        const payment = await prisma.payment.create({
            data: {
                amount,
                userId,
                reservationId,
                method,
                reference,
                status: "PENDING",
            }
        });

        return NextResponse.json(payment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, status, paidAt } = body;

        const payment = await prisma.payment.update({
            where: { id },
            data: {
                status,
                paidAt: paidAt ? new Date(paidAt) : undefined,
            }
        });

        return NextResponse.json(payment);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
    }
}

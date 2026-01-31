import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");
    const month = searchParams.get("month"); // e.g., "2026-01"

    try {
        // 1. Fetch Events
        const events = await prisma.event.findMany({
            where: {
                OR: [
                    { section: null }, // Global events
                    { section: section as any || undefined }, // Specific section
                ]
            },
            orderBy: { startDate: 'asc' },
        });

        // 2. Fetch Birthdays (for the month if provided)
        // In SQLite we might need to fetch all and filter or use raw query for date parts
        // Let's fetch all scouts birthdates and filter in JS for simplicity with SQLite
        const usersWithBirthdays = await prisma.scoutInfo.findMany({
            where: {
                birthDate: { not: null },
                section: section as any || undefined,
            },
            include: {
                user: { select: { name: true } }
            }
        });

        const birthdays = usersWithBirthdays.map((info: any) => ({
            id: `bday-${info.id}`,
            title: `Aniversário: ${info.user.name}`,
            startDate: info.birthDate,
            type: "BIRTHDAY",
            userName: info.user.name
        }));

        return NextResponse.json({ events, birthdays });
    } catch (error) {
        console.error("Events fetch error:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

// POST new event (Leader only)
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, startDate, endDate, location, section } = body;

        const event = await prisma.event.create({
            data: {
                title,
                description,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                location,
                section,
            }
        });

        return NextResponse.json(event);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}

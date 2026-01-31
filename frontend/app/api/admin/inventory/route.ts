import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

// GET inventory items
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    // Minimal session check - leaders can see everything, scouts maybe just icons/names 
    // but for admin panel we definitely need leader check
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    try {
        const items = await prisma.inventoryItem.findMany({
            where: category ? { category } : {},
            orderBy: { name: 'asc' },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
    }
}

// POST new item (Leader only)
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { name, description, category, quantity, minQuantity } = body;

        const newItem = await prisma.inventoryItem.create({
            data: {
                name,
                description,
                category,
                quantity: parseInt(quantity),
                minQuantity: parseInt(minQuantity || 0),
            },
        });

        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
    }
}

// PATCH update item (Leader only)
export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (data.quantity !== undefined) data.quantity = parseInt(data.quantity);
        if (data.minQuantity !== undefined) data.minQuantity = parseInt(data.minQuantity);

        const updatedItem = await prisma.inventoryItem.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
}

// DELETE item (Leader only)
export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "No permission" }, { status: 403 });
    }

    try {
        const { id } = await request.json();
        await prisma.inventoryItem.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
}

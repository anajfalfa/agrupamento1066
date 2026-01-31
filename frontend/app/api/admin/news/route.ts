import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { isLeader } from "@/lib/auth-utils";

export async function GET(request: Request) {
    try {
        const news = await prisma.news.findMany({
            include: {
                author: { select: { name: true } }
            },
            orderBy: { publishedAt: 'desc' },
        });

        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, content, imageUrl } = body;

        const post = await prisma.news.create({
            data: {
                title,
                content,
                imageUrl,
                authorId: (session.user as any).id,
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, title, content, imageUrl } = body;

        const post = await prisma.news.update({
            where: { id },
            data: { title, content, imageUrl }
        });

        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !isLeader(session.user as any)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        await prisma.news.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}

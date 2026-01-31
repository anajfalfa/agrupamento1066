import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth-server";

export async function POST(req: Request) {
    try {
        const { name, email, password, nii } = await req.json();

        if (!email || !email.includes("@") || !password || password.trim().length < 7) {
            return NextResponse.json(
                { message: "Invalid input. Password should be at least 7 characters long." },
                { status: 422 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User exists already!" },
                { status: 422 }
            );
        }

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                scoutNumber: nii, // Mapping 'nii' from form to 'scoutNumber' in schema
                role: "SCOUT",
                status: "PENDING", // New users start as pending
            },
        });

        return NextResponse.json(
            { message: "User created!", userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Something went wrong." },
            { status: 500 }
        );
    }
}

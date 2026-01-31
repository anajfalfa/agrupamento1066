import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth-server";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                    include: {
                        scoutInfo: {
                            select: { section: true }
                        }
                    }
                });

                if (!user) {
                    return null;
                }

                // Check if user is approved
                if ((user as any).status !== "APPROVED") {
                    throw new Error("A tua conta ainda não foi aprovada pelo Chefe de Agrupamento.");
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    return null;
                }

                return {
                    id: user.id + "",
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    scoutNumber: user.scoutNumber,
                    section: user.scoutInfo?.section,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role,
                    id: token.id,
                    scoutNumber: token.scoutNumber,
                    section: token.section,
                    status: token.status,
                },
            };
        },
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: (user as any).role,
                    id: user.id,
                    scoutNumber: (user as any).scoutNumber,
                    section: (user as any).section,
                    status: (user as any).status,
                };
            }
            return token;
        },
    },
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

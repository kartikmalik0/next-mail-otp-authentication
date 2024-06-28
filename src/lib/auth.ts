import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../libs/db";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials?.password as string;
                const user = await prisma.user.findUnique({
                    where: { email },
                });

                if (user && user.emailVerified) {
                    // Compare the password with the hashed password in the database
                    const isValidPassword = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (isValidPassword) {
                        // Return the user object
                        return {
                            id: user.id,
                            email: user.email,
                            isEmailVerified: user.emailVerified,
                        };
                    }
                }

                return null;
            },
        }),
    ],
});

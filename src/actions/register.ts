"use server";

import prisma from "@/libs/db";
import { hash } from "bcrypt";

export async function handleRegister(data: any) {
    const { email, password } = data;
    const hashedPassword = await hash(password, 10);
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser?.password != "") {
            throw new Error("User Already Exists");
        }

        const newUser = await prisma.user.update({
            where: { email },
            data: {
                email,
                password: hashedPassword,
                emailVerified: true,
            },
        });
        const { password: newUserPassword, ...rest } = newUser;
        return rest;
    } catch (error) {
        if ((error as Error).message === "User Already Exists") {
            throw error;
        }
        throw new Error("Error in inserted");
    }
}

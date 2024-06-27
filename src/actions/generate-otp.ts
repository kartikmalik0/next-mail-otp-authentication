"use server";

import prisma from "@/libs/db";
import { generateEmail } from "./generate-email";

export async function generateOtp(email: any) {
    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    try {
        const user = await prisma.user.upsert({
            where: { email },
            update: {
                otp: otp.toString(),
                otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000), //15 minutes
            },
            create: {
                email,
                password: "",
                otp: otp.toString(),
                otpExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });
        if (user) {
            const res = await generateEmail({ email, otp });
            return {res,otp}
        }
    } catch (error) {
        throw new Error("Failed to Generate Otp");
    }
}



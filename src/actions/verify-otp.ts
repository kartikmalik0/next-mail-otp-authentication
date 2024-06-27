"use server"
import prisma from "@/libs/db";

export async function verifyOtp({email,otp}:{email:string,otp:any}) {
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user || user.otp != otp || user?.otpExpiresAt < new Date()){
            throw new Error("Invalid or expired OTP")
        }

        // OTP is valid, mark it as verified
        await prisma.user.update({
            where: { email },
            data: { otp: null, otpExpiresAt: null },
        });

        return true
    } catch (error) {
        throw new Error("Failed to verify")
    }
}
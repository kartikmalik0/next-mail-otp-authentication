"use server";
import nodemailer from "nodemailer";

 export async function generateEmail({email, otp}:{email:string,otp:any}) {
    const transporter = nodemailer.createTransport({
        host:"smtp.resend.com",
        port:465,// or any other email service you prefer
        auth: {
          user: "resend", // your email address
          pass: "re_fRR3GEQk_ExSCwfPqnBm9WP8HPGz1CCnR", // your email password
        },
      });

      const mailOptions = {
        from: "onboarding@resend.dev",
        to: "kartik20044@gmail.com",
        subject: "OTP for registration",
        text: `Email: ${email}\nOtp: ${otp}`
    };

    try {
       const res = await transporter.sendMail(mailOptions);
        return res
    } catch (error) {
        throw new Error("Failed to Send OTP");
    }

}

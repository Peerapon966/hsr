import nodemailer from "nodemailer";
import sendOtpEmail from "@/assets/email/sendOtpEmail";
import { Logger } from "@/logger";

type sendEmail = {
  email: string;
  otp: string;
};

export async function sendOTP(props: sendEmail) {
  const emailContent = sendOtpEmail({ otp: props.otp });
  const transportConfigs = {
    host: process.env.SMTP_HOST?.toString(),
    port: Number(process.env.SMTP_PORT),
    secure: false,
  };
  const mailConfigs = {
    from: process.env.MAIL_SENDER_ADDRESS || "noreply@domain.com",
    to: props.email,
    subject: emailContent.subject,
    html: emailContent.body,
    attachments: [
      {
        filename: "hyv_logo.png",
        path: "public/shared/hyv_logo.png",
        cid: "hyv_logo",
      },
    ],
  };

  try {
    const transporter = nodemailer.createTransport(transportConfigs);
    await transporter.sendMail(mailConfigs);
  } catch (error) {
    Logger.error(error, "An error occurred at: sendOTP.ts");
    throw new Error(error as string);
  }
}

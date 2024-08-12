import nodemailer from 'nodemailer';
import sendOtpEmail from '@/assets/email/sendOtpEmail';
import Logger from "@/logger";

type sendEmail = {
  registrantEmail: string,
  otp: string
}

export default async function sendOTP(props: sendEmail) {
  const emailContent = sendOtpEmail({ otp: props.otp });
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST?.toString(),
      port: Number(process.env.SMTP_PORT),
      secure: false
    });
    await transporter.sendMail({
      from: process.env.MAIL_SENDER_ADDRESS || 'noreply@domain.com',
      to: props.registrantEmail,
      subject: emailContent.subject,
      html: emailContent.body,
      attachments: [{
        filename: 'hyv_logo.png',
        path: 'public/shared/hyv_logo.png',
        cid: 'hyv_logo'
      }]
    });
  } catch (error) {
    Logger.error(error, 'An error occurred at: sendOTP.ts')
    throw new Error(error as string)
  }
}
import { PrismaClient } from "@prisma/client";
import { customizeError } from "@/api/utils";
import Logger from "@/logger";

type getOTP = {
  registrantEmail: string
}

export default async function generateOTP(props: getOTP): Promise<string> {
  const prisma = new PrismaClient();
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    await prisma.register_users.upsert({
      where: {
        email: props.registrantEmail
      },
      update: {
        verification_code: otp
      },
      create: {
        email: props.registrantEmail,
        verification_code: otp
      }
    });
  } catch (error) {
    Logger.error(error, 'An error occurred at: generateOTP.ts')
    throw error
  }

  return otp
}
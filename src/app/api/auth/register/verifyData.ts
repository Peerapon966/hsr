import { PrismaClient } from "@prisma/client";
import { UserRegisterData, IRegistrantData, IUser, IResult } from "@/api/ApiInterface";
import { checkTimeDiffExceed } from "@/api/utils";
import Logger from "@/logger";

/**
 * Check if the registration data a user has filled in is valid or not.
 * @param {IRegisterUserData} formData Registration data a user has filled in the form.
 * @returns Return true if the registration data is valid, return false otherwise.
 */
export default async function verifyData(formData: UserRegisterData): Promise<IResult> {
  const prisma = new PrismaClient();
  let registrant: IRegistrantData | null;
  let user: IUser | undefined;
  let isOTPIncorrect: boolean = true;
  let isOTPExpired: boolean = true;

  try {
    registrant = await prisma.register_users.findUnique({
      where: {
        email: formData.email
      },
      select: {
        email: true,
        verification_code: true,
        updated_at: true
      }
    });
  } catch (error) {
    Logger.error(error, 'An error occurred at: verifyData.ts')
    throw error
  }

  if (registrant && formData) {
    isOTPIncorrect = formData.verification_code !== registrant.verification_code;
    isOTPExpired = checkTimeDiffExceed(Number(process.env.OTP_LIFESPAN) ?? 15, registrant.updated_at as Date);
  }

  console.log(formData)
  console.log(registrant)
  console.log(user)
  console.log('isOTPIncorrect: ', isOTPIncorrect)
  console.log('isOTPExpired: ', isOTPExpired)

  if (isOTPIncorrect || isOTPExpired) {
    return {
      result: false,
      message: 'Send verification code'
    }
  }

  return {
    result: true
  }
}
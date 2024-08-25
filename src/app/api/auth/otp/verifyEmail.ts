import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { OtpError } from "@/api/utils/response/otpError";
import { PrismaClient } from "@prisma/client";
import { Logger } from "@/logger";

/**
 * Check if an email is valid and not taken yet or not
 *
 * @param {email} email an email to be registered
 * @returns {ApiSuccessResponse | OtpError}
 */
export async function verifyEmail(
  email: string
): Promise<ApiSuccessResponse | OtpError> {
  const response = new ApiResponse();
  const otpError = new OtpError();
  const prisma = new PrismaClient();

  // check if the email is valid or not (bad reputation, etc.)
  // should be replaced with proper tools later
  const passed = Math.floor(Math.random() * 10) <= 8 ? true : false;
  if (!passed) {
    return response
      .error(otpError)
      .invalidEmail({ messageToUser: "Invalid email. Please try another." });
  }

  // check if there's no existing user with the email
  try {
    const user = await prisma.users.findFirst({
      select: {
        email: true,
      },
      where: {
        email: email,
      },
    });

    if (user) {
      return response.error(otpError).emailTaken();
    }
  } catch (error) {
    Logger.error(error, "An error occurred at: verifyEmail.ts");
    return response.error(otpError).internalErrorOccurred();
  }

  return response.success();
}

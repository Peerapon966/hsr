import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { OtpError } from "@/api/utils/response/otpError";
import { prisma } from "@/api/utils/prisma";

/**
 * Check if an email is valid and not taken yet or not
 *
 * @param {string} email an email to be registered
 * @returns {ApiSuccessResponse | OtpError}
 */
export async function verifyEmail(
  email: string
): Promise<ApiSuccessResponse | OtpError> {
  const response = new ApiResponse();
  const otpError = new OtpError();

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
    const user = await prisma.user.findFirst({
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
    throw error;
  }

  return response.success();
}

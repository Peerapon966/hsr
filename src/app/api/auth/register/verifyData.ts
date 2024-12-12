import { prisma } from "@/api/utils/prisma";
import { RegisterFormData, RegistrantData, UserData } from "@/api/ApiInterface";
import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { RegisterError } from "@/api/utils/response/registerError";
import { checkTimeDiffExceed } from "@/api/utils/checkTimeDiffExceed";
import { Logger } from "@/logger";
import { z, ZodType } from "zod";

/**
 * Check if the registration data a user has filled in is valid or not.
 * @param {IRegisterUserData} formData Registration data a user has filled in the form.
 * @returns Return true if the registration data is valid, return false otherwise.
 */
export async function verifyData(
  formData: RegisterFormData
): Promise<ApiSuccessResponse | RegisterError> {
  const response = new ApiResponse();
  const registerError = new RegisterError();
  let registrant: RegistrantData | null;
  let user: Pick<UserData, "email" | "username"> | null;
  let isOTPIncorrect: boolean = true;
  let isOTPExpired: boolean = true;

  const formDataSchema: ZodType<RegisterFormData> = z
    .object({
      email: z
        .string()
        .min(1, { message: "Email cannot be empty" })
        .email({ message: "Invalid email format" }),
      verification_code: z
        .string()
        .min(1, { message: "Send verification code" }),
      password: z
        .string()
        .min(1, { message: "Password cannot be empty" })
        .regex(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~`! @#$%^&*()-_+={}[]|\;:"<>,.\/?])[A-Za-z\d~`! @#$%^&*()-_+={}[]|\;:"<>,.\/?]{8,32}$/g,
          {
            message:
              "Password must be 8–30 characters and a combination of numbers, letters, or special characters",
          }
        ),
      confirm_password: z
        .string()
        .min(1, { message: "Password confirmation cannot be empty" }),
      policy_agreement: z.literal("on", {
        message:
          "Please agree to the HoYoverse Account Terms of Service and Privacy Policy",
      }),
    })
    .superRefine(({ password, confirm_password }, ctx) => {
      {
        if (password !== confirm_password) {
          ctx.addIssue({
            code: "custom",
            message:
              "Please make sure the password you enter both times is the same",
            path: ["confirm_password"],
          });
        }
      }
    });

  // check register form data sent from the client (in case the client try to do something funny, e.g., bypassing disabled Register button)
  try {
    const formDataVerifyResults = formDataSchema.safeParse(formData);
    if (!formDataVerifyResults.success) {
      return response.error(registerError).invalidInputFormData({
        messageToUser: formDataVerifyResults.error.issues[0].message,
      });
    }
  } catch (error) {
    Logger.error(error, "An error occurred at: verifyData.ts");
    throw error;
  }

  // Get registrant information for checking email and otp
  // Try to get user information with the same email (expect the user to be null if the email is not already taken yet)
  try {
    registrant = await prisma.registrant.findUnique({
      where: {
        email: formData.email,
      },
      select: {
        email: true,
        verification_code: true,
        updated_at: true,
      },
    });

    user = await prisma.user.findUnique({
      where: {
        email: formData.email,
      },
      select: {
        email: true,
        username: true,
      },
    });
  } catch (error) {
    Logger.error(error, "An error occurred at: verifyData.ts");
    throw error;
  }

  // If this runs, it means the registrant information doesn't get recorded properly when the registrant requests an otp
  if (!registrant) {
    Logger.info(
      formData,
      "Registrant with the specified email/username not found"
    );
    return response.error(registerError).internalErrorOccurred();
  }

  if (user) {
    return response.error(registerError).emailTaken();
  }

  isOTPIncorrect = formData.verification_code !== registrant.verification_code;
  isOTPExpired = checkTimeDiffExceed(
    Number(process.env.OTP_LIFESPAN) ?? 15,
    registrant.updated_at as Date
  );

  if (isOTPIncorrect) {
    return response
      .error(registerError)
      .otpWrong({ messageToUser: "Send verification code" });
  }

  if (isOTPExpired) {
    return response
      .error(registerError)
      .otpExpired({ messageToUser: "Send verification code" });
  }

  return response.success();
}

import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/api/utils/response/apiResponse";
import { OtpError } from "@/api/utils/response/otpError";
import { verifyEmail } from "./verifyEmail";
import { generateOTP } from "./generateOTP";
import { sendOTP } from "./sendOTP";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;
  const response = new ApiResponse();
  const otpError = new OtpError();
  const emailVerificationResult = await verifyEmail(email);

  if (!emailVerificationResult.success) {
    return NextResponse.json(emailVerificationResult, { status: 400 });
  }

  try {
    const otp = (await generateOTP(email)).data.otp;
    await sendOTP({ email: email, otp: otp });
  } catch (error) {
    return NextResponse.json(response.error(otpError).internalErrorOccurred(), {
      status: 500,
    });
  }

  return NextResponse.json(response.success({ messageToUser: "OTP Sent" }), {
    status: 200,
  });
}

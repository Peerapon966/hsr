"use server";

import { ApiSuccessResponse } from "@/api/utils/response/apiResponse";
import { OtpError } from "@/api/utils/response/otpError";

type SendOTPProps = {
  payload: {
    email: string;
  };
};

export async function sendOTP(
  props: SendOTPProps
): Promise<ApiSuccessResponse | OtpError> {
  const payload = props.payload;
  const response = await fetch(`${process.env.BASE_URL}/api/auth/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  const data = await response.json();

  return data;
}

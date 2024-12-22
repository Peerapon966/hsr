"use server";

import { ApiSuccessResponse } from "@/api/utils/response/apiResponse";
import { OtpError } from "@/api/utils/response/otpError";
import { headers } from "next/headers";

type SendOTPProps = {
  payload: {
    email: string;
  };
};

export async function sendOTP(
  props: SendOTPProps
): Promise<ApiSuccessResponse | OtpError> {
  const ua = headers().get("x-user-agent") as string;
  const payload = props.payload;
  const response = await fetch(`${process.env.BASE_URL}/api/auth/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "x-user-agent": ua,
    },
    body: JSON.stringify(payload),
    cache: "no-cache",
  });

  const data = await response.json();

  return data;
}

import { proxyFetch } from "@/utils";

type SendOTPProps = {
  payload: {
    email: string
  }
}

export default async function sendOTP(props: SendOTPProps) {
  const payload = props.payload;
  const response = await fetch("/api/auth/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "X-Test-Header": "test header"
    },
    body: JSON.stringify(payload),
    cache: "no-cache"
  });

  const data = await response.json();

  return data
}
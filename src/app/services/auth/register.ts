"use server";

import { RegisterFormData } from "@/features/authentication/interface";
import { headers } from "next/headers";

export async function register(registrantData: RegisterFormData) {
  const ua = headers().get("x-user-agent") as string;
  const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
      "x-user-agent": ua,
    },
    body: JSON.stringify(registrantData),
    cache: "no-cache",
  });
  const data = await response.json();

  return data;
}

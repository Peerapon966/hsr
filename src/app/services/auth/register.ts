"use server";

import { RegisterFormData } from "@/features/authentication/interface";

export async function register(registerData: RegisterFormData) {
  const response = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(registerData),
    cache: "no-cache",
  });
  const data = await response.json();

  return data;
}

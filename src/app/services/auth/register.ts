import { UserRegisterData } from "@/features/authentication/interface";

export default async function register(registerData: UserRegisterData) {
  console.log('registerData: ', registerData)
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(registerData),
    cache: "no-cache"
  });
  const data = await response.json();
  console.log('register data: ', registerData)
  return data
};
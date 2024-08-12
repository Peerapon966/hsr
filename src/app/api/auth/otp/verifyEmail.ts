import { IResult } from "@/api/ApiInterface";

type verifyEmail = {
  registrantEmail: string
}

export default async function verifyEmail(props: verifyEmail): Promise<IResult> {
  const passrate = Math.floor((Math.random() * 10));
  let isValidEmail: boolean = (passrate >= 8) ? false : true;
  if (isValidEmail) {
    return { result: isValidEmail }
  }

  return {
    result: isValidEmail,
    message: 'Invalid email. Please try another.'
  }
}
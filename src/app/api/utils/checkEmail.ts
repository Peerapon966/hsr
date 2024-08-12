import { z } from "zod";

export default function checkEmail(input: string): boolean {
  const validator = z.string().email();
  const isEmail: boolean = validator.safeParse(input).success;
  return isEmail
}
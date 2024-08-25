import { z } from "zod";

export function checkEmail(input: string): boolean {
  const validator = z.string().email();
  const isEmail: boolean = validator.safeParse(input).success;
  return isEmail;
}

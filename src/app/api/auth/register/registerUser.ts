import argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';
import { IResult, UserRegisterData } from "@/api/ApiInterface";
import Logger from '@/logger';

export default async function registerUser(registerData: UserRegisterData): Promise<IResult> {
  const prisma = new PrismaClient();
  const email: string = registerData.email;
  const password: string = registerData.password;
  const hashedPassword: string = await argon2.hash(password, {
    type: argon2.argon2id,
    parallelism: 1,
    memoryCost: 9216,
    timeCost: 4
  });
  let result: boolean = false;

  try {
    // const username: string = await ExecuteQuery.getNewUsername();
    // query.execute({
    //   statement: 'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
    //   parameters: [email, username, hashedPassword]
    // });
  } catch (e) {
    Logger.error(e, 'An error occurred at registerUser.ts')
    throw e
  }

  result = true;

  return { result: result }
}
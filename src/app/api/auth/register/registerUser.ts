import argon2 from "argon2";
import { RegisterFormData } from "@/api/ApiInterface";
import {
  ApiResponse,
  ApiSuccessResponse,
} from "@/api/utils/response/apiResponse";
import { RegisterError } from "@/api/utils/response/registerError";
import { prisma } from "@/api/utils/prisma";
import { Logger } from "@/logger";

export async function registerUser(
  registrantData: RegisterFormData
): Promise<ApiSuccessResponse | RegisterError> {
  const response = new ApiResponse();
  const email: string = registrantData.email;
  const password: string = registrantData.password;
  const hashedPassword: string = await argon2.hash(password, {
    type: argon2.argon2id,
    parallelism: 1,
    memoryCost: 9216,
    timeCost: 4,
  });

  try {
    await prisma.$executeRaw`CALL get_username(@username);`;
    await prisma.$executeRaw`
      INSERT INTO User (id, username, email, password, updatedAt) VALUES (SUBSTRING(CONCAT('cm', REPLACE(UUID(), '-', '')), 1, 25), @username, ${email}, ${hashedPassword}, NOW(3)); 
    `;
    await prisma.registrant.delete({
      where: {
        email,
      },
    });
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }

  return response.success();
}

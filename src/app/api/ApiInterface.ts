import type { registrant as RegisterUsers } from "@prisma/client";

export type RegistrantData = Pick<
  RegisterUsers,
  "email" | "verification_code" | "updated_at"
>;

export type RegisterFormData = {
  email: string;
  verification_code: string;
  password: string;
  confirm_password: string;
  policy_agreement: "on";
};

export type UserLoginData = {
  email: string;
  password: string;
};

export interface UserData {
  email: string;
  username: string | null;
  password: string;
  token: string;
  token_issued_at: Date;
}

export type IUserNo = {
  value: number;
};

export type ISessionId = {
  value: string;
};

export type LoginWithUsernameCred = {
  username: string;
  password: string;
};

export type LoginWithEmailCred = {
  email: string;
  password: string;
};

export type UserLoginCred = LoginWithUsernameCred | LoginWithEmailCred;

import type { register_users as RegisterUsers } from "@prisma/client";

export type IRegistrantData = Pick<RegisterUsers, 'email' | 'verification_code' | 'updated_at'>

export interface UserRegisterData {
  email: string
  verification_code: string
  password: string
}

export type UserLoginData = {
  email: string
  password: string
}

export interface IUser {
  email: string
  username: string
  password: string
  token: string
  token_issued_at: Date
}

type Success = {
  result: true
}

type Failure = {
  result: false
  message: string
}

export type IResult = Success | Failure

export type IUserNo = {
  value: number
}

export type ISessionId = {
  value: string
}

export type LoginWithUsernameCred = {
  username: string
  password: string
}

export type LoginWithEmailCred = {
  email: string
  password: string
}

export type UserLoginCred = LoginWithUsernameCred | LoginWithEmailCred
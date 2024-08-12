import { NextRequest, NextResponse } from 'next/server';
import { UserRegisterData } from '@/api/ApiInterface';
import { CustomResponse } from '@/api/utils';
import verifyData from './verifyData';
import registerUser from './registerUser';

export async function POST(req: NextRequest) {
  try {

  } catch (error) {

  }
  const registerData: UserRegisterData = await req.json();
  const checkDataValidity = await verifyData(registerData);

  if (!checkDataValidity.result) return NextResponse.json(CustomResponse.error(checkDataValidity.message));

  const result = await registerUser(registerData);
}
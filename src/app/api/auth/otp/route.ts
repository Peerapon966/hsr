import { NextRequest, NextResponse } from 'next/server';
import { CustomResponse } from '@/api/utils';
import verifyEmail from './verifyEmail';
import generateOTP from './generateOTP';
import sendOTP from './sendOTP';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const email = body.email;
  const isEmailValid = await verifyEmail({ registrantEmail: email });

  if (!isEmailValid.result) {
    return NextResponse.json(CustomResponse.error(isEmailValid.message))
  }

  try {
    const otp = await generateOTP({ registrantEmail: email });
    await sendOTP({ registrantEmail: email, otp: otp });
  } catch (error) {
    return NextResponse.json(CustomResponse.error())
  }

  return NextResponse.json(CustomResponse.success())
}

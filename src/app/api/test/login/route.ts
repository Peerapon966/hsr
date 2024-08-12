"use server"

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { useSearchParams } from '@/api/utils';
import { randomUUID } from 'crypto';

type SuccessLoginResponse = {
  status: 'success'
  username: string
}

type FailedLoginResponse = {
  status: 'error'
  message: string
}

type LoginResponse = SuccessLoginResponse | FailedLoginResponse

export async function POST(req: NextRequest): Promise<NextResponse<LoginResponse>> {
  const body = await req.json();
  const user = { username: 'fff', password: 'f', session: '' };

  if (body.username !== user.username || body.password !== user.password) {
    return NextResponse.json({ status: 'error', message: 'incorrect username or password' })
  }

  user.session = randomUUID()
  cookies().set({
    name: 'sid',
    value: user.session
  });

  return NextResponse.json({ status: 'success', username: user.username })
}

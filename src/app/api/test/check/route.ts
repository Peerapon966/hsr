import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';


export async function POST(req: NextRequest): Promise<NextResponse<RequestCookie>> {
  const sid: RequestCookie = cookies().get('sid') as RequestCookie;
  console.log(sid)
  return NextResponse.json(sid)
}
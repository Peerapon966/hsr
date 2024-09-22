import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

type LoginRequest = {
  username: string;
  password: string;
};

type User = {
  username: string;
  password: string;
  sid: string | null;
};

const db: User[] = [{ username: "fff", password: "f", sid: null }];

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: LoginRequest = await req.json();
  if (body.username === db[0].username && body.password === db[0].password) {
    const sid = randomUUID();
    db[0].sid = sid;
    cookies().set("sid", sid, {
      sameSite: "lax",
      secure: true,
    });
    cookies().set("key1", "value1", {
      sameSite: "none",
      secure: true,
      domain: "google",
    });
    cookies().set("key2", "value2", {
      sameSite: "strict",
      secure: true,
      domain: "youtube",
    });
    cookies().set("key3", "value3", {
      sameSite: "none",
      secure: true,
      domain: "localhost",
    });
  }

  return NextResponse.json({ ok: true });
}

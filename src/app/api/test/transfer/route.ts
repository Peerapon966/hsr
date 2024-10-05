import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body;
  req.headers.get("content-type") === "application/json"
    ? (body = await req.json())
    : (body = { amount: "1000000", receiver: "scammer" });
  const amount = body.amount;
  const receiver = body.receiver;
  const sid: RequestCookie = cookies().get("sid") as RequestCookie;
  return NextResponse.json(
    sid
      ? {
          ok: true,
          message: `transferred the amount of ${amount} to ${receiver}`,
        }
      : { ok: false, message: "transfer failed miserably" }
  );
}

export function GET(req: NextRequest): NextResponse {
  const sid: RequestCookie = cookies().get("sid") as RequestCookie;
  console.log(sid);
  return NextResponse.json(
    sid
      ? {
          ok: true,
          message: "get request called successfully",
        }
      : { ok: false, message: "get request failed to process" }
  );
}

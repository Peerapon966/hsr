import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

const allowedOrigins = ["http://localhost:3000", "http://sub.hsr.com:3001"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // const res = NextResponse.next();
  // const origin = request.headers.get("origin") as string;

  // if (allowedOrigins.includes(origin)) {
  //   console.log(origin);
  //   res.headers.set("Access-Control-Allow-Origin", origin);
  // }
  // res.headers.set(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS"
  // );
  // res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  // res.headers.set("Access-Control-Allow-Credentials", "true");

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (request.nextUrl.pathname === "/test/content") {
    if (!cookies().get("sid")) {
      return NextResponse.redirect(new URL("/test/login", request.url));
    }
  }

  // return res;
}

export const config = {
  matcher: "/:path*",
};

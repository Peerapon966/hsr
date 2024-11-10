import { NextResponse, type NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // Check if the request is for a static asset or an api. If it's a static asset, don't apply the i18n middleware
  if (
    pathname.includes(".") // This catches most file extensions
  ) {
    return NextResponse.next();
  }

  // Request for the root will be redirected to the home page
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/home`, request.url));
  }

  // Add custom header to the request before passing it to the next-intl middleware
  const response = handleI18nRouting(request);
  response.headers.set("x-url", request.url);

  // This is for learning, experimental purposes
  // if (pathname === "/test/content") {
  //   if (!cookies().get("sid")) {
  //     return NextResponse.redirect(new URL("/test/login", request.url));
  //   }
  // }

  return response;
}

export const config = {
  // Match all route that isn't start with api, _next/static, _next/image, favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

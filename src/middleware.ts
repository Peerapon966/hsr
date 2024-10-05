import { NextResponse, type NextRequest } from "next/server";
import { cookies, headers } from "next/headers";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the request is for a static asset or an api
  if (
    pathname.includes(".") || // This catches most file extensions
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api")
  ) {
    // If it's a static asset, don't apply the i18n middleware
    return NextResponse.next();
  }

  // Request for the root will be redirected to the home page
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/home`, request.url));
  }

  // This is for learning, experimenting purposes
  if (pathname === "/test/content") {
    if (!cookies().get("sid")) {
      return NextResponse.redirect(new URL("/test/login", request.url));
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  // This matcher will run the middleware on all routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

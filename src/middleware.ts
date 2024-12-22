import { NextResponse, userAgent, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import createMiddleware from "next-intl/middleware";

const ALLOW_ORIGINS = ["http://127.0.0.1:3000", "http://127.0.0.1:5000"];
const handleI18nRouting = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ua = userAgent(request);
  // Check if the request is for a static asset or an api. If it's a static asset, don't apply the i18n middleware
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // Request for the root will be redirected to the home page
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/home`, request.url));
  }

  // Add custom header to the request before passing it to the next-intl middleware
  const response = handleI18nRouting(request);
  response.headers.set("x-user-agent", JSON.stringify(ua));
  response.headers.set("x-url", request.url);

  response.headers.append("Access-Control-Allow-Credentials", "true");
  ALLOW_ORIGINS.map((origin) =>
    response.headers.append("Access-Control-Allow-Origin", origin)
  );
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,DELETE,PATCH,POST,PUT"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return response;
}

export const config = {
  // Match all route that isn't start with api, _next/static, _next/image, favicon.ico
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

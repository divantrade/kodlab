import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const PRIMARY_DOMAIN = "kodlab.ai";

const intlProxy = createMiddleware(routing);

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";

  // Redirect non-primary domains (e.g. kodlab.net) to kodlab.ai
  if (
    hostname &&
    !hostname.includes(PRIMARY_DOMAIN) &&
    !hostname.includes("localhost") &&
    !hostname.includes("vercel.app")
  ) {
    const url = new URL(request.url);
    url.hostname = PRIMARY_DOMAIN;
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

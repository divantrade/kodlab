import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const PRIMARY_DOMAIN = "kodlab.ai";

const intlProxy = createMiddleware(routing);

/**
 * Safari-compatible proxy with proper cache headers
 * Addresses Safari's aggressive caching behavior that causes slow page refreshes
 * 
 * Uses Next.js 16 "proxy" convention (replaces deprecated "middleware")
 */
export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

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

  // Handle API routes with strict no-cache headers
  if (pathname.startsWith("/api")) {
    const response = NextResponse.next();
    
    // Safari-specific cache busting headers
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
    
    // CORS headers for Safari compatibility
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    
    // Vary header to prevent Safari from serving wrong cached content
    response.headers.set("Vary", "Accept, Accept-Encoding, Accept-Language, Origin");
    
    return response;
  }

  // Get response from intl proxy
  const response = intlProxy(request);

  // Add Safari-compatible headers to all responses
  if (response) {
    // Prevent Safari's back-forward cache issues
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    
    // Vary header helps Safari understand content variation
    response.headers.set("Vary", "Accept, Accept-Encoding, Accept-Language");
    
    // X-Content-Type-Options helps prevent Safari MIME type issues
    response.headers.set("X-Content-Type-Options", "nosniff");
  }

  return response;
}

export const config = {
  // Match all paths except static files and _next internals
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};

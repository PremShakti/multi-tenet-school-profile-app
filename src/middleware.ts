import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ Block access to /admin if token is missing
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // ⚠️ Do NOT try to verify here — just let it through and verify later
  }

  // Optional: Set subdomain cookie
  const host = request.headers.get("host") || "";
  const subdomain = host.split(".")[0];
  const response = NextResponse.next();
  response.cookies.set("subdomain", subdomain);

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};

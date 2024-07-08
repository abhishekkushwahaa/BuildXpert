import { NextResponse } from "next/server";

export function middleware(req: any) {
  const url = new URL(req.url);
  const hostname = req.headers.get("host");
  const expectedDomain = process.env.NEXT_PUBLIC_DOMAIN;

  if (
    url.pathname === "/" ||
    (url.pathname === "/site" && hostname === expectedDomain)
  ) {
    return NextResponse.rewrite(new URL("/site", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId");

 
  if (request.nextUrl.pathname.startsWith("/dashboard") && !userId) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

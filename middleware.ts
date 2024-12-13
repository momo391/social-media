import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  // cookies
  if (request.method === "GET") {
    const response = NextResponse.next();
    const token = request.cookies.get("session")?.value ?? null;
    if (token !== null) {
      response.cookies.set("session", token, {
        path: "/",
        maxAge: 60 * 60 * 2,
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    return response;
  }

  //  CSRF protection
  if (request.method === "GET") return NextResponse.next();

  const originHeader = request.headers.get("Origin");
  // change to `X-Forwarded-Host` later if not working
  const hostHeader = request.headers.get("Host");

  if (originHeader === null || hostHeader === null)
    return new NextResponse(null, {
      status: 403,
    });

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch (err) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}

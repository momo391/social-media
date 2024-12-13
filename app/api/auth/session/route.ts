import { getCurrentSession } from "@/lib/cache/current-session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { session } = await getCurrentSession();
  if (session === null)
    return new NextResponse(null, {
      status: 401,
    });

  return NextResponse.json(session, {
    status: 200,
  });
}

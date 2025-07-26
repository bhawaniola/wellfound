import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type RouteContext<P = Record<string, string>> = { params: P };

function isSession(obj: any): obj is Session {
  return !!obj && typeof obj.expires === "string";
}

export function withAuth<P>(
  handler: (
    req: Request,
    ctx: RouteContext<P>,
    session: Session
  ) => Promise<Response>
) {
  return async (req: Request, ctx: RouteContext<P>) => {
    const session = await getServerSession(authOptions as any);
    if (!isSession(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, ctx, session);
  };
}


import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function withAuth(
  handler: (req: Request, context: any, session: any) => Promise<Response>
) {
  return async (req: Request, context: any) => {
    const session = await getServerSession(authOptions as any);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return handler(req, context, session);
  };
}

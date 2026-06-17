import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/token";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
 
 const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return Response.json({ error: "No token provided" }, { status: 401 });
    }

    // format: Bearer token
    const token = authHeader.split(" ")[1];

    // 2. verify token
    const decoded = verifyToken(token) as { userId: string };

    if (!decoded?.userId) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: {
        userId: decoded?.userId,
      },
      include: {
        reviews: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ resumes });
  } catch  {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
import { sendVerificationEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const code = generateCode();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verifyCode: code,
        isVerified: false,
      },
    });

    await sendVerificationEmail(user.email, code);

    return Response.json({ message: "User created, verify email" });
  } catch  {
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

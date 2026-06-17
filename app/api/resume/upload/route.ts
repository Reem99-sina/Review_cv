import { prisma } from "@/lib/prisma";
import { extractText } from "@/lib/pdf";
import { saveFile } from "@/lib/upload";
import { verifyToken } from "@/lib/token";
import { generateAIReview } from "@/lib/review";

export async function POST(req: Request) {
  try {
    // 1. auth
    const auth = req.headers.get("authorization");
    if (!auth) {
      return Response.json({ error: "No token" }, { status: 401 });
    }

    const token = auth.split(" ")[1];
    const decoded = verifyToken(token) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded?.userId },
      include: { resumes: true },
    });

    if (!user) throw new Error("User not found");

    // 🔴 LIMIT LOGIC
    if (user.plan === "FREE" && user.resumes.length >= 1) {
      return Response.json(
        {
          message: "Upgrade required",
          redirect: "/pricing",
        },
        { status: 400 },
      );
    }
    // 2. form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 });
    }

    // 3. save file
    const fileUrl = await saveFile(file);

    // 4. extract text
    const buffer = Buffer.from(await file.arrayBuffer());
    const rawText = await extractText(buffer);

    // 5. save to DB
    const resume = await prisma.resume.create({
      data: {
        title: file.name,
        fileUrl,
        rawText,
        userId: decoded.userId,
      },
    });

    const reviewResult = await generateAIReview(rawText);

    const review = await prisma.review.create({
      data: {
        resume_id: resume.id,
        ats_score: reviewResult.ats_score,
        strengths: reviewResult.strengths,
        weaknesses: reviewResult.weaknesses,
        missing_keywords: reviewResult.missing_keywords,
        improved_summary: reviewResult.improved_summary,
      },
    });
    // console.log(reviewResult,'review',rawText)
    return Response.json({
      message: "Uploaded successfully",
      resume,
      review,
    });
  } catch (err) {
    console.log(err, "erre");
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

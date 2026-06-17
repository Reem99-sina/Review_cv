import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateAIReview(text: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a professional ATS resume reviewer.

Analyze the resume below and return ONLY valid JSON (no explanation, no markdown).

Return exactly this format:

{
  "ats_score": number,
  "strengths": string[],
  "weaknesses": string[],
  "missing_keywords": string[],
  "improved_summary": string
}

Resume:
${text}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  // 🔥 clean possible ```json wrappers
  const clean = response
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(clean);
}

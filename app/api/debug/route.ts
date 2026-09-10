import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request: Request) {
  try {
    const { projectName, projectDescription, errorMessage, code } =
      await request.json();

    if (!errorMessage) {
      return NextResponse.json(
        { error: "Error message is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are a senior software engineer helping debug a project.

PROJECT CONTEXT:
Name: ${projectName}
Description: ${projectDescription || "No description provided."}

ERROR / ISSUE:
${errorMessage}

RELEVANT CODE (if provided):
${code || "No code provided."}

Give a direct, actionable fix. Be concise. If the fix requires code changes,
show the corrected code clearly. Assume the developer wants to solve this
quickly, not read a long explanation.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ response: result.text });
  } catch (err: unknown) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Something went wrong talking to the AI. Try again." },
      { status: 500 }
    );
  }
}
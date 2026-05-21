import { GoogleGenAI } from "@google/genai";
import { MIRROR_SYSTEM_PROMPT } from "./mirrorPrompt";

export type MirrorResponse = {
  fragments: string[];
};

const FALLBACK_FRAGMENTS: string[] = [
  "something happened today",
  "I did not handle it the way I wanted to",
  "I keep thinking about it",
  "I am the kind of person this happens to",
];

export async function splitThought(checkIn: string): Promise<MirrorResponse> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: checkIn,
      config: {
        systemInstruction: MIRROR_SYSTEM_PROMPT,
        temperature: 0.6,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      return { fragments: FALLBACK_FRAGMENTS };
    }

    const parsed = JSON.parse(text);

    if (
      !Array.isArray(parsed?.fragments) ||
      parsed.fragments.length < 3 ||
      !parsed.fragments.every(
        (f: unknown) => typeof f === "string" && f.trim().length > 0
      )
    ) {
      return { fragments: FALLBACK_FRAGMENTS };
    }

    return { fragments: parsed.fragments };
  } catch (err) {
    console.error("Mirror error:", err);
    return { fragments: FALLBACK_FRAGMENTS };
  }
}

import { GoogleGenAI } from "@google/genai";
import { PULSE_SYSTEM_PROMPT } from "./pulsePrompt";

export type PulseResponse = {
  items: string[];
};

const FALLBACK_ITEMS: string[] = [
  "the things I need to do",
  "the things I have not finished",
  "the people I need to reply to",
  "everything waiting for tomorrow",
];

export async function detangle(checkIn: string): Promise<PulseResponse> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: checkIn,
      config: {
        systemInstruction: PULSE_SYSTEM_PROMPT,
        temperature: 0.5,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      return { items: FALLBACK_ITEMS };
    }

    const parsed = JSON.parse(text);

    if (
      !Array.isArray(parsed?.items) ||
      parsed.items.length < 2 ||
      !parsed.items.every(
        (it: unknown) => typeof it === "string" && it.trim().length > 0
      )
    ) {
      return { items: FALLBACK_ITEMS };
    }

    return { items: parsed.items };
  } catch (err) {
    console.error("Pulse error:", err);
    return { items: FALLBACK_ITEMS };
  }
}

import { GoogleGenAI } from "@google/genai";
import { REFLECT_SYSTEM_PROMPT } from "./reflectPrompt";

export type ReflectResponse = {
  response: string;
  memory_note: string;
};

const FALLBACK: ReflectResponse = {
  response:
    "Thank you for sitting with that. However the loop feels right now is okay. Be gentle with yourself, and try to rest.",
  memory_note: "Reflection captured; agent response failed, fallback used.",
};

export async function reflect(
  loopType: string,
  game: string,
  reflectionText: string
): Promise<ReflectResponse> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

    const prompt = `Loop type: ${loopType}. Exercise done: ${game}. What the person wrote about how the loop feels now: "${reflectionText}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: prompt,
      config: {
        systemInstruction: REFLECT_SYSTEM_PROMPT,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) return FALLBACK;

    const parsed = JSON.parse(text);
    if (
      typeof parsed?.response !== "string" ||
      parsed.response.trim() === "" ||
      typeof parsed?.memory_note !== "string"
    ) {
      return FALLBACK;
    }

    return { response: parsed.response, memory_note: parsed.memory_note };
  } catch (err) {
    console.error("Reflect error:", err);
    return FALLBACK;
  }
}

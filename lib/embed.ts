import { GoogleGenAI } from "@google/genai";

export async function embed(text: string): Promise<number[] | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
    const response = await ai.models.embedContent({
      model: "gemini-embedding-001",
      contents: text,
    });
    const values = response?.embeddings?.[0]?.values;
    if (!Array.isArray(values) || values.length === 0) return null;
    return values;
  } catch (err) {
    console.error("Embed error:", err);
    return null;
  }
}

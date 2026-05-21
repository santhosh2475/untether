import { GoogleGenAI } from "@google/genai";
import type { LoopType } from "./types";
import { GAMEMASTER_SYSTEM_PROMPT } from "./gamemasterPrompt";

export type GamemasterOutput = {
  opening: string;
  game: "anchor" | "mirror" | "pulse";
};

const GAME_FOR_LOOP: Record<LoopType, "anchor" | "mirror" | "pulse"> = {
  catastrophising: "anchor",
  shame: "mirror",
  racing: "pulse",
};

const FALLBACK_OPENINGS: Record<LoopType, string> = {
  catastrophising:
    "The loop is pulling you toward something that hasn't happened. For the next ninety seconds, we come back to the room you're actually in.",
  shame:
    "The loop is telling you a hard story about who you are. For the next few minutes, we look at that story from the outside.",
  racing:
    "The loop is holding too many things at once. For the next ninety seconds, we set them down, one at a time.",
};



export async function generateOpening(
  checkIn: string,
  loopType: LoopType
): Promise<GamemasterOutput> {
  const game = GAME_FOR_LOOP[loopType];

  const userMessage = `Loop type: ${loopType}\nTheir thought: "${checkIn}"`;

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: userMessage,
      config: {
        systemInstruction: GAMEMASTER_SYSTEM_PROMPT,
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      return { opening: FALLBACK_OPENINGS[loopType], game };
    }

    const parsed = JSON.parse(text);
    const opening =
      typeof parsed?.opening === "string" && parsed.opening.trim().length > 0
        ? parsed.opening
        : FALLBACK_OPENINGS[loopType];

    return { opening, game };
  } catch (err) {
    console.error("Gamemaster error:", err);
    return { opening: FALLBACK_OPENINGS[loopType], game };
  }
}
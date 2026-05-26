import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { GoogleGenAI } from "@google/genai";

async function main() {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });
  const list = await ai.models.list();
  for await (const m of list) {
    const actions = (m as any).supportedActions || (m as any).supportedGenerationMethods || [];
    console.log(m.name, "|", JSON.stringify(actions));
  }
}

main();

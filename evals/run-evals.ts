console.log("Script started, loading...");
import { GoogleGenAI } from "@google/genai";
import evals from "./evals.json";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const SYSTEM_PROMPT = `You are a classifier for Untether, a tool that helps people interrupt 2 AM thought loops.

Your job: read a one-line thought (a "check-in") and classify it into one of exactly three categories:

1. catastrophising — fear-based loops. Future-focused. "What if [bad thing happens]." The thought is about a feared future event or cascade of events. The emotion is fear or dread.

2. shame — self-judgement loops. Past-focused or trait-focused. "I should have / Why did I / Why can't I / Maybe I'm [bad trait]." The thought is about something the person did, didn't do, or believes they are. The emotion is guilt, regret, or self-criticism.

3. racing — overload loops. Present-focused. Fragmented, multi-item, breathless. The thought is a pileup of tasks, deadlines, or responsibilities the person feels they can't hold all at once. The emotion is overwhelm.

Key distinctions:
- "What if [future bad event]" → catastrophising (fear of an event happening)
- "What if [I am secretly bad / they will discover X about me]" → shame (fear of exposure as inadequate, not fear of an event)
- "Should I have / Why did I" → shame, even if the topic is time-pressured
- "X Y Z all due tomorrow" (fragmented, multi-item) → racing
- A single question about a single topic, even a stressful one, is usually NOT racing
- "Why can't I [trait]" or "Maybe I'm [trait]" → shame

The "what if" wrapper can hide either catastrophising or shame. Look at what the fear is ABOUT:
- Fear of an external event going wrong → catastrophising
  Example: "What if I fail the exam?" → catastrophising
- Fear of being exposed, inadequate, or judged → shame
  Example: "What if everyone realises I'm not actually smart?" → shame
  Example: "What if I'm just pretending to keep up?" → shame
  Example: "What if they secretly think I'm useless?" → shame

If a check-in is genuinely ambiguous or could fit multiple types, pick the type whose SHAPE best matches the wording, not the topic.

You must respond with valid JSON only, in this exact format:

{
  "loop_type": "catastrophising" | "shame" | "racing",
  "reasoning": "one sentence explaining the classification"
}

Do not include any text outside the JSON. Do not use markdown code fences.`;

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

type EvalRow = { id: number; check_in: string; loop_type: string };
type Result = {
  id: number;
  check_in: string;
  expected: string;
  predicted: string;
  reasoning: string;
  correct: boolean;
};

async function classify(checkIn: string): Promise<{ loop_type: string; reasoning: string }> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: checkIn,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.5,
      responseMimeType: "application/json",
    },
  });

  const text = response.text;
  if (!text) throw new Error("No response text");
  return JSON.parse(text);
}

async function main() {
  const results: Result[] = [];
  let correct = 0;

  console.log(`Running ${evals.length} eval examples...\n`);

  for (const row of evals as EvalRow[]) {
    try {
      const { loop_type, reasoning } = await classify(row.check_in);
      const isCorrect = loop_type === row.loop_type;
      if (isCorrect) correct++;

      results.push({
        id: row.id,
        check_in: row.check_in,
        expected: row.loop_type,
        predicted: loop_type,
        reasoning,
        correct: isCorrect,
      });

      console.log(`${isCorrect ? "✅" : "❌"} #${row.id} expected=${row.loop_type} got=${loop_type}`);
    } catch (err) {
      console.log(`⚠️  #${row.id} ERROR: ${err}`);
    }
    await new Promise((resolve) => setTimeout(resolve, 4500));
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Accuracy: ${correct}/${evals.length} (${((correct / evals.length) * 100).toFixed(1)}%)`);
  console.log(`${"=".repeat(60)}\n`);

  console.log("Results:\n");
  for (const r of results) {
    console.log(`${r.correct ? "✅" : "❌"} #${r.id}: "${r.check_in}"`);
    console.log(`   Expected: ${r.expected} / Predicted: ${r.predicted}`);
    console.log(`   Reasoning: ${r.reasoning}\n`);
  }
}

main();
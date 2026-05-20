import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const checkIn: string | undefined = body?.check_in;

    if (!checkIn || typeof checkIn !== "string" || checkIn.trim().length === 0) {
      return NextResponse.json(
        { error: "check_in must be a non-empty string" },
        { status: 400 }
      );
    }

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
    if (!text) {
      return NextResponse.json({ error: "No response from model" }, { status: 502 });
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Classify error:", err);
    return NextResponse.json(
      { error: "Classification failed" },
      { status: 500 }
    );
  }
}
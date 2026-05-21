import { NextResponse } from "next/server";
import { reflect } from "../../../lib/reflect";
import { getDb } from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const deviceId: string = body?.device_id || "unknown";
    const loopType: string = body?.loop_type || "unknown";
    const checkIn: string = body?.check_in || "";
    const game: string = body?.game || "unknown";
    const reflectionText: string = body?.reflection || "";

    const result = await reflect(loopType, game, reflectionText);

    try {
      const db = getDb();
      await db.execute({
        sql: "INSERT INTO sessions (device_id, created_at, loop_type, check_in, game, reflection, memory_note) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [
          deviceId,
          new Date().toISOString(),
          loopType,
          checkIn,
          game,
          reflectionText,
          result.memory_note,
        ],
      });
    } catch (dbErr) {
      console.error("Reflect DB write failed:", dbErr);
    }

    return NextResponse.json({ response: result.response });
  } catch (err) {
    console.error("Reflect route error:", err);
    return NextResponse.json(
      { error: "Failed to reflect" },
      { status: 500 }
    );
  }
}

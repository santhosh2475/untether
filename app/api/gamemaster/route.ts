import { NextResponse } from "next/server";
import { generateOpening } from "../../../lib/gamemaster";
import { retrievePastSessions } from "../../../lib/retrieval";
import type { LoopType } from "../../../lib/types";

const VALID_LOOPS: LoopType[] = ["catastrophising", "shame", "racing"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const checkIn: string | undefined = body?.check_in;
    const loopType: string | undefined = body?.loop_type;
    const deviceId: string = body?.device_id || "unknown";

    if (!checkIn || typeof checkIn !== "string" || checkIn.trim().length === 0) {
      return NextResponse.json(
        { error: "check_in must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!loopType || !VALID_LOOPS.includes(loopType as LoopType)) {
      return NextResponse.json(
        { error: "loop_type must be one of: catastrophising, shame, racing" },
        { status: 400 }
      );
    }

    let pastSessions = [];
    try {
      pastSessions = await retrievePastSessions(deviceId, checkIn, 3);
    } catch (retErr) {
      console.error("Gamemaster retrieval failed:", retErr);
    }

    const result = await generateOpening(
      checkIn,
      loopType as LoopType,
      pastSessions
    );
    return NextResponse.json(result);
  } catch (err) {
    console.error("Gamemaster route error:", err);
    return NextResponse.json(
      { error: "Failed to generate opening" },
      { status: 500 }
    );
  }
}

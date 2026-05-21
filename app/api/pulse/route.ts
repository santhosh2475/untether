import { NextResponse } from "next/server";
import { detangle } from "../../../lib/pulse";

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

    const result = await detangle(checkIn);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Pulse route error:", err);
    return NextResponse.json(
      { error: "Failed to detangle thought" },
      { status: 500 }
    );
  }
}

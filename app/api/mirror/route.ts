import { NextResponse } from "next/server";
import { splitThought } from "../../../lib/mirror";

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

    const result = await splitThought(checkIn);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Mirror route error:", err);
    return NextResponse.json(
      { error: "Failed to split thought" },
      { status: 500 }
    );
  }
}

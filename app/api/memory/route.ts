import { NextResponse } from "next/server";
import { getMemoryLine } from "../../../lib/memory";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const deviceId: string = body?.device_id || "unknown";
    const line = await getMemoryLine(deviceId);
    return NextResponse.json({ line });
  } catch (err) {
    console.error("Memory route error:", err);
    return NextResponse.json({ line: null });
  }
}

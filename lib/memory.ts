import { getDb } from "./db";

type SessionRow = {
  loop_type: string;
  created_at: string;
};

const LOOP_PHRASE: Record<string, string> = {
  catastrophising: "toward what-ifs",
  shame: "toward being hard on yourself",
  racing: "toward everything-at-once",
};

export async function getMemoryLine(deviceId: string): Promise<string | null> {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT loop_type, created_at FROM sessions WHERE device_id = ? ORDER BY created_at DESC LIMIT 40",
      args: [deviceId],
    });

    const rows = result.rows as unknown as SessionRow[];
    if (rows.length === 0) return null;

    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const twoWeeksAgo = now - 14 * 24 * 60 * 60 * 1000;

    const recent = rows.filter(
      (r) => new Date(r.created_at).getTime() >= twoWeeksAgo
    );
    if (recent.length === 0) return null;

    const lastWeek = recent.filter(
      (r) => new Date(r.created_at).getTime() >= weekAgo
    );

    if (recent.length === 1) {
      return "You have been here once before. However tonight feels, that is okay.";
    }

    if (lastWeek.length >= 2) {
      const counts: Record<string, number> = {};
      for (const r of lastWeek) {
        counts[r.loop_type] = (counts[r.loop_type] || 0) + 1;
      }
      const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
      const [topType, topCount] = sorted[0];
      const secondCount = sorted[1] ? sorted[1][1] : 0;

      if (topCount >= 2 && topCount > secondCount) {
        const phrase = LOOP_PHRASE[topType] || "back here";
        return `You have come back a few times this week, often pulled ${phrase}. That is okay. This is what this is for.`;
      }
      return "You have been here a few times this week. That is okay. This is what this is for.";
    }

    if (lastWeek.length === 0 && recent.length >= 2) {
      return "It has been a little while since you were last here. Welcome back.";
    }

    return "Welcome back.";
  } catch (err) {
    console.error("Memory error:", err);
    return null;
  }
}

import { getDb } from "./db";
import { embed } from "./embed";
import { cosineSimilarity } from "./similarity";

export type RetrievedSession = {
  check_in: string;
  loop_type: string;
  memory_note: string;
  created_at: string;
  similarity: number;
};

export async function retrievePastSessions(
  deviceId: string,
  currentCheckIn: string,
  topN: number = 3
): Promise<RetrievedSession[]> {
  try {
    const queryVec = await embed(currentCheckIn);
    if (!queryVec) return [];

    const db = getDb();
    const result = await db.execute({
      sql: "SELECT check_in, loop_type, memory_note, created_at, embedding FROM sessions WHERE device_id = ? AND embedding IS NOT NULL ORDER BY created_at DESC LIMIT 50",
      args: [deviceId],
    });

    const scored: RetrievedSession[] = [];
    for (const row of result.rows as any[]) {
      let vec: number[] | null = null;
      try {
        vec = JSON.parse(row.embedding as string);
      } catch {
        vec = null;
      }
      if (!vec || !Array.isArray(vec)) continue;

      const sim = cosineSimilarity(queryVec, vec);
      scored.push({
        check_in: String(row.check_in || ""),
        loop_type: String(row.loop_type || ""),
        memory_note: String(row.memory_note || ""),
        created_at: String(row.created_at || ""),
        similarity: sim,
      });
    }

    scored.sort((a, b) => b.similarity - a.similarity);
    return scored.slice(0, topN);
  } catch (err) {
    console.error("Retrieval error:", err);
    return [];
  }
}

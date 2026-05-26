import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";
import { embed } from "../lib/embed";
import { retrievePastSessions } from "../lib/retrieval";

const NEW_CHECKIN = "what if I bomb my test tomorrow";

async function main() {
  const db = getDb();
  const dev = "dev_ragtest";

  await db.execute({ sql: "DELETE FROM sessions WHERE device_id = ?", args: [dev] });

  const past = [
    { ci: "I am scared I will fail my final exam", loop: "catastrophising", note: "exam failure fear" },
    { ci: "I keep replaying how I embarrassed myself at the meeting", loop: "shame", note: "shame about meeting" },
    { ci: "so many chores and emails piling up tonight", loop: "racing", note: "racing over chores" },
  ];

  for (const p of past) {
    const v = await embed(p.ci);
    await db.execute({
      sql: "INSERT INTO sessions (device_id, created_at, loop_type, check_in, game, reflection, memory_note, embedding) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args: [dev, new Date().toISOString(), p.loop, p.ci, "anchor", "", p.note, v ? JSON.stringify(v) : null],
    });
  }

  console.log("New check-in:", NEW_CHECKIN);
  const results = await retrievePastSessions(dev, NEW_CHECKIN, 3);
  for (const r of results) {
    console.log(r.similarity.toFixed(4), "[" + r.loop_type + "]", r.check_in);
  }

  await db.execute({ sql: "DELETE FROM sessions WHERE device_id = ?", args: [dev] });
  console.log("(test rows cleaned up)");
}

main();

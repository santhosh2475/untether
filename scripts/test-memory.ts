import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";
import { getMemoryLine } from "../lib/memory";

async function main() {
  const db = getDb();
  const testDevice = "dev_memorytest";

  await db.execute({ sql: "DELETE FROM sessions WHERE device_id = ?", args: [testDevice] });

  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const rows = [
    { t: now - 1 * day, loop: "catastrophising" },
    { t: now - 2 * day, loop: "catastrophising" },
    { t: now - 4 * day, loop: "catastrophising" },
  ];
  for (const r of rows) {
    await db.execute({
      sql: "INSERT INTO sessions (device_id, created_at, loop_type, check_in, game, reflection, memory_note) VALUES (?, ?, ?, ?, ?, ?, ?)",
      args: [testDevice, new Date(r.t).toISOString(), r.loop, "test", "anchor", "", "test note"],
    });
  }

  const line = await getMemoryLine(testDevice);
  console.log("MEMORY LINE:", line);

  await db.execute({ sql: "DELETE FROM sessions WHERE device_id = ?", args: [testDevice] });
  console.log("(test rows cleaned up)");
}

main();

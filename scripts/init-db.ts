import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";

async function main() {
  const db = getDb();
  await db.execute("CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, device_id TEXT NOT NULL, created_at TEXT NOT NULL, loop_type TEXT NOT NULL, check_in TEXT NOT NULL, game TEXT NOT NULL, reflection TEXT, memory_note TEXT)");
  console.log("table created");
  const result = await db.execute("SELECT name FROM sqlite_master WHERE type=\x27table\x27");
  console.log("tables:", result.rows.map((r) => r.name));
}

main();

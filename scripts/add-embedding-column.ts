import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { getDb } from "../lib/db";

async function main() {
  const db = getDb();
  try {
    await db.execute("ALTER TABLE sessions ADD COLUMN embedding TEXT");
    console.log("embedding column added");
  } catch (err) {
    console.log("(column may already exist):", String(err));
  }
  const info = await db.execute("PRAGMA table_info(sessions)");
  console.log("columns:", info.rows.map((r) => r.name));
}

main();

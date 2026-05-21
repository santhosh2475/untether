import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { generateOpening } from "../lib/gamemaster";

async function main() {
  const tests: { checkIn: string; loopType: "catastrophising" | "shame" | "racing" }[] = [
    { checkIn: "What if I fail my interview tomorrow at Meta?", loopType: "catastrophising" },
    { checkIn: "Why can't I ever just be consistent for once?", loopType: "shame" },
    { checkIn: "deadlines emails laundry I haven't called mum the gym", loopType: "racing" },
  ];

  for (const t of tests) {
    console.log("\n" + "=".repeat(60));
    console.log(`LOOP: ${t.loopType}`);
    console.log(`THOUGHT: "${t.checkIn}"`);
    console.log("-".repeat(60));

    const result = await generateOpening(t.checkIn, t.loopType);

    console.log(`GAME: ${result.game}`);
    console.log(`OPENING:\n${result.opening}`);

    await new Promise((r) => setTimeout(r, 4500));
  }

  console.log("\n" + "=".repeat(60));
}

main();
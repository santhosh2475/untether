import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { splitThought } from "../lib/mirror";

async function main() {
  const tests = [
    "Why can't I ever just be consistent for once?",
    "I didn't finish the project on time and everyone noticed, I always do this",
    "I snapped at my mum on the phone and now I think I'm just a bad person",
    "Maybe I'm not actually smart and just got lucky before",
  ];

  for (const thought of tests) {
    console.log("\n" + "=".repeat(60));
    console.log(`THOUGHT: "${thought}"`);
    console.log("-".repeat(60));

    const result = await splitThought(thought);

    result.fragments.forEach((f, i) => {
      console.log(`  ${i + 1}. ${f}`);
    });

    await new Promise((r) => setTimeout(r, 4500));
  }

  console.log("\n" + "=".repeat(60));
}

main();

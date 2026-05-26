import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { embed } from "../lib/embed";
import { cosineSimilarity } from "../lib/similarity";

async function main() {
  const a = await embed("I am terrified I will fail my exam tomorrow");
  const b = await embed("what if I bomb the test and ruin everything");
  const c = await embed("I cannot stop thinking about my grocery list");

  if (!a || !b || !c) {
    console.log("EMBED FAILED - one or more returned null");
    return;
  }

  console.log("vector length:", a.length);
  console.log("similar pair (exam fears):   ", cosineSimilarity(a, b).toFixed(4));
  console.log("unrelated pair (exam vs list):", cosineSimilarity(a, c).toFixed(4));
}

main();

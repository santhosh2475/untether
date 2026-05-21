import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { reflect } from "../lib/reflect";

async function main() {
  const tests = [
    { loop: "catastrophising", game: "anchor", text: "i think it helped a bit, my chest feels less tight" },
    { loop: "shame", game: "mirror", text: "honestly the loop is still really loud, i dont feel different" },
    { loop: "racing", game: "pulse", text: "ok" },
    { loop: "catastrophising", game: "anchor", text: "calmer now, thank you" },
  ];

  for (const t of tests) {
    console.log("\\n" + "=".repeat(60));
    console.log(`LOOP: ${t.loop} | GAME: ${t.game}`);
    console.log(`PERSON WROTE: "${t.text}"`);
    console.log("-".repeat(60));
    const r = await reflect(t.loop, t.game, t.text);
    console.log("RESPONSE:", r.response);
    console.log("MEMORY NOTE:", r.memory_note);
    await new Promise((res) => setTimeout(res, 4500));
  }
}

main();

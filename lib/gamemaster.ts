import type { LoopType } from "./types";

export type GamemasterOutput = {
  opening: string;
  game: "anchor" | "mirror" | "pulse";
};

const GAME_FOR_LOOP: Record<LoopType, "anchor" | "mirror" | "pulse"> = {
  catastrophising: "anchor",
  shame: "mirror",
  racing: "pulse",
};

const TEMPLATED_OPENINGS: Record<LoopType, string> = {
  catastrophising:
    "The loop is pulling you toward something that hasn't happened. For the next ninety seconds, we come back to the room you're actually in.",
  shame:
    "The loop is telling you a hard story about who you are. For the next few minutes, we look at that story from the outside.",
  racing:
    "The loop is holding too many things at once. For the next ninety seconds, we put them down, one at a time.",
};

export async function generateOpening(
  checkIn: string,
  loopType: LoopType
): Promise<GamemasterOutput> {
  return {
    opening: TEMPLATED_OPENINGS[loopType],
    game: GAME_FOR_LOOP[loopType],
  };
}

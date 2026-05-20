import type { LoopType } from "./types";

type LoopStyle = {
  color: string;
  label: string;
  subtitle: string;
  italic: boolean;
  spaced: boolean;
  game: "anchor" | "mirror" | "pulse";
};

export const LOOP_CONFIG: Record<LoopType, LoopStyle> = {
  catastrophising: {
    color: "#7da6c4",
    label: "a catastrophising loop",
    subtitle: "a fear reaching forward into a future that hasn't happened",
    italic: true,
    spaced: false,
    game: "anchor",
  },
  shame: {
    color: "#c99a6a",
    label: "a shame loop",
    subtitle: "a judgement turned inward, about who you think you are",
    italic: true,
    spaced: false,
    game: "mirror",
  },
  racing: {
    color: "#9ab58f",
    label: "a racing loop",
    subtitle: "too many things, all at once, none of them finished",
    italic: false,
    spaced: true,
    game: "pulse",
  },
};
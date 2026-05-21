export type LoopType = "catastrophising" | "shame" | "racing";

export type ClassifyResponse = {
  loop_type: LoopType;
  confidence: number;
};

export type Screen =
  | "input"
  | "result"
  | "anchor"
  | "anchor-game"
  | "anchor-complete"
  | "mirror"
  | "mirror-game"
  | "mirror-complete"
  | "pulse"
  | "pulse-game"
  | "pulse-complete"
  | "reflect";

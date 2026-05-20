export type LoopType = "catastrophising" | "shame" | "racing";

export type ClassifyResponse = {
  loop_type: LoopType;
  reasoning: string;
};

export type Screen = "input" | "result" | "anchor" | "mirror" | "pulse";
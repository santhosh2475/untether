"use client";

import type { SortableFragment } from "./MirrorGame";

const accent = "#c99a6a";

type MirrorCompleteProps = {
  sorted: SortableFragment[];
  onReflect: () => void;
};

export default function MirrorComplete({
  sorted,
  onReflect,
}: MirrorCompleteProps) {
  const happened = sorted.filter((f) => f.pile === "happened");
  const story = sorted.filter((f) => f.pile === "story");

  const renderStack = (
    items: SortableFragment[],
    label: string,
    color: string,
    border: string
  ) => (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: "var(--text-dim)", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 12px" }}>
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
        {items.length === 0 && (
          <p style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: 12, color: "var(--text-dim)", textAlign: "center", margin: 0 }}>
            nothing here
          </p>
        )}
        {items.map((f, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid " + border, borderRadius: 8, padding: "10px 12px" }}>
            <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: color, textAlign: "center", margin: 0, lineHeight: 1.4 }}>
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", margin: "0 0 24px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
        mirror
      </p>

      <h1 style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: 28, fontWeight: 400, color: accent, textAlign: "center", margin: "0 0 32px", lineHeight: 1.3 }}>
        Here is what you were holding
      </h1>

      <div style={{ display: "flex", gap: 16, margin: "0 0 36px", alignItems: "flex-start" }}>
        {renderStack(happened, "what happened", "var(--text-muted)", "#3a352c")}
        {renderStack(story, "the story", accent, "#5a4733")}
      </div>

      <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--text-muted)", textAlign: "center", margin: "0 auto 40px", lineHeight: 1.75, maxWidth: 360 }}>
        Everyone builds a story on top of what happened. You just looked at
        yours, and saw where one ends and the other begins. The story can be
        set down. What happened is smaller than it felt.
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={onReflect}
          style={{ background: "transparent", border: "1px solid " + accent, color: accent, padding: "12px 32px", borderRadius: 8, fontSize: 14, letterSpacing: "0.06em", cursor: "pointer", fontFamily: "var(--font-inter), -apple-system, sans-serif", transition: "all 0.2s ease" }}
        >
          one more moment
        </button>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";

const accent = "#c99a6a";

export type SortableFragment = {
  text: string;
  pile: "happened" | "story" | null;
};

type MirrorGameProps = {
  fragments: string[];
  onComplete: (sorted: SortableFragment[]) => void;
};

type Phase = "dealing" | "back" | "flipping" | "face" | "throwing";

export default function MirrorGame({ fragments, onComplete }: MirrorGameProps) {
  const [items, setItems] = useState<SortableFragment[]>(
    fragments.map((text) => ({ text, pile: null }))
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("dealing");
  const [throwDir, setThrowDir] = useState<"happened" | "story" | null>(null);

  useEffect(() => {
    setThrowDir(null);
    setPhase("dealing");
    const t1 = setTimeout(() => setPhase("back"), 450);
    const t2 = setTimeout(() => setPhase("flipping"), 850);
    const t3 = setTimeout(() => setPhase("face"), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [index]);

  const handleSort = (pile: "happened" | "story") => {
    if (phase !== "face") return;

    setThrowDir(pile);
    setPhase("throwing");

    const updated = items.map((item, i) =>
      i === index ? { ...item, pile } : item
    );

    setTimeout(() => {
      setItems(updated);
      if (index >= items.length - 1) {
        onComplete(updated);
      } else {
        setIndex(index + 1);
      }
    }, 350);
  };

  const current = items[index];
  const showFace = phase === "face" || phase === "throwing";
  const interactive = phase === "face";

  let cardTransform = "translateY(0) scaleX(1)";
  let cardOpacity = 1;
  if (phase === "dealing") {
    cardTransform = "translateY(-28px) scaleX(1)";
    cardOpacity = 0;
  } else if (phase === "flipping") {
    cardTransform = "translateY(0) scaleX(0.04)";
  } else if (phase === "throwing") {
    const x = throwDir === "happened" ? "-120%" : "120%";
    const rot = throwDir === "happened" ? "-12deg" : "12deg";
    cardTransform = `translateX(${x}) rotate(${rot})`;
    cardOpacity = 0;
  }

  return (
    <>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "0 0 32px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        mirror
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0 0 32px",
          perspective: "none",
        }}
      >
        <div
          style={{
            width: 220,
            minHeight: 280,
            background: showFace ? "#1b1a17" : "#141310",
            border: "1px solid " + (showFace ? "#4a4234" : "#2a2722"),
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 26,
            boxSizing: "border-box",
            boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
            transform: cardTransform,
            opacity: cardOpacity,
            transition:
              phase === "throwing"
                ? "transform 0.35s ease-in, opacity 0.35s ease-in"
                : "transform 0.2s ease, opacity 0.35s ease, background 0.2s ease, border-color 0.2s ease",
          }}
        >
          {showFace ? (
            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: 19,
                color: "var(--text)",
                textAlign: "center",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {current.text}
            </p>
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1px solid #3a352c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  border: "1px solid #3a352c",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 0 20px",
          opacity: interactive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        Where does this one belong?
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          opacity: interactive ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <button
          onClick={() => handleSort("happened")}
          disabled={!interactive}
          style={{
            width: 260,
            background: "transparent",
            border: "1px solid var(--text-dim)",
            color: "var(--text-muted)",
            padding: "13px",
            borderRadius: 9,
            fontSize: 14,
            letterSpacing: "0.03em",
            cursor: interactive ? "pointer" : "default",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          a thing that happened
        </button>

        <button
          onClick={() => handleSort("story")}
          disabled={!interactive}
          style={{
            width: 260,
            background: "transparent",
            border: "1px solid " + accent,
            color: accent,
            padding: "13px",
            borderRadius: 9,
            fontSize: 14,
            letterSpacing: "0.03em",
            cursor: interactive ? "pointer" : "default",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          a story I&rsquo;m telling
        </button>
      </div>
    </>
  );
}

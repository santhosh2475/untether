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

export default function MirrorGame({ fragments, onComplete }: MirrorGameProps) {
  const [items, setItems] = useState<SortableFragment[]>(
    fragments.map((text) => ({ text, pile: null }))
  );
  const [index, setIndex] = useState(0);
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    setCardVisible(false);
    const timer = setTimeout(() => setCardVisible(true), 600);
    return () => clearTimeout(timer);
  }, [index]);

  const handleSort = (pile: "happened" | "story") => {
    if (!cardVisible) return;

    const updated = items.map((item, i) =>
      i === index ? { ...item, pile } : item
    );
    setItems(updated);

    if (index >= items.length - 1) {
      onComplete(updated);
    } else {
      setIndex(index + 1);
    }
  };

  const current = items[index];

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
        }}
      >
        <div
          style={{
            width: 220,
            minHeight: 280,
            background: "var(--surface)",
            border: "1px solid #3a352c",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 28,
            boxSizing: "border-box",
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
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
        </div>
      </div>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 0 20px",
          opacity: cardVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
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
          opacity: cardVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <button
          onClick={() => handleSort("happened")}
          disabled={!cardVisible}
          style={{
            width: 260,
            background: "transparent",
            border: "1px solid var(--text-dim)",
            color: "var(--text-muted)",
            padding: "13px",
            borderRadius: 9,
            fontSize: 14,
            letterSpacing: "0.03em",
            cursor: cardVisible ? "pointer" : "default",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          a thing that happened
        </button>

        <button
          onClick={() => handleSort("story")}
          disabled={!cardVisible}
          style={{
            width: 260,
            background: "transparent",
            border: "1px solid " + accent,
            color: accent,
            padding: "13px",
            borderRadius: 9,
            fontSize: 14,
            letterSpacing: "0.03em",
            cursor: cardVisible ? "pointer" : "default",
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

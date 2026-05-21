"use client";

import { useState, useEffect } from "react";

const accent = "#9ab58f";
const BREATH_MS = 5000;

type PulseGameProps = {
  items: string[];
  onComplete: () => void;
};

export default function PulseGame({ items, onComplete }: PulseGameProps) {
  const [index, setIndex] = useState(0);
  const [itemVisible, setItemVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setItemVisible(false);
    setReady(false);
    setLeaving(false);

    const showTimer = setTimeout(() => setItemVisible(true), 500);
    const readyTimer = setTimeout(() => setReady(true), 500 + BREATH_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(readyTimer);
    };
  }, [index]);

  const handleNext = () => {
    if (!ready || leaving) return;
    setLeaving(true);

    setTimeout(() => {
      if (index >= items.length - 1) {
        onComplete();
      } else {
        setIndex(index + 1);
      }
    }, 450);
  };

  const current = items[index];

  return (
    <>
      <style>{`
        @keyframes pulseBreathe {
          0%, 100% { transform: scale(0.62); opacity: 0.4; }
          50% { transform: scale(1); opacity: 0.85; }
        }
      `}</style>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "0 0 8px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        pulse
      </p>

      <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 4px" }}>
        <div style={{ display: "flex", gap: 5 }}>
          {items.map((_, i) => (
            <div
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: i < index ? accent : "var(--border)",
                transition: "background 0.4s ease",
              }}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          margin: "16px 0",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            border: "1px solid " + accent,
            animation: itemVisible
              ? `pulseBreathe ${BREATH_MS}ms ease-in-out infinite`
              : "none",
            opacity: itemVisible ? 1 : 0,
          }}
        />
        <p
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: 24,
            color: "var(--text)",
            textAlign: "center",
            margin: 0,
            padding: "0 24px",
            lineHeight: 1.4,
            position: "relative",
            opacity: itemVisible && !leaving ? 1 : 0,
            transform: leaving ? "translateY(-10px)" : "translateY(0)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          {current}
        </p>
      </div>

      <p
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "8px 0 28px",
          opacity: itemVisible && !ready ? 0.7 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        breathe with it
      </p>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleNext}
          disabled={!ready || leaving}
          style={{
            background: "transparent",
            border: "1px solid " + accent,
            color: accent,
            padding: "11px 30px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor: ready && !leaving ? "pointer" : "default",
            opacity: ready && !leaving ? 1 : 0.25,
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "opacity 0.5s ease",
          }}
        >
          set it down
        </button>
      </div>
    </>
  );
}

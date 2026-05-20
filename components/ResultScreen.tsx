"use client";

import type { ClassifyResponse } from "../lib/types";
import { LOOP_CONFIG } from "../lib/loopConfig";

type ResultScreenProps = {
  result: ClassifyResponse;
  onContinue: () => void;
  onReset: () => void;
};

export default function ResultScreen({
  result,
  onContinue,
  onReset,
}: ResultScreenProps) {
  const config = LOOP_CONFIG[result.loop_type];

  return (
    <>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 11,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "0 0 18px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        this looks like
      </p>

      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: config.italic ? "italic" : "normal",
          fontSize: config.spaced ? 38 : 44,
          fontWeight: 400,
          color: config.color,
          textAlign: "center",
          margin: "0 0 20px",
          lineHeight: 1.2,
          letterSpacing: config.spaced ? "0.06em" : "-0.01em",
          wordSpacing: config.spaced ? "4px" : "0",
        }}
      >
        {config.label}
      </h1>

      <div
        style={{
          width: 32,
          height: 1,
          background: config.color,
          margin: "0 auto 20px",
        }}
      />

      <p
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: config.italic ? "italic" : "normal",
          fontSize: 15,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 auto 16px",
          lineHeight: 1.7,
          maxWidth: 340,
          letterSpacing: config.spaced ? "0.03em" : "0",
        }}
      >
        {config.subtitle}
      </p>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 13,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "0 auto 48px",
          lineHeight: 1.7,
          maxWidth: 340,
        }}
      >
        {result.reasoning}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
        }}
      >
        <button
          onClick={onContinue}
          style={{
            background: "transparent",
            border: `1px solid ${config.color}`,
            color: config.color,
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor: "pointer",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          interrupt it
        </button>

        <button
          onClick={onReset}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-dim)",
            padding: "4px 12px",
            fontSize: 12,
            letterSpacing: "0.04em",
            cursor: "pointer",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
          }}
        >
          another thought
        </button>
      </div>
    </>
  );
}
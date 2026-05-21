"use client";

import { useState, useEffect } from "react";

const accent = "#7da6c4";

const STEPS = [
  { sense: "see", count: 5, prompt: "something you can see" },
  { sense: "touch", count: 4, prompt: "something you can feel or touch" },
  { sense: "hear", count: 3, prompt: "something you can hear" },
  { sense: "smell", count: 2, prompt: "something you can smell" },
  { sense: "taste", count: 1, prompt: "something you can taste" },
];

type AnchorGameProps = {
  onComplete: (entries: string[]) => void;
};

export default function AnchorGame({ onComplete }: AnchorGameProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [itemNumber, setItemNumber] = useState(1);
  const [entries, setEntries] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [promptVisible, setPromptVisible] = useState(false);

  const step = STEPS[stepIndex];

  useEffect(() => {
    setPromptVisible(false);
    const timer = setTimeout(() => {
      setPromptVisible(true);
    }, 900);
    return () => clearTimeout(timer);
  }, [stepIndex, itemNumber]);

  const handleSubmit = () => {
    if (!current.trim() || !promptVisible) return;

    const updatedEntries = [...entries, current.trim()];
    setEntries(updatedEntries);
    setCurrent("");

    const isLastItemOfStep = itemNumber >= step.count;
    const isLastStep = stepIndex >= STEPS.length - 1;

    if (isLastItemOfStep && isLastStep) {
      onComplete(updatedEntries);
    } else if (isLastItemOfStep) {
      setStepIndex(stepIndex + 1);
      setItemNumber(1);
    } else {
      setItemNumber(itemNumber + 1);
    }
  };

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
        anchor &middot; {step.sense}
      </p>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 12,
          color: "var(--text-dim)",
          textAlign: "center",
          margin: "0 0 20px",
          letterSpacing: "0.1em",
        }}
      >
        {itemNumber} of {step.count}
      </p>

      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: 30,
          fontWeight: 400,
          color: accent,
          textAlign: "center",
          margin: "0 0 36px",
          lineHeight: 1.3,
          opacity: promptVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        Name {step.prompt}
      </h1>

      <input
        type="text"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder="..."
        disabled={!promptVisible}
        autoFocus
        style={{
          width: "100%",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          padding: 16,
          color: "var(--text)",
          fontSize: 16,
          fontFamily: "var(--font-inter), -apple-system, sans-serif",
          outline: "none",
          textAlign: "center",
          marginBottom: 28,
          opacity: promptVisible ? 1 : 0.3,
          transition: "opacity 0.4s ease",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = accent)}
        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleSubmit}
          disabled={!current.trim() || !promptVisible}
          style={{
            background: "transparent",
            border: "1px solid " + accent,
            color: accent,
            padding: "11px 30px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor:
              !current.trim() || !promptVisible ? "not-allowed" : "pointer",
            opacity: !current.trim() || !promptVisible ? 0.35 : 1,
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          next
        </button>
      </div>
    </>
  );
}

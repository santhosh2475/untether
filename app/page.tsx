"use client";

import { useState } from "react";

type ClassifyResponse = {
  loop_type: "catastrophising" | "shame" | "racing";
  reasoning: string;
};

const LOOP_CONFIG = {
  catastrophising: {
    color: "#7da6c4",
    label: "a catastrophising loop",
    subtitle: "a fear reaching forward into a future that hasn't happened",
    italic: true,
    spaced: false,
  },
  shame: {
    color: "#c99a6a",
    label: "a shame loop",
    subtitle: "a judgement turned inward, about who you think you are",
    italic: true,
    spaced: false,
  },
  racing: {
    color: "#9ab58f",
    label: "a racing loop",
    subtitle: "too many things, all at once, none of them finished",
    italic: false,
    spaced: true,
  },
} as const;

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!checkIn.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check_in: checkIn }),
      });

      if (!response.ok) {
        throw new Error("Classification failed");
      }

      const data: ClassifyResponse = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCheckIn("");
    setResult(null);
    setError(null);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        <p
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: 13,
            color: "var(--text-dim)",
            letterSpacing: "0.18em",
            textTransform: "lowercase",
            textAlign: "center",
            margin: "0 0 56px",
          }}
        >
          untether
        </p>

        {!result && (
          <>
            <h1
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: 36,
                fontWeight: 400,
                color: "var(--text)",
                textAlign: "center",
                margin: "0 0 16px",
                lineHeight: 1.2,
              }}
            >
              What&rsquo;s looping?
            </h1>

            <p
              style={{
                fontSize: 14,
                color: "var(--text-muted)",
                textAlign: "center",
                margin: "0 0 40px",
                lineHeight: 1.6,
              }}
            >
              Type what&rsquo;s stuck in your head.
            </p>

            <textarea
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              placeholder="what if..."
              rows={4}
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 10,
                padding: 16,
                color: "var(--text)",
                fontSize: 15,
                lineHeight: 1.6,
                fontFamily: "var(--font-inter), -apple-system, sans-serif",
                resize: "none",
                outline: "none",
                marginBottom: 24,
                opacity: loading ? 0.5 : 1,
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleSubmit}
                disabled={!checkIn.trim() || loading}
                style={{
                  background: "transparent",
                  border: "1px solid var(--accent)",
                  color: "var(--accent)",
                  padding: "12px 32px",
                  borderRadius: 8,
                  fontSize: 14,
                  letterSpacing: "0.06em",
                  cursor: !checkIn.trim() || loading ? "not-allowed" : "pointer",
                  opacity: !checkIn.trim() || loading ? 0.4 : 1,
                  fontFamily: "var(--font-inter), -apple-system, sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "thinking..." : "unhook"}
              </button>
            </div>

            {error && (
              <p
                style={{
                  marginTop: 24,
                  textAlign: "center",
                  color: "#c97565",
                  fontSize: 13,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {error}
              </p>
            )}
          </>
        )}

        {result && (
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
                fontStyle: LOOP_CONFIG[result.loop_type].italic
                  ? "italic"
                  : "normal",
                fontSize: LOOP_CONFIG[result.loop_type].spaced ? 38 : 44,
                fontWeight: 400,
                color: LOOP_CONFIG[result.loop_type].color,
                textAlign: "center",
                margin: "0 0 20px",
                lineHeight: 1.2,
                letterSpacing: LOOP_CONFIG[result.loop_type].spaced
                  ? "0.06em"
                  : "-0.01em",
                wordSpacing: LOOP_CONFIG[result.loop_type].spaced ? "4px" : "0",
              }}
            >
              {LOOP_CONFIG[result.loop_type].label}
            </h1>

            <div
              style={{
                width: 32,
                height: 1,
                background: LOOP_CONFIG[result.loop_type].color,
                margin: "0 auto 20px",
              }}
            />

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: LOOP_CONFIG[result.loop_type].italic
                  ? "italic"
                  : "normal",
                fontSize: 15,
                color: "var(--text-muted)",
                textAlign: "center",
                margin: "0 auto 16px",
                lineHeight: 1.7,
                maxWidth: 340,
                letterSpacing: LOOP_CONFIG[result.loop_type].spaced
                  ? "0.03em"
                  : "0",
              }}
            >
              {LOOP_CONFIG[result.loop_type].subtitle}
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

            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleReset}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-muted)",
                  padding: "10px 24px",
                  borderRadius: 8,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), -apple-system, sans-serif",
                  transition: "all 0.2s ease",
                }}
              >
                another thought
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
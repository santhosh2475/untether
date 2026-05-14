"use client";

import { useState } from "react";

type ClassifyResponse = {
  loop_type: "catastrophising" | "shame" | "racing";
  reasoning: string;
};

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
                fontSize: 13,
                color: "var(--text-muted)",
                textAlign: "center",
                margin: "0 0 16px",
                letterSpacing: "0.06em",
              }}
            >
              this looks like
            </p>

            <h1
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: 44,
                fontWeight: 400,
                color: "var(--accent)",
                textAlign: "center",
                margin: "0 0 32px",
                lineHeight: 1.2,
              }}
            >
              a {result.loop_type} loop
            </h1>

            <p
              style={{
                fontFamily: "var(--font-fraunces)",
                fontStyle: "italic",
                fontSize: 16,
                color: "var(--text-muted)",
                textAlign: "center",
                margin: "0 0 56px",
                lineHeight: 1.7,
                maxWidth: 380,
                marginLeft: "auto",
                marginRight: "auto",
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
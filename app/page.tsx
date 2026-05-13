"use client";

import { useState } from "react";

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!checkIn.trim()) return;
    console.log("Check-in:", checkIn);
    setSubmitted(true);
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
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        />

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handleSubmit}
            disabled={!checkIn.trim()}
            style={{
              background: "transparent",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              padding: "12px 32px",
              borderRadius: 8,
              fontSize: 14,
              letterSpacing: "0.06em",
              cursor: checkIn.trim() ? "pointer" : "not-allowed",
              opacity: checkIn.trim() ? 1 : 0.4,
              fontFamily: "var(--font-inter), -apple-system, sans-serif",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (checkIn.trim()) {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            unhook
          </button>
        </div>

        {submitted && (
          <p
            style={{
              marginTop: 32,
              textAlign: "center",
              color: "var(--text-muted)",
              fontSize: 13,
              fontStyle: "italic",
              fontFamily: "var(--font-fraunces)",
            }}
          >
         
          </p>
        )}
      </div>
    </main>
  );
}
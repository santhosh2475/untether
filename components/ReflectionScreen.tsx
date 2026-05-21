"use client";

import { useState } from "react";

type ReflectionScreenProps = {
  loopType: string;
  game: string;
  checkIn: string;
  deviceId: string;
  accent: string;
  onDone: () => void;
};

export default function ReflectionScreen({
  loopType,
  game,
  checkIn,
  deviceId,
  accent,
  onDone,
}: ReflectionScreenProps) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"ask" | "loading" | "response">("ask");
  const [response, setResponse] = useState("");

  const submit = async (reflectionText: string) => {
    setPhase("loading");
    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          device_id: deviceId,
          loop_type: loopType,
          game,
          check_in: checkIn,
          reflection: reflectionText,
        }),
      });
      if (!res.ok) throw new Error("reflect failed");
      const data: { response: string } = await res.json();
      setResponse(data.response);
    } catch (err) {
      console.error(err);
      setResponse(
        "Thank you for sitting with that. However the loop feels right now is okay. Try to rest."
      );
    }
    setPhase("response");
  };

  return (
    <>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", margin: "0 0 24px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
        a moment
      </p>

      {phase === "ask" && (
        <>
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: 27, fontWeight: 400, color: accent, textAlign: "center", margin: "0 0 28px", lineHeight: 1.35 }}>
            How is the loop now?
          </h1>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--text-muted)", textAlign: "center", margin: "0 auto 24px", lineHeight: 1.7, maxWidth: 340 }}>
            Compared to when you started. A few words is enough, or none at all.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="..."
            style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 14, color: "var(--text)", fontSize: 15, fontFamily: "var(--font-inter), -apple-system, sans-serif", outline: "none", resize: "none", marginBottom: 24, boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <button onClick={() => submit(text)} disabled={!text.trim()} style={{ background: "transparent", border: "1px solid " + accent, color: accent, padding: "12px 32px", borderRadius: 8, fontSize: 14, letterSpacing: "0.06em", cursor: text.trim() ? "pointer" : "not-allowed", opacity: text.trim() ? 1 : 0.35, fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
              share
            </button>
            <button onClick={() => submit("")} style={{ background: "transparent", border: "none", color: "var(--text-dim)", padding: "4px 12px", fontSize: 12, letterSpacing: "0.04em", cursor: "pointer", fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
              skip
            </button>
          </div>
        </>
      )}

      {phase === "loading" && (
        <p style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: 15, color: "var(--text-dim)", textAlign: "center", lineHeight: 1.7 }}>
          &hellip;
        </p>
      )}

      {phase === "response" && (
        <>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 16, color: "var(--text-muted)", textAlign: "center", margin: "0 auto 36px", lineHeight: 1.8, maxWidth: 360 }}>
            {response}
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onDone} style={{ background: "transparent", border: "1px solid " + accent, color: accent, padding: "12px 32px", borderRadius: 8, fontSize: 14, letterSpacing: "0.06em", cursor: "pointer", fontFamily: "var(--font-inter), -apple-system, sans-serif" }}>
              another thought
            </button>
          </div>
        </>
      )}
    </>
  );
}

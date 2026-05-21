"use client";

const accent = "#7da6c4";

type AnchorCompleteProps = {
  onReflect: () => void;
};

export default function AnchorComplete({ onReflect }: AnchorCompleteProps) {
  return (
    <>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", margin: "0 0 28px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
        anchor
      </p>

      <h1 style={{ fontFamily: "var(--font-fraunces)", fontStyle: "italic", fontSize: 32, fontWeight: 400, color: accent, textAlign: "center", margin: "0 0 24px", lineHeight: 1.3 }}>
        You came back
      </h1>

      <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "var(--text-muted)", textAlign: "center", margin: "0 auto 40px", lineHeight: 1.75, maxWidth: 360 }}>
        The loop was pulling you somewhere that hasn&rsquo;t happened. For a
        moment, you were here instead, in the room you&rsquo;re actually in.
        That&rsquo;s the whole exercise. Nothing more is needed right now.
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

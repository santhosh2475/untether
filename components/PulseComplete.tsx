"use client";

const accent = "#9ab58f";

type PulseCompleteProps = {
  onReflect: () => void;
};

export default function PulseComplete({ onReflect }: PulseCompleteProps) {
  return (
    <>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--text-dim)", textAlign: "center", margin: "0 0 28px", letterSpacing: "0.16em", textTransform: "uppercase" }}>
        pulse
      </p>

      <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: 31, fontWeight: 400, color: accent, textAlign: "center", margin: "0 0 24px", lineHeight: 1.3, letterSpacing: "0.03em" }}>
        You set them down
      </h1>

      <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, color: "var(--text-muted)", textAlign: "center", margin: "0 auto 40px", lineHeight: 1.75, maxWidth: 360 }}>
        They are all still there. Nothing got solved, and nothing needed to be,
        not tonight. But a moment ago you were holding every one of them at
        once. Just now you held them one at a time, and then let go. That was
        the part that needed to happen.
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

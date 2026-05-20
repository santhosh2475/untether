"use client";

type PulseIntroProps = {
  onBack: () => void;
};

export default function PulseIntro({ onBack }: PulseIntroProps) {
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
        pulse
      </p>
      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontSize: 32,
          fontWeight: 400,
          color: "#9ab58f",
          textAlign: "center",
          margin: "0 0 24px",
          lineHeight: 1.25,
          letterSpacing: "0.04em",
        }}
      >
        Coming soon
      </h1>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 auto 40px",
          lineHeight: 1.7,
          maxWidth: 340,
        }}
      >
        The racing game is still being built.
      </p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={onBack}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-muted)",
            padding: "10px 24px",
            borderRadius: 8,
            fontSize: 13,
            cursor: "pointer",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
          }}
        >
          back
        </button>
      </div>
    </>
  );
}
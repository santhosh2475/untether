"use client";

type MirrorIntroProps = {
  onBack: () => void;
};

export default function MirrorIntro({ onBack }: MirrorIntroProps) {
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
        mirror
      </p>
      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: 32,
          fontWeight: 400,
          color: "#c99a6a",
          textAlign: "center",
          margin: "0 0 24px",
          lineHeight: 1.25,
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
        The shame game is still being built.
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
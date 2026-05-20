"use client";

type AnchorIntroProps = {
  checkIn: string;
  onBegin: () => void;
  onBack: () => void;
};

export default function AnchorIntro({
  checkIn,
  onBegin,
  onBack,
}: AnchorIntroProps) {
  const accent = "#7da6c4";

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
        anchor
      </p>

      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: 34,
          fontWeight: 400,
          color: accent,
          textAlign: "center",
          margin: "0 0 24px",
          lineHeight: 1.25,
        }}
      >
        Come back to right now
      </h1>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 auto 16px",
          lineHeight: 1.7,
          maxWidth: 360,
        }}
      >
        The loop is pulling you into a future that hasn&rsquo;t happened.
        Anchor brings you back to the room you&rsquo;re actually in.
      </p>

      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          color: "var(--text-muted)",
          textAlign: "center",
          margin: "0 auto 40px",
          lineHeight: 1.7,
          maxWidth: 360,
        }}
      >
        It takes about ninety seconds. You&rsquo;ll use what&rsquo;s around
        you right now to interrupt the spiral.
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
          onClick={onBegin}
          style={{
            background: "transparent",
            border: `1px solid ${accent}`,
            color: accent,
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor: "pointer",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          begin
        </button>

        <button
          onClick={onBack}
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
          back
        </button>
      </div>
    </>
  );
}
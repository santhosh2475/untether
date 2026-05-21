"use client";

type MirrorIntroProps = {
  opening: string | null;
  loading: boolean;
  onBegin: () => void;
  onBack: () => void;
};

const accent = "#c99a6a";

export default function MirrorIntro({
  opening,
  loading,
  onBegin,
  onBack,
}: MirrorIntroProps) {
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
          fontSize: 34,
          fontWeight: 400,
          color: accent,
          textAlign: "center",
          margin: "0 0 28px",
          lineHeight: 1.25,
        }}
      >
        Look at the story
      </h1>

      {loading && (
        <p
          style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: 15,
            color: "var(--text-dim)",
            textAlign: "center",
            margin: "0 auto 40px",
            lineHeight: 1.7,
            maxWidth: 360,
          }}
        >
          settling in&hellip;
        </p>
      )}

      {!loading && opening && (
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            color: "var(--text-muted)",
            textAlign: "center",
            margin: "0 auto 40px",
            lineHeight: 1.75,
            maxWidth: 380,
          }}
        >
          {opening}
        </p>
      )}

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
          disabled={loading}
          style={{
            background: "transparent",
            border: "1px solid " + accent,
            color: accent,
            padding: "12px 32px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.4 : 1,
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

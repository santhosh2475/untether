"use client";

type IntroScreenProps = {
  onContinue: () => void;
};

export default function IntroScreen({ onContinue }: IntroScreenProps) {
  return (
    <>
      <h1
        style={{
          fontFamily: "var(--font-fraunces)",
          fontStyle: "italic",
          fontSize: 34,
          fontWeight: 400,
          color: "var(--text)",
          textAlign: "center",
          margin: "0 0 32px",
          lineHeight: 1.25,
        }}
      >
        It is late, and your mind will not settle.
      </h1>

      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 15,
          color: "var(--text-muted)",
          textAlign: "center",
          lineHeight: 1.8,
          maxWidth: 380,
          margin: "0 auto 16px",
        }}
      >
        <p style={{ margin: "0 0 18px" }}>
          Untether is a quiet place for the loop that keeps you awake. The
          racing, the what-ifs, the harsh stories at 2 AM.
        </p>
        <p style={{ margin: "0 0 18px" }}>
          Tell it what is looping. It will notice the shape of the loop, and
          guide you through one small thing to interrupt it. It will not fix
          your life tonight. It is just here to break the spiral.
        </p>
        <p style={{ margin: 0, color: "var(--text-dim)", fontSize: 13 }}>
          Nothing you write is tied to your name. It stays on your device.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <button
          onClick={onContinue}
          style={{
            background: "transparent",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            padding: "12px 36px",
            borderRadius: 8,
            fontSize: 14,
            letterSpacing: "0.06em",
            cursor: "pointer",
            fontFamily: "var(--font-inter), -apple-system, sans-serif",
            transition: "all 0.2s ease",
          }}
        >
          okay
        </button>
      </div>
    </>
  );
}

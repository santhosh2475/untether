"use client";

type InputScreenProps = {
  checkIn: string;
  setCheckIn: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
};

export default function InputScreen({
  checkIn,
  setCheckIn,
  onSubmit,
  loading,
  error,
}: InputScreenProps) {
  return (
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
          onClick={onSubmit}
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
  );
}
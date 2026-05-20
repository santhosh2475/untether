"use client";

import { useState } from "react";
import type { ClassifyResponse, Screen } from "../lib/types";
import { LOOP_CONFIG } from "../lib/loopConfig";
import InputScreen from "../components/InputScreen";
import ResultScreen from "../components/ResultScreen";
import AnchorIntro from "../components/AnchorIntro";
import MirrorIntro from "../components/MirrorIntro";
import PulseIntro from "../components/PulseIntro";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [checkIn, setCheckIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!checkIn.trim() || loading) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check_in: checkIn }),
      });

      if (!response.ok) {
        throw new Error("Classification failed");
      }

      const data: ClassifyResponse = await response.json();
      setResult(data);
      setScreen("result");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    if (!result) return;
    const game = LOOP_CONFIG[result.loop_type].game;
    setScreen(game);
  };

  const handleReset = () => {
    setCheckIn("");
    setResult(null);
    setError(null);
    setScreen("input");
  };

  const handleBackToResult = () => {
    setScreen("result");
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

        {screen === "input" && (
          <InputScreen
            checkIn={checkIn}
            setCheckIn={setCheckIn}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}

        {screen === "result" && result && (
          <ResultScreen
            result={result}
            onContinue={handleContinue}
            onReset={handleReset}
          />
        )}

        {screen === "anchor" && (
          <AnchorIntro
            checkIn={checkIn}
            onBegin={() => console.log("Anchor begins")}
            onBack={handleBackToResult}
          />
        )}

        {screen === "mirror" && <MirrorIntro onBack={handleBackToResult} />}

        {screen === "pulse" && <PulseIntro onBack={handleBackToResult} />}
      </div>
    </main>
  );
}
"use client";

import { useState } from "react";
import type { ClassifyResponse, Screen } from "../lib/types";
import { LOOP_CONFIG } from "../lib/loopConfig";
import InputScreen from "../components/InputScreen";
import ResultScreen from "../components/ResultScreen";
import AnchorIntro from "../components/AnchorIntro";
import AnchorGame from "../components/AnchorGame";
import AnchorComplete from "../components/AnchorComplete";
import MirrorIntro from "../components/MirrorIntro";
import PulseIntro from "../components/PulseIntro";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [checkIn, setCheckIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [opening, setOpening] = useState<string | null>(null);
  const [gamemasterLoading, setGamemasterLoading] = useState(false);

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

  const handleContinue = async () => {
    if (!result) return;

    const game = LOOP_CONFIG[result.loop_type].game;
    setScreen(game);
    setOpening(null);
    setGamemasterLoading(true);

    try {
      const response = await fetch("/api/gamemaster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          check_in: checkIn,
          loop_type: result.loop_type,
        }),
      });

      if (!response.ok) {
        throw new Error("Gamemaster failed");
      }

      const data: { opening: string; game: string } = await response.json();
      setOpening(data.opening);
    } catch (err) {
      console.error(err);
      setOpening(
        "The loop is pulling you toward something that hasn't happened. For the next ninety seconds, we come back to the room you're actually in."
      );
    } finally {
      setGamemasterLoading(false);
    }
  };

  const handleReset = () => {
    setCheckIn("");
    setResult(null);
    setError(null);
    setOpening(null);
    setGamemasterLoading(false);
    setScreen("input");
  };

  const handleBackToResult = () => {
    setScreen("result");
  };

  const handleAnchorBegin = () => {
    setScreen("anchor-game");
  };

  const handleAnchorComplete = (entries: string[]) => {
    console.log("Anchor entries:", entries);
    setScreen("anchor-complete");
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
            opening={opening}
            loading={gamemasterLoading}
            onBegin={handleAnchorBegin}
            onBack={handleBackToResult}
          />
        )}

        {screen === "anchor-game" && (
          <AnchorGame onComplete={handleAnchorComplete} />
        )}

        {screen === "anchor-complete" && (
          <AnchorComplete onReflect={handleReset} onReset={handleReset} />
        )}

        {screen === "mirror" && <MirrorIntro onBack={handleBackToResult} />}

        {screen === "pulse" && <PulseIntro onBack={handleBackToResult} />}
      </div>
    </main>
  );
}

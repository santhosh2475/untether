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
import MirrorGame from "../components/MirrorGame";
import type { SortableFragment } from "../components/MirrorGame";
import PulseIntro from "../components/PulseIntro";
import MirrorComplete from "../components/MirrorComplete";
import PulseGame from "../components/PulseGame";
import PulseComplete from "../components/PulseComplete";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("input");
  const [checkIn, setCheckIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ClassifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [opening, setOpening] = useState<string | null>(null);
  const [gamemasterLoading, setGamemasterLoading] = useState(false);

  const [fragments, setFragments] = useState<string[]>([]);
  const [mirrorLoading, setMirrorLoading] = useState(false);
  const [mirrorSorted, setMirrorSorted] = useState<SortableFragment[]>([]);
  const [pulseItems, setPulseItems] = useState<string[]>([]);
  const [pulseLoading, setPulseLoading] = useState(false);
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
      if (!response.ok) throw new Error("Classification failed");
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
      if (!response.ok) throw new Error("Gamemaster failed");
      const data: { opening: string; game: string } = await response.json();
      setOpening(data.opening);
    } catch (err) {
      console.error(err);
      setOpening(
        "The loop is telling you a hard story about who you are. For the next few minutes, we look at that story from the outside."
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
    setFragments([]);
    setMirrorSorted([]);
    setMirrorLoading(false);
    setScreen("input");
    setPulseItems([]);
    setPulseLoading(false);
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
const handlePulseBegin = async () => {
    setScreen("pulse-game");
    setPulseItems([]);
    setPulseLoading(true);
    try {
      const response = await fetch("/api/pulse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check_in: checkIn }),
      });
      if (!response.ok) throw new Error("Pulse failed");
      const data: { items: string[] } = await response.json();
      setPulseItems(data.items);
    } catch (err) {
      console.error(err);
      setPulseItems([
        "the things I need to do",
        "the things I have not finished",
        "everything waiting for tomorrow",
      ]);
    } finally {
      setPulseLoading(false);
    }
  };

  const handlePulseComplete = () => {
    setScreen("pulse-complete");
  };
  const handleMirrorBegin = async () => {
    setScreen("mirror-game");
    setFragments([]);
    setMirrorLoading(true);
    try {
      const response = await fetch("/api/mirror", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check_in: checkIn }),
      });
      if (!response.ok) throw new Error("Mirror failed");
      const data: { fragments: string[] } = await response.json();
      setFragments(data.fragments);
    } catch (err) {
      console.error(err);
      setFragments([
        "something happened today",
        "I did not handle it the way I wanted to",
        "I keep thinking about it",
        "I am the kind of person this happens to",
      ]);
    } finally {
      setMirrorLoading(false);
    }
  };

const handleMirrorComplete = (sorted: SortableFragment[]) => {
    setMirrorSorted(sorted);
    setScreen("mirror-complete");
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
          <AnchorComplete onReset={handleReset} />
        )}

        {screen === "mirror" && (
          <MirrorIntro
            opening={opening}
            loading={gamemasterLoading}
            onBegin={handleMirrorBegin}
            onBack={handleBackToResult}
          />
        )}

        {screen === "mirror-game" && mirrorLoading && (
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--text-dim)",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            breaking the thought apart&hellip;
          </p>
        )}

        {screen === "mirror-game" && !mirrorLoading && fragments.length > 0 && (
          <MirrorGame
            fragments={fragments}
            onComplete={handleMirrorComplete}
          />
        )}
       {screen === "mirror-complete" && (
          <MirrorComplete sorted={mirrorSorted} onReset={handleReset} />
        )}
        {screen === "pulse" && (
          <PulseIntro
            opening={opening}
            loading={gamemasterLoading}
            onBegin={handlePulseBegin}
            onBack={handleBackToResult}
          />
        )}

        {screen === "pulse-game" && pulseLoading && (
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontStyle: "italic",
              fontSize: 16,
              color: "var(--text-dim)",
              textAlign: "center",
              lineHeight: 1.7,
            }}
          >
            untangling the pile&hellip;
          </p>
        )}

        {screen === "pulse-game" && !pulseLoading && pulseItems.length > 0 && (
          <PulseGame items={pulseItems} onComplete={handlePulseComplete} />
        )}
        {screen === "pulse-complete" && (
          <PulseComplete onReset={handleReset} />
        )}
      </div>
    </main>
  );
}

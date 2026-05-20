# Untether Architecture

A three-stage agent system for interrupting 2 AM thought loops.

## The pipeline

\`\`\`
user check-in (raw thought)
    ↓
[Classifier agent]
    Input: { check_in: string }
    Output: { loop_type, reasoning }
    Model: gemini-2.5-flash-lite
    Purpose: identify which kind of loop this is
    ↓
[Gamemaster agent]
    Input: { check_in, loop_type, reasoning }
    Output: { opening_prompt, game_id }
    Model: gemini-2.5-flash-lite
    Purpose: personalise the game's opening based on the user's specific thought
    ↓
game runs (Anchor | Mirror | Pulse)
    ↓
[Reflection + Memory layer]
    Input: { session_data, user_reflection }
    Output: stored to Turso
    Model: gemini-2.5-flash-lite (light call, occasional)
    Purpose: learn what works for this user over time
\`\`\`

## Why three stages, not one

A single classifier returns a label but doesn't personalise the experience.
The Gamemaster lets games reference the user's specific worry by name.
Reflection + Memory lets the system learn which interrupts work for which user.

This is sequential agent design, not a multi-agent harness.
Three Gemini calls in a chain. No LangGraph, no Autogen, no orchestration framework.
Plain TypeScript functions composing into a real agent pipeline.

## Storage

Turso (libsql / SQLite-on-edge). Free tier sufficient for hackathon scale.

Tables (planned):
- sessions — one row per user check-in + classification + gamemaster output
- reflections — one row per post-game feedback
- patterns — aggregated per-user insights (Day 13+)

## API routes

- POST /api/classify — classifier agent (Day 2: built)
- POST /api/gamemaster — gamemaster agent (Day 5)
- POST /api/reflect — reflection storage (Day 12)

(No read routes yet; UI uses local state during a session.)

## Models in use

- gemini-2.5-flash-lite for all three agents
  Reasoning: free tier, low latency, good enough accuracy for classification (95%+ on eval set)

## What this is NOT

- Not a multi-agent harness like LangGraph or Autogen
- Not a complex graph — strictly sequential chain
- Not memory in the LLM-context-window sense; memory is database lookups + summary
- Not enterprise. Not B2B. Not a tool for therapists.

## Demo Day pitch (one line)

"Untether is a three-stage agent for 2 AM thought loops. The classifier reads what kind of stuck you are. The gamemaster designs the right pattern interrupt based on what you specifically said. Memory lets it learn what works for you over time. I built it because I needed it."

## Commitments

- No new agent layers added after this doc is committed
- If something doesn't fit one of the three stages, it doesn't belong in v1
- If I want to add LangGraph / Daytona / new harness on Day 12 out of FOMO, I re-read this doc and remember why I chose plain TypeScript
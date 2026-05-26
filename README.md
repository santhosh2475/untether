# Untether

An agent for 2 AM thought loops. Untether reads the *shape* of your spiral, whether catastrophising, shame, or racing, and guides you through the one intervention built for it.

Live demo: https://untether-chi.vercel.app

## The idea

Most tools treat anxious thinking as one thing. It is not. A catastrophising spiral (fear of an imagined future), a shame spiral (a harsh story about who you are), and a racing mind (too many things held at once) are different shapes, and each needs a different way out. Untether is built around that distinction.

## How it works: a multi-stage agent pipeline

Untether is not a single chatbot prompt. It is a pipeline of distinct AI stages, each with its own role, prompt, and safety guardrails.

1. **Classifier.** Reads the user's typed thought and classifies the *shape* of the loop (catastrophising / shame / racing) with a confidence score and a one-sentence rationale. Frozen against a 30-example evaluation set.

2. **Gamemaster (retrieval-augmented).** Writes a short, personalised opening for the user's specific worry. This stage uses RAG: past sessions are embedded and stored, and on a return visit the agent embeds the new thought, runs a semantic similarity search over the user's own history, and retrieves the most similar past sessions. If a genuinely similar past session is found, the opening gently acknowledges familiar ground.

3. **Intervention.** The user is routed into one of three exercises, each grounded in established psychology:
   - **Anchor** (catastrophising): 5-4-3-2-1 sensory grounding.
   - **Mirror** (shame): a card-sorting game built on cognitive defusion, separating what happened from the story being told about it.
   - **Pulse** (racing): a breath-paced, one-thing-at-a-time sequential-attention exercise.

4. **Reflection.** After the exercise, a reflection agent asks how the loop feels now, responds with care, and writes the session (including its embedding) to a persistent database. This is what gives later visits memory.

See `ARCHITECTURE.md` for the design decisions behind this structure.

## RAG over personal history

Untether's memory is implemented as retrieval-augmented generation over the user's *own* session history, not an external knowledge base.

- On reflection, each session's check-in is embedded (`gemini-embedding-001`) and the vector stored in the database.
- On a return visit, the new check-in is embedded and scored by cosine similarity against past sessions.
- The top matches above a similarity threshold are passed into the Gamemaster prompt as context.

At this scale a dedicated vector database is unnecessary; similarity is computed directly over the user's stored vectors. New users with no history are unaffected: retrieval returns nothing and the pipeline runs normally.

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **AI:** Google Gemini API (generation and embeddings)
- **Database:** Turso (libSQL)
- **Hosting:** Vercel

## Safety

Every prompt that speaks to a vulnerable user is written with explicit guardrails: no clinical language, no false reassurance, no amplifying the fear, and instructions to step out of the exercise frame and point toward real support if genuine distress is expressed. Untether is a coping tool to interrupt a loop. It is not therapy and not a replacement for real support.

## Running locally

```bash
npm install
```

Create a `.env.local` file with:

```
GOOGLE_API_KEY=your_gemini_api_key
TURSO_DATABASE_URL=your_turso_url
TURSO_AUTH_TOKEN=your_turso_token
```

Initialise the database schema:

```bash
npx tsx scripts/init-db.ts
```

Then run the dev server:

```bash
npm run dev
```

## Project structure

- `app/` pages and API routes (one route per agent stage)
- `components/` screen and game UI components
- `lib/` agent logic, prompts, database, embeddings, retrieval
- `scripts/` database setup and agent test scripts
- `evals/` classifier evaluation set

## About

Built solo for the UCWS Singapore Hackathon 2026 (Agent track).

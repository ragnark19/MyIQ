# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MyIQ is a professional online IQ test at **myiq.is**. Users take a free 40-question, 4-section timed test, then pay $2.99 via Paddle to unlock results (IQ score, percentile, category breakdown, strengths/weaknesses, PDF certificate).

## Tech Stack

Next.js 14 (App Router), TypeScript (strict), Tailwind CSS 3.4, Supabase (PostgreSQL), Paddle v2 payments, jsPDF for certificates. Font: Inter via `next/font/google`.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint (next lint)
npm run start    # Start production server
```

No test framework is configured.

**IMPORTANT: Always run `npm run build` before committing and pushing.** Vercel deploys from main, so broken builds go straight to production. Fix any type or build errors before pushing.

## Environment Variables

See `.env.local.example`. Key variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, `PADDLE_API_KEY`, `PADDLE_WEBHOOK_SECRET`, `NEXT_PUBLIC_PADDLE_PRICE_ID`, `NEXT_PUBLIC_APP_URL`.

In dev without Paddle configured, a "Skip Payment (Testing Only)" button bypasses payment by directly calling the webhook endpoint.

## Architecture

### Application Flow

```
/ (landing) → /test (creates session) → /test/[sessionId] (active test)
  → /complete/[sessionId] (payment gate) → Paddle webhook → /results/[sessionId]
```

**Session status lifecycle**: `in_progress` → `completed` (after score calculation) → `paid` (after Paddle webhook)

### Server vs Client Components

- Route-level components under `app/` are **server components** — fetch Supabase data directly, pass as props
- Interactive components (`TestContainer`, question types, results displays) use `'use client'`

### Supabase Client Usage

- **Server components / API routes**: `createClient()` from `lib/supabase/server.ts`
- **Webhook (bypasses RLS)**: `createServiceClient()` from `lib/supabase/server.ts`
- **Client components**: `createClient()` from `lib/supabase/client.ts`

### API Routes

All in `app/api/*/route.ts`: `sessions` (GET/POST/PATCH), `submit-answer` (POST, upserts), `calculate-score` (POST), `paddle-webhook` (POST), `certificate/[sessionId]` (GET, streams PDF).

### Path Alias

`@/*` maps to project root (e.g., `@/components/...`, `@/lib/...`, `@/types`).

## Test Structure

| Section | Category | Questions | Time |
|---|---|---|---|
| 1 | Pattern Recognition | 12 | 8 min |
| 2 | Numerical Reasoning | 10 | 6 min |
| 3 | Verbal Reasoning | 10 | 6 min |
| 4 | Spatial Reasoning | 8 | 5 min |

Section timer auto-advances when expired. Questions are defined in `lib/questions/seed-data.ts` and must be seeded into Supabase manually. The `TEST_SECTIONS` constant in `types/index.ts` defines section configuration.

## Scoring (`lib/scoring/calculator.ts`)

Raw score = sum of `points × difficulty_weight × time_bonus` for correct answers. Difficulty weights: 1.0–2.0 for levels 1–5. Time bonus: ×1.1 if answered in <30s. IQ mapped via linear z-score approximation (mean=100, SD=15, range 55–145). Strengths: categories ≥70% correct. Weaknesses: categories <50% correct.

## Database Tables

`questions`, `test_sessions` (status: in_progress/completed/paid), `test_responses` (unique on session_id + question_id), `payments`, `certificates`. Full types in `types/index.ts`.

## Styling

Custom Tailwind theme with `primary-*` (sky blue) and `accent-*` (fuchsia) color scales. Custom utility classes in `globals.css` (`@layer components`): `.btn-primary`, `.btn-secondary`, `.card`, `.gradient-text`, `.gradient-bg`. Custom animations: `fade-in`, `slide-up`, `pulse-slow`, `score-reveal`.

## UI Components

`Button` and `Card` in `components/ui/` use `forwardRef` and extend native HTML element attributes. Button supports `variant` (primary/secondary/ghost), `size` (sm/md/lg), and `isLoading` props.

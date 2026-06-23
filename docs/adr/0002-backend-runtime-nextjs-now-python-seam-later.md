---
status: accepted
---

# 0002 — Backend runtime: Next.js API routes now; reserve a seam for a Python service later

## Context

The foundation slice needs server-side work for exactly one thing: the Google SSO
auth flow (OIDC callback, session issuance, domain restriction, route protection).
The future data side of FINXO implies Python — the platform vision names
TimescaleDB and Celery for ingestion and scheduled compute. So the question is
whether to stand up a separate Python/FastAPI service **now** or start with the
Next.js server runtime and split later. The Architect owns this call.

## Considered options

1. **Next.js API routes / route handlers (Node/TS) only** — one runtime, one
   language, deploys with the app on Vercel.
2. **Separate Python/FastAPI service now** — second deployable, second language,
   second CI lane, cross-service auth — before any data workload exists.
3. **Both from day one** as a fixed monorepo split.

## Decision

Use **Next.js server runtime (route handlers + middleware, Node/TS) for the
foundation**, and do **not** stand up a Python service yet. Auth is naturally
Node-friendly (Auth.js, see ADR-0003) and the foundation has zero data/compute
workload, so a second service now is premature complexity (org Rule 2).

We **reserve the seam** for a Python/FastAPI service rather than denying it:

- Data-heavy / long-running research and ingestion endpoints will **not** live in
  Vercel serverless functions — serverless execution-time limits and cold starts
  make them a poor fit, and TimescaleDB/Celery are Python-native. When that work
  arrives (post-foundation data phase) it lands in a **separate Python/FastAPI
  service**, and the Next.js app calls it over an internal HTTP API.
- To keep that split cheap later, the Next.js app keeps non-trivial server logic
  in a server-side layer (`src/server/**`), not inline in components, so it can be
  re-homed without rewriting the UI.

## Consequences

- Foundation backend = Next.js route handlers; one deploy, one CI lane.
- The Backend Developer (FIN-6) implements auth in TS/Auth.js, not Python.
- **Split trigger to record now:** the first endpoint that needs TimescaleDB,
  Celery/background jobs, or runtimes exceeding Vercel function limits. That
  endpoint is the signal to introduce the Python service and revisit the repo
  shape (ADR-0004).
- Latency budgets: interactive/auth endpoints target Vercel serverless; future
  compute-heavy research endpoints get their own budget in the Python service and
  are explicitly out of the serverless path.

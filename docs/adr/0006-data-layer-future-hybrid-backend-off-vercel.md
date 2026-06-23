---
status: accepted
---

# 0006 — Data layer is a future, separate hybrid backend off Vercel — keep the foundation's path to it clean

## Context

The foundation (ADR-0001..0005) is a Next.js web app on Vercel with Auth.js Google
SSO — **no backend service is needed just to log in**. But FINXO's reason to exist
is investment research over market data, and that workload does not fit Vercel
(serverless functions are short-lived; ingestion must run continuously). This ADR
does **not** build the data layer. Its job is to (a) record the shape we already
know it will take, so the foundation does not paint us into a corner, and (b) name
the choices we are deliberately deferring. Nothing here is implemented in this epic.

## Decision (direction, to be built later)

When we connect a market-data provider, the data layer is a **separate hybrid
backend, not on Vercel**:

- **FastAPI data/analytics service** on a container host. It **validates the web
  app's logged-in user** (it does not run its own login) before serving research
  data.
- **Always-on ingestion** (IBKR / vendor feed + Celery + a broker) on a
  **persistent VM/container — never serverless**, because the feed must stay
  connected.
- **TimescaleDB** for time-series storage, via **Timescale Cloud or self-host** —
  **GCP Cloud SQL cannot run the Timescale extension**, so the time-series store is
  a dedicated service regardless of where the API runs.
- **Co-locate** the analytics service, ingestion workers, and TimescaleDB in **one
  cloud and region** to keep data-path latency and egress sane.

### Deferred — decide when the data phase starts, not now

- **Container host: Cloud Run vs Render vs Railway.** Open. Cloud Run favors
  scale-to-zero request services but ingestion needs always-on (a VM/managed
  container regardless of host). Render/Railway favor low ops. Pick alongside the
  TimescaleDB host so they co-locate. **Decision-to-make-later.**
- Exact ingestion topology (broker choice, worker scaling) and the analytics API
  contract — all later.

## Consequences — what the foundation must do now to avoid a dead-end

These are the only foundation-affecting requirements; they are cheap and already
consistent with ADR-0001..0005:

1. **Auth/session leaves room for a second consumer.** The Auth.js session is a
   signed JWT (ADR-0003). Keep auth/session logic in the server layer
   (`src/server/**`, ADR-0002) so we can later add a **token hand-off** the FastAPI
   service can verify (shared-secret/JWKS verification or a short-lived
   service-audience token minted by the web app). Do **not** assume the Next.js
   server is the session's only reader.
2. **Repo layout can grow.** ADR-0004 already records the monorepo/polyrepo trigger
   — the data service is exactly that trigger. Most likely a **separate repo**
   (different cloud, different language) referenced over HTTP; revisit then. No
   monorepo pre-work needed now.
3. **Env/secret strategy stays partitioned.** Foundation secrets live in Vercel.
   The future data service lives in another cloud with its **own** secrets — do not
   entangle them. The web app reaches the data service over an internal API with a
   dedicated credential, not by sharing Vercel-only env into a second platform.
4. **No Vercel-only assumptions in domain code.** Keep research/data calls behind a
   server-side client interface so "where the data service lives" is one config
   value, not a rewrite.

That is the whole ask of the foundation. Everything else about the data layer is
deferred to its own epic.

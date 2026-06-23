---
status: accepted
---

# 0001 — FINXO is a Next.js web app on Vercel, not an Electron desktop client

## Context

The older squad charter describes the FINXO client as a "React/Electron desktop
client." Scoping with HG settled on a **web app** instead: internal users sign in
with their company Google account and use FINXO in the browser. The foundation
epic (FIN-2) already encodes this ("Next.js / React, hosted on Vercel") and Vercel
preview deployments serve as staging.

## Decision

FINXO is a **Next.js (App Router) + TypeScript web application deployed on
Vercel**. We are **not** building an Electron desktop client.

- App Router (not Pages Router) — it is the current default and gives us React
  Server Components, server actions, and first-class `middleware.ts` route
  protection, which the auth slice relies on.
- Vercel is the deployment target; preview deployments are the staging
  environment, production is a Vercel production deployment.

## Consequences

- The squad charter's "React/Electron client" wording is now stale. **Recommended
  action: the Director updates the charter to read "Next.js web app (Vercel)"** so
  no future contributor builds against the wrong target. Flagged, not silently
  diverged (org Rule 7/11).
- No desktop packaging, auto-update, or native-shell concerns enter scope.
- Browser is the only client surface we design for in the foundation phase.
- Lock-in is moderate and accepted: App Router conventions and Vercel platform
  features (edge middleware, preview envs) are assumed throughout. Moving off
  Vercel later is possible (Next.js runs anywhere Node runs) but would cost the
  preview-as-staging workflow.

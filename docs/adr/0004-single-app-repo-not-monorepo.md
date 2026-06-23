---
status: accepted
---

# 0004 — Single Next.js app repo for the foundation; defer the monorepo

## Context

Greenfield, no repo yet. The foundation has exactly one deployable in one language
(the Next.js/TS app). A future Python data service is anticipated (ADR-0002) but
does not exist yet. We need to decide the repo shape FIN-2 will bootstrap.

## Decision

Bootstrap a **single Next.js application repository** (the app at the repo root —
not a `packages/` monorepo). One language, one deployable, simplest thing that
ships the foundation slice (org Rule 2). ADRs and shared docs live in `docs/`.

## Consequences

- FIN-2 bootstraps one repo with one `package.json`; no workspace tooling
  (Turborepo / pnpm workspaces) in the foundation.
- **Monorepo trigger to record now:** when the Python service (ADR-0002) or a
  second shared TS package appears, revisit. Likely outcome is a **polyrepo** (the
  Python service in its own repo, called over HTTP) unless we accumulate shared TS
  code worth a pnpm/Turborepo workspace. Defer the choice until there is a second
  thing to host — do not pre-build the monorepo.

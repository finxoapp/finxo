---
status: accepted
---

# 0005 — Tooling: pnpm, ESLint + Prettier, Vitest + Playwright, Conventional Commits

## Context

FIN-2 (repo bootstrap + CI) needs the package manager, lint/format, test runners,
and commit convention decided so it can execute without re-litigating them. These
are individually low-lock-in, but pinning them once keeps the squad consistent
(org Rule 11) and gives FIN-2 a concrete target. Recorded as one ADR for that
reason.

## Decision

- **Package manager: pnpm** (pinned via `packageManager` in `package.json`).
  Fast, strict node-linker, and the cleanest path if we ever adopt a workspace
  (ADR-0004). Vercel supports it natively.
- **Language: TypeScript, `strict: true`.**
- **Node: pinned LTS** via `.nvmrc` and `engines`, matching the Vercel runtime
  (Node 20 LTS; FIN-2 confirms the exact Vercel-supported version at bootstrap).
- **Lint: ESLint** with `next/core-web-vitals` + `@typescript-eslint`.
- **Format: Prettier** (formatting only; ESLint owns correctness rules).
- **Unit/component tests: Vitest** (+ React Testing Library).
- **End-to-end tests: Playwright** — the auth flow is inherently e2e, and FIN-8
  (QA sign-off) needs a browser-driven login test.
- **Commits: Conventional Commits**, enforced in CI (FIN-2 wires the check).

## Consequences

- FIN-2 scaffolds with `pnpm`, adds ESLint/Prettier/Vitest/Playwright configs, and
  a CI pipeline running lint + typecheck + unit + (headless) e2e.
- Choices are reversible if one proves wrong; this ADR records the default so the
  squad does not each pick differently. Any change should supersede this ADR
  rather than drift silently.

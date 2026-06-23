# FIN-4 — Repo bootstrap + CI (Next.js + TypeScript) (brief)

- **Issue:** FIN-4
- **Assignee:** Backend Developer
- **Type:** code

## Spec

Initialize the GitHub repository and scaffold the Next.js + TypeScript application
per the architecture ADR set (FIN-3), and wire up baseline CI.

- Create the repo and scaffold the **Next.js 15 App Router + TypeScript** app.
- Add ESLint + Prettier and enforce Conventional Commits.
- Add GitHub Actions CI that runs typecheck, lint, format-check, unit tests, and
  Playwright e2e on every pull request.
- Auth skeleton: Auth.js v5 (next-auth@5 beta) with Google OIDC, JWT session,
  domain restriction in the `signIn` callback, and `middleware.ts` route protection.
- README with local run instructions.

## Acceptance criteria

- [ ] `git clone` → `pnpm install` → `pnpm dev` runs locally with a placeholder home page.
- [ ] CI is green on the opening PR (typecheck + lint + unit + e2e).
- [ ] Domain restriction enforced via `AUTH_ALLOWED_DOMAIN` (not email allowlist).
- [ ] Repo registered with the workspace so other agents can `multica repo checkout` it.

## Constraints

- Depends on: FIN-3 (Stack & architecture ADR). Unblocks: FIN-5 (Vercel), FIN-8 (auth), FIN-9 (login UI).
- pnpm is the package manager (pinned via `packageManager` field).
- Node 20+ required (`.nvmrc` pinned).
- Auth.js v5 (beta) — keep `next-auth@5.0.0-beta.x` until stable is released.
- All credentials loaded from environment variables; nothing committed.

## Non-goals

- No real Google OAuth credentials in this PR (FIN-6 is the human task for credentials).
- No Vercel project setup (FIN-5).
- No production-ready login UI (FIN-9).
- No Python/FastAPI backend service (deferred per ADR-0002 seam).

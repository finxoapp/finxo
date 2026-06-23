# FIN-4 — Repo bootstrap + CI (Next.js + TypeScript) (outcome)

- **Issue:** FIN-4
- **PR:** https://github.com/finxoapp/finxo/pull/1
- **Status:** merged

## What shipped

Next.js 15 (App Router) + TypeScript scaffold at the repo root, per ADR-0001..0006.

**Key files:**
- `src/server/auth/domain.ts` — `isDomainAllowed()` enforces three gates: `email_verified`,
  email domain match, and Google Workspace `hd` claim match against `AUTH_ALLOWED_DOMAIN`.
- `src/server/auth/config.ts` — Auth.js v5 config; Google provider with `hd` UX hint;
  `signIn` callback delegates to `isDomainAllowed`; stateless JWT session.
- `middleware.ts` — protects all routes except `/login` and `/api/auth/*`.
- `src/app/page.tsx` + `src/app/login/page.tsx` — placeholder shell + public sign-in page.
- `.github/workflows/ci.yml` — typecheck + lint + format-check + unit + Playwright e2e on every PR.
- `tests/unit/domain.test.ts` — 12 unit tests covering all gate combinations.
- `tests/e2e/auth.spec.ts` — unauthenticated redirect + login page render.
- `docs/adr/0001..0006`, `.env.example`, `README.md`.

## Key decisions

- **Domain restriction, not email allowlist** — ADR-0003 specifies company Workspace domain
  restriction (`AUTH_ALLOWED_DOMAIN`). The initial implementation used an email allowlist
  (`AUTH_ALLOWED_EMAILS`); this was corrected per QA's spec-deviation finding.
- **`hd` claim required** — both the email domain and Google's `hd` (hosted-domain) OIDC
  claim must match `AUTH_ALLOWED_DOMAIN`. Personal Gmail accounts (no `hd`) are rejected
  by design; the internal tool targets Workspace accounts only.
- **pnpm as package manager** — pinned via `packageManager` in `package.json`.
- **Vitest for unit tests, Playwright for e2e** — per ADR-0005.

## Acceptance criteria — verification

- [x] `git clone` → `pnpm install` → `pnpm dev` runs locally — verified in dev environment.
- [x] CI green on PR — typecheck, lint, format-check, unit, e2e all pass.
- [x] Domain restriction via `AUTH_ALLOWED_DOMAIN` — implemented in `domain.ts`, 12 tests.
- [x] Repo registered with workspace — `finxoapp/finxo` checked out via `multica repo checkout`.

## Follow-ups

- FIN-6: HG must provision Google OAuth credentials (client ID + secret, `AUTH_SECRET`).
- FIN-5: Vercel project + preview deployments.
- FIN-8: Full auth backend implementation (this PR is the skeleton only).
- FIN-9: Production login UI.

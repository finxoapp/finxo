# FINXO

Personal financial analytics platform — Next.js / React on Vercel, Google SSO.

## Prerequisites

- Node 20+
- pnpm 9+

## Local development

```sh
cp .env.example .env.local
# Fill in AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_ALLOWED_DOMAIN
pnpm install
pnpm dev
```

The app runs at http://localhost:3000. Sign-in is restricted to Google Workspace
accounts whose email domain and `hd` claim match `AUTH_ALLOWED_DOMAIN`.

## Environment variables

| Variable | Description |
|---|---|
| `AUTH_SECRET` | Auth.js session signing secret. Generate with `openssl rand -base64 32`. |
| `AUTH_GOOGLE_ID` | Google OAuth client ID (from Google Cloud Console). |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret. |
| `AUTH_ALLOWED_DOMAIN` | Google Workspace domain allowed to sign in (e.g. `company.com`). Both email domain and `hd` claim must match. |
| `AUTH_URL` | Canonical app URL used by Auth.js for callback construction. Omit on Vercel previews. |

**Authorized redirect URIs** that must be registered in Google Cloud:
- Production: `https://<production-domain>/api/auth/callback/google`
- Stable main-branch preview: `https://finxo-git-main-<org>.vercel.app/api/auth/callback/google`
- Local dev: `http://localhost:3000/api/auth/callback/google`

## Deployment

Vercel is the deployment target. A push to `main` triggers a production build; every pull request gets a preview deployment automatically.

See [`docs/vercel-setup.md`](docs/vercel-setup.md) for the complete guide.

## Scripts

| Script | Description |
|---|---|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm lint` | ESLint |
| `pnpm format` | Prettier (write) |
| `pnpm typecheck` | TypeScript type check |
| `pnpm test` | Vitest unit tests |
| `pnpm test:e2e` | Playwright end-to-end tests |

## Architecture

See `docs/adr/` for architecture decision records.

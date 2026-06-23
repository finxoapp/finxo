---
status: accepted
---

# 0003 — Auth: Auth.js (NextAuth) + Google OIDC, JWT cookie session, domain restriction in the signIn callback

## Context

Authentication is Google SSO restricted to the company Google Workspace domain,
internal users only — no passwords, no self-serve signup, no other providers (per
the foundation epic). MFA is enforced by Google as the IdP. We need a library, a
session strategy, and a single authoritative place to enforce the domain
restriction and protect routes. Google Cloud OAuth credentials are provisioned by
HG out-of-band (FIN-4).

## Considered options

- **Auth.js (NextAuth) for Next.js App Router** — batteries-included Google
  provider, integrates with `middleware.ts`, well-trodden.
- **Hand-rolled OIDC** against Google — full control, but we would reimplement
  token validation, callback handling, and CSRF/state for no benefit at this scope.
- **Third-party IdP broker (Auth0/Clerk/etc.)** — extra vendor and cost to wrap a
  single Google domain; rejected as over-scoped for internal-only SSO.

## Decision

Use **Auth.js (NextAuth, App Router integration)** with the **Google provider
(OIDC)**.

- **Session strategy: stateless JWT** stored in an **httpOnly, Secure,
  SameSite=Lax cookie**. The foundation has no database, and we store zero
  passwords; a stateless JWT session needs no session store. (When a database
  arrives we may revisit database-backed sessions; JWT is the foundation choice,
  not a forever choice.)
- **Domain restriction is enforced server-side in the Auth.js `signIn`
  callback** — this is the single authoritative gate. Reject any login whose
  Google `hd` (hosted-domain) claim and verified email domain do not match the
  configured company Workspace domain, and require `email_verified`. The allowed
  domain is configuration (env var), not hardcoded.
- We also pass Google's `hd` parameter on the authorization request as a **UX
  hint** (pre-filters the account chooser). This is convenience only and is **not**
  trusted for security — the `signIn` callback is the enforcement point.
- **Route protection: `middleware.ts`** guards the app — every route except the
  public login page and the `/api/auth/**` endpoints requires a valid session;
  unauthenticated requests redirect to the login screen.

## Consequences

- Secrets needed (provisioned via Vercel env, see FIN-3 Vercel setup): Google
  OAuth client ID + secret, `AUTH_SECRET`, and the allowed-domain config value.
- The Backend Developer (FIN-6) implements the `signIn` domain check + middleware;
  the Frontend Developer (FIN-7) builds the login screen and authenticated shell
  against the Auth.js session.
- Authorized redirect URIs in Google Cloud (FIN-4) must include both the
  production callback URL and the Vercel preview pattern, or SSO breaks on
  previews — call this out to HG.
- Because sessions are stateless JWTs, server-side forced logout / revocation
  before expiry is not available in the foundation; acceptable for internal-only
  scope and noted for the future DB-session revisit.

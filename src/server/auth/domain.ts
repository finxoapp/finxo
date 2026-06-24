/**
 * Enforces the three-gate domain restriction specified in ADR-0003:
 *   1. email_verified must be true.
 *   2. Email domain must match AUTH_ALLOWED_DOMAIN.
 *   3. Google Workspace hd claim must match AUTH_ALLOWED_DOMAIN.
 *
 * Throws at call-time if AUTH_ALLOWED_DOMAIN is not set.
 */
export function isDomainAllowed(params: {
  email: string | null | undefined;
  emailVerified: boolean | null | undefined;
  hd: string | null | undefined;
}): boolean {
  const { email, emailVerified, hd } = params;

  if (emailVerified !== true) return false;
  if (!email) return false;

  const allowedDomain = process.env.AUTH_ALLOWED_DOMAIN;
  if (!allowedDomain) {
    throw new Error("AUTH_ALLOWED_DOMAIN environment variable is required");
  }

  const domain = allowedDomain.toLowerCase();
  const emailOk = email.trim().toLowerCase().endsWith(`@${domain}`);
  const hdOk = hd != null && hd.toLowerCase() === domain;

  return emailOk && hdOk;
}

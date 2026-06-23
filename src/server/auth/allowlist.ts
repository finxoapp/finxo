/**
 * Returns the set of allowed email addresses from environment config.
 * Throws at startup if the var is missing or resolves to an empty set —
 * fail loud rather than silently allowing or denying everyone.
 */
export function getAllowedEmails(): Set<string> {
  const raw = process.env.AUTH_ALLOWED_EMAILS;
  if (!raw) {
    throw new Error("AUTH_ALLOWED_EMAILS environment variable is required");
  }
  const emails = new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  );
  if (emails.size === 0) {
    throw new Error(
      "AUTH_ALLOWED_EMAILS must contain at least one email address"
    );
  }
  return emails;
}

/**
 * Returns true iff the Google account is on the explicit allow-list.
 *
 * Two checks are performed:
 *   1. email_verified must be true — rejects unverified Google accounts.
 *   2. The email must be an exact member of the AUTH_ALLOWED_EMAILS set
 *      (case-insensitive, trimmed).
 *
 * The hosted-domain (hd) claim is not checked — personal Gmail accounts
 * never send it, and allow-list membership is the sole restriction.
 */
export function isEmailAllowed(params: {
  email: string | null | undefined;
  emailVerified: boolean | null | undefined;
}): boolean {
  const { email, emailVerified } = params;

  if (emailVerified !== true) return false;
  if (!email) return false;

  return getAllowedEmails().has(email.trim().toLowerCase());
}

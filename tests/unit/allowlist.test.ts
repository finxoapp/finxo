import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { isEmailAllowed, getAllowedEmails } from "@/server/auth/allowlist";

const ALLOWED_EMAILS = "hendragunawan@gmail.com,finxoapp@gmail.com";

describe("getAllowedEmails", () => {
  afterEach(() => {
    delete process.env.AUTH_ALLOWED_EMAILS;
  });

  it("returns a Set of normalised email addresses", () => {
    process.env.AUTH_ALLOWED_EMAILS =
      "HendraGunawan@Gmail.Com, finxoapp@gmail.com";
    const result = getAllowedEmails();
    expect(result.has("hendragunawan@gmail.com")).toBe(true);
    expect(result.has("finxoapp@gmail.com")).toBe(true);
  });

  it("throws when AUTH_ALLOWED_EMAILS is not set", () => {
    delete process.env.AUTH_ALLOWED_EMAILS;
    expect(() => getAllowedEmails()).toThrow("AUTH_ALLOWED_EMAILS");
  });

  it("throws when AUTH_ALLOWED_EMAILS contains only empty entries", () => {
    process.env.AUTH_ALLOWED_EMAILS = " , , ";
    expect(() => getAllowedEmails()).toThrow();
  });
});

describe("isEmailAllowed", () => {
  beforeEach(() => {
    process.env.AUTH_ALLOWED_EMAILS = ALLOWED_EMAILS;
  });

  afterEach(() => {
    delete process.env.AUTH_ALLOWED_EMAILS;
  });

  it("allows hendragunawan@gmail.com (first listed address)", () => {
    expect(
      isEmailAllowed({ email: "hendragunawan@gmail.com", emailVerified: true })
    ).toBe(true);
  });

  it("allows finxoapp@gmail.com (second listed address)", () => {
    expect(
      isEmailAllowed({ email: "finxoapp@gmail.com", emailVerified: true })
    ).toBe(true);
  });

  it("rejects an unlisted email even when verified", () => {
    expect(
      isEmailAllowed({ email: "other@gmail.com", emailVerified: true })
    ).toBe(false);
  });

  it("rejects a listed email when email_verified is false", () => {
    expect(
      isEmailAllowed({ email: "hendragunawan@gmail.com", emailVerified: false })
    ).toBe(false);
  });

  it("rejects a listed email when email_verified is null", () => {
    expect(
      isEmailAllowed({ email: "hendragunawan@gmail.com", emailVerified: null })
    ).toBe(false);
  });

  it("allows a listed email with mixed case (case-insensitive normalisation)", () => {
    expect(
      isEmailAllowed({ email: "HendraGunawan@Gmail.COM", emailVerified: true })
    ).toBe(true);
  });

  it("allows a listed email with surrounding whitespace (trim normalisation)", () => {
    expect(
      isEmailAllowed({
        email: "  hendragunawan@gmail.com  ",
        emailVerified: true,
      })
    ).toBe(true);
  });

  it("allows a listed Gmail address with no hd claim (personal Gmail behaviour)", () => {
    // Personal Gmail tokens never include hd; allow-list check does not require it.
    expect(
      isEmailAllowed({ email: "hendragunawan@gmail.com", emailVerified: true })
    ).toBe(true);
  });

  it("rejects when email is null", () => {
    expect(isEmailAllowed({ email: null, emailVerified: true })).toBe(false);
  });

  it("rejects when email is undefined", () => {
    expect(
      isEmailAllowed({ email: undefined, emailVerified: true })
    ).toBe(false);
  });
});

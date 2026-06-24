import { describe, it, expect, afterEach } from "vitest";
import { isDomainAllowed } from "@/server/auth/domain";

const DOMAIN = "company.com";

describe("isDomainAllowed", () => {
  afterEach(() => {
    delete process.env.AUTH_ALLOWED_DOMAIN;
  });

  function setup() {
    process.env.AUTH_ALLOWED_DOMAIN = DOMAIN;
  }

  it("allows a verified account whose email and hd both match the domain", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: true,
        hd: "company.com",
      })
    ).toBe(true);
  });

  it("rejects when email domain does not match, even if hd matches", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@other.com",
        emailVerified: true,
        hd: "company.com",
      })
    ).toBe(false);
  });

  it("rejects when hd does not match the allowed domain, even if email domain matches", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: true,
        hd: "other.com",
      })
    ).toBe(false);
  });

  it("rejects when hd is null (personal Gmail — no Workspace claim)", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: true,
        hd: null,
      })
    ).toBe(false);
  });

  it("rejects when hd is undefined", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: true,
        hd: undefined,
      })
    ).toBe(false);
  });

  it("rejects when email_verified is false", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: false,
        hd: "company.com",
      })
    ).toBe(false);
  });

  it("rejects when email_verified is null", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: null,
        hd: "company.com",
      })
    ).toBe(false);
  });

  it("rejects when email is null", () => {
    setup();
    expect(
      isDomainAllowed({ email: null, emailVerified: true, hd: "company.com" })
    ).toBe(false);
  });

  it("rejects when email is undefined", () => {
    setup();
    expect(
      isDomainAllowed({
        email: undefined,
        emailVerified: true,
        hd: "company.com",
      })
    ).toBe(false);
  });

  it("is case-insensitive for email and hd", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "ALICE@COMPANY.COM",
        emailVerified: true,
        hd: "COMPANY.COM",
      })
    ).toBe(true);
  });

  it("trims leading/trailing whitespace on email", () => {
    setup();
    expect(
      isDomainAllowed({
        email: "  alice@company.com  ",
        emailVerified: true,
        hd: "company.com",
      })
    ).toBe(true);
  });

  it("throws when AUTH_ALLOWED_DOMAIN is not set", () => {
    delete process.env.AUTH_ALLOWED_DOMAIN;
    expect(() =>
      isDomainAllowed({
        email: "alice@company.com",
        emailVerified: true,
        hd: "company.com",
      })
    ).toThrow("AUTH_ALLOWED_DOMAIN");
  });
});

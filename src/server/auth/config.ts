import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { isDomainAllowed } from "./domain";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      // hd is a UX hint only — pre-filters the account chooser to the company domain.
      // Security enforcement is in the signIn callback, not here.
      authorization: {
        params: { hd: process.env.AUTH_ALLOWED_DOMAIN },
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // Domain-restriction gate — the single authoritative enforcement point (ADR-0003).
    signIn({ account, profile }) {
      if (account?.provider !== "google") return false;

      return isDomainAllowed({
        email: profile?.email,
        emailVerified: profile?.email_verified as boolean | undefined,
        hd: (profile as { hd?: string } | undefined)?.hd,
      });
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

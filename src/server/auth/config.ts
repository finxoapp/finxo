import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { isEmailAllowed } from "./allowlist";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    /**
     * Allow-list gate — the single authoritative enforcement point.
     * Only verified Google accounts whose email is in AUTH_ALLOWED_EMAILS pass.
     */
    signIn({ account, profile }) {
      if (account?.provider !== "google") return false;

      return isEmailAllowed({
        email: profile?.email,
        emailVerified: profile?.email_verified as boolean | undefined,
      });
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
};

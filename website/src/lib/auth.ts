import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { sendBrevoVerificationEmail } from "@/lib/brevo-email";
import { getPrisma } from "@/lib/prisma";

export async function sendAuthVerificationRequest({ identifier, url }: { identifier: string; url: string }) {
  if (process.env.AUTH_EMAIL_ENABLED !== "true") throw new Error("Authentication email is disabled.");
  await sendBrevoVerificationEmail({ from: process.env.AUTH_EMAIL_FROM ?? "", to: identifier, url });
}

export const authOptions: NextAuthOptions = {
  ...((process.env.DATABASE_URL || process.env.PRISMA_DATABASE_URL) ? { adapter: PrismaAdapter(getPrisma()) } : {}),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.AUTH_EMAIL_FROM,
      server: { host: "localhost", port: 25 },
      maxAge: 10 * 60,
      sendVerificationRequest: sendAuthVerificationRequest,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
  pages: { signIn: "/admin/sign-in" },
};

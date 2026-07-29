import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { getPrisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  ...(process.env.DATABASE_URL ? { adapter: PrismaAdapter(getPrisma()) } : {}),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      from: process.env.AUTH_EMAIL_FROM,
      server: process.env.RESEND_API_KEY,
      maxAge: 10 * 60,
      async sendVerificationRequest({ identifier, url }) {
        if (process.env.AUTH_EMAIL_ENABLED !== "true") throw new Error("Authentication email is disabled.");
        if (!process.env.RESEND_API_KEY || !process.env.AUTH_EMAIL_FROM) throw new Error("Authentication email is not configured.");
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);
        const result = await resend.emails.send({ from: process.env.AUTH_EMAIL_FROM, to: identifier, subject: "Your NexisHub sign-in link", html: `<p>Use this secure link to sign in to NexisHub administration:</p><p><a href="${url}">Sign in to NexisHub</a></p><p>This link expires in ten minutes.</p>` });
        if (result.error) throw new Error("Authentication email delivery failed.");
      },
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

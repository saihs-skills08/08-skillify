import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./appwrite";
import { toast } from "sonner";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      if (!account?.providerAccountId) return false;
      await db
        .createDocument("db", "users", account?.providerAccountId as string, {
          name: user.name,
          email: user.email,
          avatar: user.image,
        })
        .catch(async () => {
          await db
            .getDocument("db", "users", account?.providerAccountId as string)
            .catch(() => {
              return false;
            });
        });
      return true;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});

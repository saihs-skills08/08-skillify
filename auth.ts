import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./appwrite";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account }) {
      db.createDocument("db", "users", account?.providerAccountId as string, {
        name: user.name,
        email: user.email,
        avatar: user.image,
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

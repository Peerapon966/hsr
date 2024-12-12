import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/api/utils/prisma";
import { AuthOptions } from "next-auth";
import argon2 from "argon2";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      name: "Google",
      id: "google",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: "Credential",
      id: "credential",
      type: "credentials",
      credentials: {
        username: { label: "username/email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.username },
              { email: credentials.username },
            ],
          },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
          },
        });

        if (
          !user ||
          !(await argon2.verify(user.password as string, credentials.password))
        )
          throw new Error("Invalid username or password");

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name?.split(" ")[0];
      }

      if (account?.provider === "google" && profile) {
        token.name = profile.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user["id" as keyof typeof session.user] = token.id as string;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 2 * 60 * 60,
    updateAge: 1 * 60,
  },
  jwt: {
    maxAge: 2 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
};

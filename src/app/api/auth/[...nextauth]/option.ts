import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/api/utils/prisma";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    Google({
      name: "Google",
      clientId: "",
      clientSecret: "",
    }),
    Credentials({
      name: "Credential",
      id: "Credential",
      type: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("heyyyyyyyyyy");
        console.log(credentials);
        console.log(req);
        return { id: "" };
      },
    }),
  ],
};

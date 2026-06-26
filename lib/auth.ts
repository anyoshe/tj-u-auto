// import NextAuth from "next-auth";
// import type { NextAuthOptions } from "next-auth";
// import type { Adapter } from "next-auth/adapters";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "./prisma";
// import Credentials from "next-auth/providers/credentials";
// import { compare } from "bcrypt-ts";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma) as Adapter,
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         // ... inside authorize(credentials)
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email as string },
//         });

//         if (!user || !user.password) return null;

//         // 2. CHANGE THIS LINE: Remove "bcrypt." and just use "compare"
//         const isValid = await compare(
//           credentials.password as string,
//           user.password
//         );
//         // const user = await prisma.user.findUnique({
//         //   where: { email: credentials.email as string },
//         // });

//         if (!user || !user.password) return null;

//         // const isValid = await bcrypt.compare(
//         //   credentials.password as string,
//         //   user.password
//         // );

//         if (!isValid) return null;

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub as string;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/admin/login",
//   },
// };

// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Auth Fail: Missing fields");
          return null;
        }

        try {
          // 1. Fetch user from DB
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            console.log(`Auth Fail: No user found for ${credentials.email}`);
            return null;
          }

          // 2. Validate password using bcrypt-ts
          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            console.log("Auth Fail: Incorrect password");
            return null;
          }

          // 3. Return user mapping to session/jwt
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Database connection or query error during auth:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  debug: process.env.NODE_ENV === "development", // Forces clear logs in terminal
};

export default NextAuth(authOptions);
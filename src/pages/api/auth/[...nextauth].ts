import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
const bcryptjs = require("bcryptjs");

async function login(credentials: any) {
  try {
    console.log(credentials.email, credentials.password);
    connectDB();
    const user = await User.findOne({ email: credentials.email });
    if (!user) throw new Error("Wrong Credentials.");
    const isCorrect = await bcryptjs.compare(
      credentials.password,
      user.password
    );
    if (!isCorrect) throw new Error("Wrong Credentials.");
    return user;
  } catch (error) {
    console.log("Error on auth/login", error);
    throw error;
  }
}

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("Error : ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
        token.roles = user.roles;
      }
      console.log("This token : ", token);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.userId = token.id;
        session.user.roles = token.roles;
      }
      console.log("This session : ", session);
      return session;
    },
  },
};

export default NextAuth(authOptions);

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import NextAuth from "next-auth/next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
const bcryptjs = require("bcryptjs");
const CryptoJS = require("crypto-js");

//? Function Convert Six Digits
function convertToSixDigits(inputString) {
  const hashedValue = CryptoJS.SHA256(inputString).toString();
  return hashedValue.slice(-6);
}

//? Function Combine Six Digits
function combineEncryptedValues(value1, value2) {
  let combinedValue = value1 + value2;
  if (combinedValue.length > 6) {
    combinedValue = combinedValue.slice(0, 6);
  }
  while (combinedValue.length < 6) {
    combinedValue += Math.floor(Math.random() * 10);
  }
  return combinedValue;
}

//? Handle Login Credentials
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

//? Handle Login Google
async function loginGoogle(profile: any) {
  try {
    connectDB();
    const email = profile.email;
    let user = await User.findOne({ email });
    if (user) {
      user.username = profile.name;
      user.profileImage = profile.picture;
      await user.save();
    }
    if (!user) {
      //? Generate Unique Six Digits ID
      const timestamp = Date.now().toString();
      const encryptedTimestamp = convertToSixDigits(timestamp);
      const encryptedEmail = convertToSixDigits(email);

      const sixDigitsUserId = combineEncryptedValues(
        encryptedTimestamp,
        encryptedEmail
      );
      user = await User.create({
        email,
        username: profile.name,
        balance: 0,
        profileImage: profile.picture,
        roles: "USER",
        userid: sixDigitsUserId,
      });
    }
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
    signOut: "/",
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile: any) {
        try {
          const user = await loginGoogle(profile);
          return user;
        } catch (error) {
          console.log("Error : ", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      const { token, user } = params;
      if (params.trigger === "update" && params.session?.user) {
        token.username = params.session.user.username;
        token.email = params.session.user.email;
        token.profileImage = params.session.user.profileImage;
      }

      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.id = user.id;
        token.roles = user.roles;
        token.profileImage = user.profileImage;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.profileImage = token.profileImage;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);

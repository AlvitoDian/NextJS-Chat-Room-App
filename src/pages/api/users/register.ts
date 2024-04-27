import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
const bcryptjs = require("bcryptjs");
const gravatar = require("gravatar");
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const reqBody = req.body;
      const { username, email, password } = reqBody;

      //? Check Email or Username
      const user = await User.findOne({ $or: [{ email }, { username }] });

      if (user) {
        return res
          .status(500)
          .json({ message: "Username or Email already exists" });
      }

      //? Generate Unique Six Digits ID
      const timestamp = Date.now().toString();
      const encryptedTimestamp = convertToSixDigits(timestamp);
      const encryptedEmail = convertToSixDigits(email);

      const sixDigitsUserId = combineEncryptedValues(
        encryptedTimestamp,
        encryptedEmail
      );

      //? Generate Rand Avatar
      const avatar = gravatar.url(
        email,
        {
          s: "200",
          r: "pg",
          d: "retro",
        },
        true
      );

      //? Hashing Password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles: "USER",
        profileImage: avatar,
        userid: sixDigitsUserId,
      });

      //? Save User
      const savedUser = await newUser.save();

      return res.status(200).json({
        message: "User created successfully",
        success: true,
        savedUser,
      });
    } catch (error) {
      console.error("Error in signup", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

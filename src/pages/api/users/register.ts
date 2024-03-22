import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
const bcryptjs = require("bcryptjs");

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

      //? Hashing Password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles: "USER",
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

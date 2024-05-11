import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import Friendship from "@/models/Friendship";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { userReq, userAdd } = req.body;

      const addFriend = new Friendship({ user1: userReq, user2: userAdd });

      const savedFriend = await addFriend.save();

      return res.status(201).json({
        success: true,
      });
    } catch (error) {
      console.error("Error sending message", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

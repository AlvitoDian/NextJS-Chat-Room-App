import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import Friendship from "@/models/Friendship";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { id } = req.query;

      const userId = typeof id === "string" ? id : id.toString();

      const friends = await Friendship.find({
        $or: [{ user1: id }, { user2: id }],
      }).populate("user1 user2");

      return res.status(200).json({
        success: true,
        friends,
      });
    } catch (error) {
      console.error("Error getting messages", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

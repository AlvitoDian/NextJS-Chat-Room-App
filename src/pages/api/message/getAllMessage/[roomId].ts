import { NextApiRequest, NextApiResponse } from "next";
import Message from "@/models/Message";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { roomId } = req.query;

      const messages = await Message.find({
        room: roomId,
      }).populate("user");

      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error("Error getting messages", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

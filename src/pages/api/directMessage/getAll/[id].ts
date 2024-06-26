import { NextApiRequest, NextApiResponse } from "next";
import DirectMessage from "@/models/DirectMessage";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { id } = req.query;

      const messages = await DirectMessage.find({
        $or: [{ sender: id }, { receiver: id }],
      }).populate("sender receiver");

      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      console.error("Error getting direct messages", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

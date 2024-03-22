import { NextApiRequest, NextApiResponse } from "next";
import Room from "@/models/Room";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const reqBody = req.body;
      const { name } = reqBody;

      //? Save Room
      const room = new Room({ name });
      const savedRoom = await room.save();

      return res.status(200).json({
        message: "Chat Room created successfully",
        success: true,
        savedRoom,
      });
    } catch (error) {
      console.error("Error in signup", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

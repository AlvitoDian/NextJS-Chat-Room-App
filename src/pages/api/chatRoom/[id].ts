import { NextApiRequest, NextApiResponse } from "next";
import Room from "@/models/Room";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Room ID is required" });
      }

      const room = await Room.findById(id);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      return res.status(200).json({
        message: "Room fetched successfully",
        success: true,
        room,
      });
    } catch (error) {
      console.error("Error in fetching room", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

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

      const { id } = req.query;
      const { roomId } = req.body;

      const room = await Room.findById(roomId);

      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }

      if (room.participants.includes(id)) {
        return res
          .status(200)
          .json({ message: "User is already a participant" });
      }

      room.participants.push(id);
      await room.save();

      return res.status(200).json({
        message: "User added as participant",
        success: true,
      });
    } catch (error) {
      console.error("Error adding participant to room", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

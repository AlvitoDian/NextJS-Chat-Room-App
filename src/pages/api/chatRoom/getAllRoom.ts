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

      const rooms = await Room.find();

      return res.status(200).json({
        message: "Rooms fetched successfully",
        success: true,
        rooms,
      });
    } catch (error) {
      console.error("Error in fetching rooms", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

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

      const { id } = req.query; // Mengambil ID pengirim dari query

      const messages = await DirectMessage.find({
        $or: [
          { sender: id }, // Mencari pesan langsung dengan pengirim sesuai ID yang diberikan
          { receiver: id }, // Mencari pesan langsung dengan penerima sesuai ID yang diberikan
        ],
      }).populate("sender receiver");
      // Mengisi data pengirim dan penerima

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

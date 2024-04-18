import { NextApiRequest, NextApiResponse } from "next";
import DirectMessage from "@/models/DirectMessage";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { sender, receiver, content } = req.body;

      // Mencari atau membuat pesan langsung sesuai dengan id sender dan receiver
      let directMessage = await DirectMessage.findOne({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender }, // Menyesuaikan kueri untuk mencari pesan dengan sender dan receiver yang sesuai
        ],
      }).populate("sender receiver");

      // Jika pesan langsung belum ada, buat pesan langsung baru
      if (!directMessage) {
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
          return res.status(404).json({ error: "User not found" });
        }

        directMessage = new DirectMessage({
          sender: senderUser,
          receiver: receiverUser,
          messages: [{ content, createdAt: new Date(), role: "sender" }], // Atur peran pengirim
        });
      } else {
        // Periksa apakah pengguna saat ini adalah pengirim atau penerima
        /* const roleCurrent =
          directMessage.sender.toString() === sender ? "sender" : "receiver"; */
        const roleCurrent =
          directMessage.sender._id.toString() === sender
            ? "sender"
            : "receiver";

        // Tambahkan pesan baru ke dalam properti messages dengan peran yang sesuai
        directMessage.messages.push({
          content,
          createdAt: new Date(),
          role: roleCurrent,
        });
      }

      // Simpan pesan langsung
      const savedMessage = await directMessage.save();

      return res.status(200).json({
        message: "Message sent successfully",
        success: true,
        savedMessage,
      });
    } catch (error) {
      console.error("Error sending message", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

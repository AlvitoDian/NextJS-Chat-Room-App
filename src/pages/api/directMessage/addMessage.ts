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

      let directMessage = await DirectMessage.findOne({
        $or: [
          { sender: sender, receiver: receiver },
          { sender: receiver, receiver: sender },
        ],
      }).populate("sender receiver");

      if (!directMessage) {
        const senderUser = await User.findById(sender);
        const receiverUser = await User.findById(receiver);

        if (!senderUser || !receiverUser) {
          return res.status(404).json({ error: "User not found" });
        }

        directMessage = new DirectMessage({
          sender: senderUser,
          receiver: receiverUser,
          messages: [
            {
              content,
              createdAt: new Date(),
              role: "sender",
              status: {
                sender: "read",
                receiver: "unread",
              },
            },
          ],
        });
      } else {
        const roleCurrent =
          directMessage.sender._id.toString() === sender
            ? "sender"
            : "receiver";
        let messageStatus = {};
        if (roleCurrent === "sender") {
          messageStatus = { sender: "read", receiver: "unread" };
        } else {
          messageStatus = { sender: "unread", receiver: "read" };
        }

        directMessage.messages.push({
          content,
          createdAt: new Date(),
          role: roleCurrent,
          status: messageStatus,
        });
      }

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

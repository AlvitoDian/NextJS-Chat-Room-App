import { NextApiRequest, NextApiResponse } from "next";
import Message from "@/models/FriendShip";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { userReq, userAdd } = req.body;
      console.log(userReq, userAdd);

      /*    const message = new Message({ text, user: userId, room: roomId });

      const savedMessage = await message.save();

      const userFind = await User.findById(userId).select("-password -roles");

      savedMessage.user = userFind;

      return res.status(200).json({
        message: "Message sent successfully",
        success: true,
        savedMessage,
      }); */
    } catch (error) {
      console.error("Error sending message", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

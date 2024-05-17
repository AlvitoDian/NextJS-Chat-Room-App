import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await connectDB();

      const users = await User.find().sort({ createdAt: -1 });
      return res.status(200).json({
        message: "Users fetched successfully",
        success: true,
        users,
      });
    } catch (error) {
      console.error("Error in fetching users", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

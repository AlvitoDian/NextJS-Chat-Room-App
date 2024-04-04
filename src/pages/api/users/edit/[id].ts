import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { getSession } from "next-auth/react";

/* export const config = {
  api: {
    bodyParser: false,
  },
};
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectDB();

      console.log(req.body);

      /*     const request_data = await req.formData();
      console.log("formData", request_data); */

      const { id } = req.query;

      const { username, email } = req.body;

      if (!username || !email) {
        return res
          .status(400)
          .json({ error: "Username and email are required" });
      }

      const existingUser = await User.findById(id);

      if (!existingUser) {
        return res.status(400).json({ error: "User Not Found" });
      }

      existingUser.username = username || existingUser.username;
      existingUser.email = email || existingUser.email;

      const updatedUser = await existingUser.save();

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

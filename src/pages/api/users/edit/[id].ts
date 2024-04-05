import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectDB();

      const form = new IncomingForm();
      form.uploadDir = path.join(process.cwd(), "public/uploads");
      form.keepExtensions = true;

      const { id } = req.query;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(500).json({ error: "Error parsing form data" });
        }
        let user;

        //? If Profile Image Update
        const profileImage = files?.profileImage?.[0];

        if (profileImage) {
          const fileExtension = path.extname(profileImage.originalFilename);
          const newFilename = `${profileImage.newFilename}${fileExtension}`;

          const newPath = path.join(form.uploadDir, newFilename);

          fs.rename(profileImage.filepath, newPath, (error) => {
            if (error) {
              console.error("Error renaming file:", error);
              return res.status(500).json({ error: "Error renaming file" });
            }

            /* return res
              .status(200)
              .json({ message: "File uploaded successfully" }); */
          });
        }

        //? If Username and Email Update
        const { username, email } = fields;
        if (username || email) {
          const existingUser = await User.findById(id);

          if (!existingUser) {
            return res.status(400).json({ error: "User Not Found" });
          }

          existingUser.username = username.toString() || existingUser.username;
          existingUser.email = email.toString() || existingUser.email;

          const updatedUser = await existingUser.save();

          if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
          }

          user = updatedUser;

          return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
          });
        }

        console.log("Fields:", fields);
        console.log("Files:", files);
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

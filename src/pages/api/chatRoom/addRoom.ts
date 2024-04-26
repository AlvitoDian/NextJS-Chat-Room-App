import { NextApiRequest, NextApiResponse } from "next";
import Room from "@/models/Room";
import { connectDB } from "@/utils/connectDB";
import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import { uploadImage } from "@/utils/cloudinary/uploadHelper";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectDB();

      const form = new IncomingForm();
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form", err);
          return res.status(500).json({ error: "Error parsing form" });
        }

        const imagePath = files?.bannerImage?.[0];
        console.log(imagePath, "imagePath");
        const imageUrl = await uploadImage(imagePath.filepath, "bannerChat");

        console.log("Image uploaded to Cloudinary:", imageUrl);

        return res.status(200).json({ imageUrl });
      });
    } catch (error) {
      console.error("Error in signup", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

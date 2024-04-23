import { NextApiRequest, NextApiResponse } from "next";
import DirectMessage from "@/models/DirectMessage";
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
  if (req.method === "POST") {
    try {
      await connectDB();

      const form = new IncomingForm();
      form.uploadDir = path.join(process.cwd(), "public/uploads");
      form.keepExtensions = true;

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(500).json({ error: "Error parsing form data" });
        }

        const fileImage = files?.fileImage?.[0];
        const { sender, receiver, content } = fields;

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
          const contentString = content.toString();

          const messageContent = {
            content: contentString,
            contentType: "text",
            createdAt: new Date(),
            role: "sender",
            fileUrl: "",
          };

          if (fileImage) {
            const fileExtension = path.extname(fileImage.originalFilename);
            messageContent.contentType = "file";
            const newFilename = `${fileImage.newFilename}${fileExtension}`;

            const newPath = path.join(form.uploadDir, newFilename);

            fs.rename(fileImage.filepath, newPath, async (error) => {
              if (error) {
                console.error("Error renaming file:", error);
                return res.status(500).json({ error: "Error renaming file" });
              }

              let pathDB = newPath.split("\\");

              let lastPath = pathDB[pathDB.length - 1];
              let pathPublic = "/uploads/" + lastPath;

              messageContent.fileUrl = pathPublic;
              messageContent.contentType = "file";

              // Create directMessage with the messageContent
              const directMessage = new DirectMessage({
                sender: senderUser,
                receiver: receiverUser,
                messages: [messageContent],
              });

              // Save the directMessage
              try {
                const savedMessage = await directMessage.save();
                return res.status(200).json({
                  message: "Message sent successfully",
                  success: true,
                  savedMessage,
                });
              } catch (saveError) {
                console.error("Error saving message:", saveError);
                return res.status(500).json({ error: "Error saving message" });
              }
            });
          } else {
            const directMessage = new DirectMessage({
              sender: senderUser,
              receiver: receiverUser,
              messages: [messageContent],
            });

            try {
              const savedMessage = await directMessage.save();
              return res.status(200).json({
                message: "Message sent successfully",
                success: true,
                savedMessage,
              });
            } catch (saveError) {
              console.error("Error saving message:", saveError);
              return res.status(500).json({ error: "Error saving message" });
            }
          }
        } else {
          const roleCurrent =
            directMessage.sender._id.toString() === sender.toString()
              ? "sender"
              : "receiver";
          console.log(roleCurrent, "rolecurrent");
          let messageStatus = {};
          if (roleCurrent === "sender") {
            messageStatus = { sender: "read", receiver: "unread" };
          } else {
            messageStatus = { sender: "unread", receiver: "read" };
          }

          const contentString = content.toString();

          const messageContent = {
            content: contentString,
            createdAt: new Date(),
            role: roleCurrent,
            status: messageStatus,
            contentType: "text",
            fileUrl: "",
          };

          if (fileImage) {
            const fileExtension = path.extname(fileImage.originalFilename);
            messageContent.contentType = "file";
            const newFilename = `${fileImage.newFilename}${fileExtension}`;

            const newPath = path.join(form.uploadDir, newFilename);

            fs.rename(fileImage.filepath, newPath, async (error) => {
              if (error) {
                console.error("Error renaming file:", error);
                return res.status(500).json({ error: "Error renaming file" });
              }

              const pathPublic = `/uploads/${newFilename}`;

              messageContent.fileUrl = pathPublic;

              try {
                directMessage.messages.push(messageContent);
                const savedMessage = await directMessage.save();
                return res.status(200).json({
                  message: "Message sent successfully",
                  success: true,
                  savedMessage,
                });
              } catch (saveError) {
                console.error("Error saving message:", saveError);
                return res.status(500).json({ error: "Error saving message" });
              }
            });
          } else {
            directMessage.messages.push(messageContent);
            try {
              const savedMessage = await directMessage.save();
              return res.status(200).json({
                message: "Message sent successfully",
                success: true,
                savedMessage,
              });
            } catch (saveError) {
              console.error("Error saving message:", saveError);
              return res.status(500).json({ error: "Error saving message" });
            }
          }
        }
      });
    } catch (error) {
      console.error("Error sending message", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

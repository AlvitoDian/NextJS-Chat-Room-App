import { NextApiRequest, NextApiResponse } from "next";
import User from "@/models/User";
import { connectDB } from "@/utils/connectDB";
import { IncomingForm } from "formidable";
import { uploadImage } from "@/utils/cloudinary/uploadHelper";
import { deleteImage } from "@/utils/cloudinary/deleteHelper";

export const config = {
  api: {
    bodyParser: false,
  },
};

function getPublicIdFromUrl(imageUrl, folderName) {
  const urlSegments = imageUrl.split("/");
  const publicIdWithExtension = urlSegments[urlSegments.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return `${folderName}/${publicId}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectDB();

      const form = new IncomingForm();
      form.keepExtensions = true;

      const { id } = req.query;
      const existingUser = await User.findById(id);

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Error parsing form data:", err);
          return res.status(500).json({ error: "Error parsing form data" });
        }

        const profileImage = files?.profileImage?.[0];
        const bannerImage = files?.bannerImage?.[0];
        const { username, email } = fields;

        if (profileImage && bannerImage) {
          updateProfileAndBannerImages();
        } else if (profileImage) {
          updateProfileImage();
        } else if (bannerImage) {
          updateBannerImage();
        } else {
          updateUsernameOrEmail();
        }

        async function updateProfileAndBannerImages() {
          try {
            if (!existingUser) {
              return res.status(400).json({ error: "User Not Found" });
            }

            //? Profile Image Update
            if (existingUser.profileImage) {
              const isCloudinaryImage =
                existingUser.profileImage.includes("res.cloudinary.com");

              if (isCloudinaryImage) {
                const publicId = getPublicIdFromUrl(
                  existingUser.profileImage,
                  "userProfile"
                );

                await deleteImage(publicId);
              }
            }

            const profileImageUrl = await uploadImage(
              profileImage.filepath,
              "userProfile"
            );

            existingUser.profileImage = profileImageUrl;

            //? Banner Image Update
            if (existingUser.bannerImage) {
              const isCloudinaryImage =
                existingUser.bannerImage.includes("res.cloudinary.com");

              if (isCloudinaryImage) {
                const publicId = getPublicIdFromUrl(
                  existingUser.bannerImage,
                  "userProfile"
                );

                await deleteImage(publicId);
              }
            }

            const bannerImageUrl = await uploadImage(
              bannerImage.filepath,
              "userProfile"
            );

            existingUser.bannerImage = bannerImageUrl;

            await existingUser.save();

            updateUsernameOrEmail();
          } catch (updateError) {
            console.error("Error updating user images:", updateError);
            return res
              .status(500)
              .json({ error: "Error updating user images" });
          }
        }

        async function updateProfileImage() {
          try {
            if (!existingUser) {
              return res.status(400).json({ error: "User Not Found" });
            }

            //? Delete Old Image From Cloudinary
            if (existingUser.profileImage) {
              const isCloudinaryImage =
                existingUser.profileImage.includes("res.cloudinary.com");

              if (isCloudinaryImage) {
                const publicId = getPublicIdFromUrl(
                  existingUser.profileImage,
                  "userProfile"
                );

                await deleteImage(publicId);
              }
            }

            //? Upload or Update Image to Cloudinary
            const profileImageUrl = await uploadImage(
              profileImage.filepath,
              "userProfile"
            );

            //? Save
            existingUser.profileImage = profileImageUrl;
            await existingUser.save();

            updateUsernameOrEmail();
          } catch (updateError) {
            console.error("Error updating user profile image:", updateError);
            return res
              .status(500)
              .json({ error: "Error updating user profile image" });
          }
        }

        async function updateBannerImage() {
          try {
            if (!existingUser) {
              return res.status(400).json({ error: "User Not Found" });
            }

            //? Delete Old Image From Cloudinary
            if (existingUser.bannerImage) {
              const isCloudinaryImage =
                existingUser.bannerImage.includes("res.cloudinary.com");

              if (isCloudinaryImage) {
                const publicId = getPublicIdFromUrl(
                  existingUser.bannerImage,
                  "userProfile"
                );

                await deleteImage(publicId);
              }
            }

            //? Upload or Update Image to Cloudinary
            const bannerImageUrl = await uploadImage(
              bannerImage.filepath,
              "userProfile"
            );

            //? Save
            existingUser.bannerImage = bannerImageUrl;
            await existingUser.save();

            updateUsernameOrEmail();
          } catch (updateError) {
            console.error("Error updating user profile image:", updateError);
            return res
              .status(500)
              .json({ error: "Error updating user profile image" });
          }
        }

        async function updateUsernameOrEmail() {
          try {
            if (!existingUser) {
              return res.status(400).json({ error: "User Not Found" });
            }

            existingUser.username = username
              ? username.toString()
              : existingUser.username;
            existingUser.email = email ? email.toString() : existingUser.email;

            const updatedUser = await existingUser.save();

            if (!updatedUser) {
              return res.status(404).json({ error: "User not found" });
            }

            return res.status(200).json({
              message: "User updated successfully",
              user: updatedUser,
            });
          } catch (updateError) {
            console.error("Error updating user:", updateError);
            return res.status(500).json({ error: "Error updating user" });
          }
        }
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

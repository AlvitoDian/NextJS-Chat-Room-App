import { cloudinary } from "@/utils/cloudinary/config";

async function uploadImage(imagePath: string, folderName: string) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folderName,
      overwrite: true,
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

export { uploadImage };

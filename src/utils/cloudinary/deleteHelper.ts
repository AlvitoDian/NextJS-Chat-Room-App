import { cloudinary } from "@/utils/cloudinary/config";

async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("Image deleted successfully.");
    } else {
      console.error("Failed to delete image. Result:", result);
    }

    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
}

export { deleteImage };

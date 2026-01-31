import { env } from "@/env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret:
    env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog_app" },
        (error, result) => {
          if (error) return reject(error);
          resolve({ image: result?.secure_url as string, publicId: result?.public_id as string});
        },
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Cloudinary Upload Error");
  }
};

export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    throw error;
  }
};

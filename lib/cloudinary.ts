import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  created_at: string;
  format: string;
}

export async function fetchPhotos(maxResults = 100) {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "wedding_example",
      max_results: maxResults,
      resource_type: "image",
    });

    return (result.resources as CloudinaryResource[]).map((r) => ({
      public_id: r.public_id,
      url: r.secure_url,
      thumbnail: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_400,h_400,q_auto,f_auto/${r.public_id}.${r.format}`,
      width: r.width,
      height: r.height,
      created_at: r.created_at,
    }));
  } catch (error) {
    console.error("Failed to fetch photos from Cloudinary:", error);
    return [];
  }
}

export default cloudinary;

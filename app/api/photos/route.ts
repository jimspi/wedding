import { NextResponse } from "next/server";
import { fetchPhotos } from "@/lib/cloudinary";

export const revalidate = 30;

export async function GET() {
  const photos = await fetchPhotos();

  return NextResponse.json(photos, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}

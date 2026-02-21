"use client";

import { useCallback, useEffect, useState } from "react";
import PhotoGrid, { Photo } from "@/components/PhotoGrid";
import UploadButton from "@/components/UploadButton";

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPhotos = useCallback(async () => {
    try {
      const res = await fetch("/api/photos");
      if (res.ok) {
        const data = await res.json();
        setPhotos(data);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium text-primary">
            Gallery
          </h1>
          {!loading && photos.length > 0 && (
            <p className="text-secondary text-sm mt-1">
              {photos.length} photo{photos.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <UploadButton onUploadSuccess={loadPhotos} className="btn-secondary" />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-6 h-6 border-2 border-highlight border-t-accent rounded-full animate-spin" />
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}

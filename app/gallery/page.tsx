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
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-mid">
            All Photos
          </span>
          <h1 className="font-display text-4xl font-bold uppercase tracking-tight mt-1">
            Gallery
          </h1>
          {!loading && photos.length > 0 && (
            <p className="font-mono text-xs text-mid mt-2">
              {photos.length} photo{photos.length !== 1 ? "s" : ""} shared
            </p>
          )}
        </div>
        <UploadButton onUploadSuccess={loadPhotos} className="btn-outline text-xs" />
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-5 h-5 border-2 border-rule border-t-ink rounded-full animate-spin" />
        </div>
      ) : (
        <PhotoGrid photos={photos} />
      )}
    </div>
  );
}

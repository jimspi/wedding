"use client";

import { useCallback, useEffect, useState } from "react";
import UploadButton from "@/components/UploadButton";
import PhotoGrid, { Photo } from "@/components/PhotoGrid";
import Link from "next/link";

export default function HomePage() {
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
      // Silently fail — gallery still works
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const recentPhotos = photos.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Hero */}
      <section className="py-24 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-primary mb-4">
          Logan & Rachel
        </h1>
        <div className="w-12 h-px bg-blue-accent mx-auto mb-6" />
        <p className="text-secondary text-lg max-w-md mx-auto mb-10">
          Share your favorite moments from our special day.
        </p>
        <UploadButton onUploadSuccess={loadPhotos} />
      </section>

      {/* Recent Photos */}
      {!loading && recentPhotos.length > 0 && (
        <section className="pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-medium text-primary">
              Recent Photos
            </h2>
            {photos.length > 6 && (
              <Link href="/gallery" className="btn-secondary text-sm">
                View All
              </Link>
            )}
          </div>
          <PhotoGrid photos={recentPhotos} />
        </section>
      )}

      {!loading && photos.length === 0 && (
        <section className="pb-16 text-center">
          <p className="text-blue-accent">
            Photos shared by guests will appear here.
          </p>
        </section>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "./Lightbox";

export interface Photo {
  public_id: string;
  url: string;
  thumbnail: string;
  width: number;
  height: number;
  created_at: string;
}

interface PhotoGridProps {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: PhotoGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (photos.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-rule">
        <p className="font-display text-lg uppercase tracking-wide text-mid">
          No photos yet
        </p>
        <p className="font-mono text-xs text-mid/60 mt-2">
          Be the first to share a moment
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1">
        {photos.map((photo, index) => (
          <button
            key={photo.public_id}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-square overflow-hidden bg-ink/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-pop focus:ring-offset-2"
          >
            <Image
              src={photo.thumbnail}
              alt="Wedding photo"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </>
  );
}

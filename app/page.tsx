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
      // Silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const recentPhotos = photos.slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink text-paper">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className="flex items-start gap-6">
            <div className="hidden sm:block w-1 bg-pop self-stretch" />
            <div>
              <h1 className="font-display text-5xl sm:text-7xl font-bold uppercase leading-[0.9] tracking-tight animate-fade-up">
                Logan
                <br />
                <span className="text-pop">&</span> Rachel
              </h1>
              <p className="font-body text-paper/60 text-lg mt-6 max-w-md animate-fade-up-delay">
                Share your favorite moments from our special day.
              </p>
              <div className="mt-10 animate-fade-up-delay-2">
                <UploadButton
                  onUploadSuccess={loadPhotos}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-pop text-ink font-display font-medium tracking-wide text-sm uppercase transition-all duration-200 hover:bg-paper hover:text-ink active:scale-[0.97]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Photos */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {!loading && recentPhotos.length > 0 && (
          <>
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-mid">
                  Recent
                </span>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight mt-1">
                  Photos
                </h2>
              </div>
              {photos.length > 8 && (
                <Link href="/gallery" className="btn-outline text-xs">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              )}
            </div>
            <PhotoGrid photos={recentPhotos} />
          </>
        )}

        {!loading && photos.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-rule">
            <p className="font-display text-lg uppercase tracking-wide text-mid">
              No photos yet
            </p>
            <p className="font-mono text-xs text-mid/60 mt-2">
              Photos shared by guests will appear here
            </p>
          </div>
        )}
      </section>
    </>
  );
}

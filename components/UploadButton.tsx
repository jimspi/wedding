"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface UploadButtonProps {
  onUploadSuccess?: () => void;
  className?: string;
}

export default function UploadButton({
  onUploadSuccess,
  className,
}: UploadButtonProps) {
  const widgetRef = useRef<any>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const existing = document.querySelector(
      'script[src="https://widget.cloudinary.com/v2.0/global/all.js"]'
    );
    if (existing) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);
  }, []);

  const openWidget = useCallback(() => {
    if (!window.cloudinary) return;

    if (!widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
          multiple: true,
          maxFiles: 10,
          folder: "wedding_example",
          sources: ["local", "camera"],
          styles: {
            palette: {
              window: "#0A0A0A",
              windowBorder: "#0A0A0A",
              tabIcon: "#FAFAFA",
              menuIcons: "#FAFAFA",
              textDark: "#FAFAFA",
              textLight: "#0A0A0A",
              link: "#D4FF00",
              action: "#D4FF00",
              inactiveTabIcon: "#737373",
              error: "#EF4444",
              inProgress: "#D4FF00",
              complete: "#D4FF00",
              sourceBg: "#141414",
            },
            fonts: {
              default: null,
              "'Space Grotesk', sans-serif": {
                url: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap",
                active: true,
              },
            },
          },
        },
        (error: any, result: any) => {
          if (!error && result.event === "success") {
            onUploadSuccess?.();
          }
        }
      );
    }

    widgetRef.current.open();
  }, [onUploadSuccess]);

  return (
    <button onClick={openWidget} className={className || "btn-primary"}>
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
      Upload Photos
    </button>
  );
}

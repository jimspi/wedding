"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `font-display text-xs uppercase tracking-[0.2em] transition-colors duration-200 ${
      pathname === href
        ? "text-ink"
        : "text-mid hover:text-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-ink flex items-center justify-center">
            <span className="text-paper font-display font-bold text-xs">TM</span>
          </div>
          <span className="font-display font-semibold text-sm uppercase tracking-[0.15em] text-ink">
            The Moment
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/gallery" className={linkClass("/gallery")}>
            Gallery
          </Link>
          <Link href="/qr" className={linkClass("/qr")}>
            QR Code
          </Link>
        </nav>
      </div>
      <div className="h-px bg-ink" />
    </header>
  );
}

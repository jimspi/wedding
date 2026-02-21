"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm tracking-wide transition-colors duration-200 ${
      pathname === href
        ? "text-primary font-medium"
        : "text-secondary hover:text-primary"
    }`;

  return (
    <header className="border-b border-highlight bg-surface/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl font-semibold text-primary">
          Logan & Rachel
        </Link>

        <nav className="flex items-center gap-8">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/gallery" className={linkClass("/gallery")}>
            Gallery
          </Link>
        </nav>
      </div>
    </header>
  );
}

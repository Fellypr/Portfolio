"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { SlideTabs } from "@/components/ui/slide-tabs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blogs", href: "#blogs" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${poppins.className} fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-5 text-[#f0f2fa] transition-all duration-300 sm:px-10 lg:px-42.5 ${
        hasScrolled
          ? "border-b border-white/10 bg-[#08110c]/55 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2 font-bold leading-none"
        aria-label="DevPro home"
        data-node-id="3:4"
        data-name="Logo"
      >
        <span className="text-xl text-[#2ed959]" aria-hidden="true">
          {"</>"}
        </span>
        <span className="text-[19px] text-white">DevPro</span>
      </Link>

      <nav aria-label="Primary navigation">
        <SlideTabs items={navigationItems} />
      </nav>
    </header>
  );
}

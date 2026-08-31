"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { SlideTabs } from "@/components/ui/slide-tabs";

type NavigationItem = {
  label: string;
  href: string;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const sectionLabels: Record<string, string> = {
  about: "About",
  stacks: "Stacks",
  projects: "Projects",
  contact: "Contact",
};

function getSectionLabel(id: string) {
  return (
    sectionLabels[id] ??
    id
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}

function getNavigationItems(): NavigationItem[] {
  const sectionIds = new Set<string>();

  return Array.from(document.querySelectorAll<HTMLElement>("main section[id]"))
    .filter((section) => {
      if (!section.id || sectionIds.has(section.id)) {
        return false;
      }

      sectionIds.add(section.id);
      return true;
    })
    .map((section) => ({
      label: getSectionLabel(section.id),
      href: `#${section.id}`,
    }));
}

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [activeHref, setActiveHref] = useState("");
  const clickedTargetRef = useRef<string | null>(null);
  const clickedTargetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncNavigationItems = () => {
      const items = getNavigationItems();

      setNavigationItems(items);
      setActiveHref((currentHref) => {
        if (items.some((item) => item.href === currentHref)) {
          return currentHref;
        }

        return items[0]?.href ?? "";
      });

      return items;
    };

    let items = syncNavigationItems();

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const clickedTarget = clickedTargetRef.current;

        if (clickedTarget) {
          const targetSection = document.getElementById(clickedTarget.slice(1));

          if (targetSection) {
            const targetBounds = targetSection.getBoundingClientRect();
            const activationLine = window.innerHeight * 0.35;

            if (
              targetBounds.top <= activationLine &&
              targetBounds.bottom >= activationLine
            ) {
              clickedTargetRef.current = null;
              setActiveHref(clickedTarget);
            }
          } else {
            clickedTargetRef.current = null;
          }

          return;
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (current, next) =>
              current.boundingClientRect.top - next.boundingClientRect.top,
          );

        if (visibleSections[0]?.target instanceof HTMLElement) {
          setActiveHref(`#${visibleSections[0].target.id}`);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    const observeSections = () => {
      sectionObserver.disconnect();
      items = syncNavigationItems();

      items.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));

        if (section) {
          sectionObserver.observe(section);
        }
      });
    };

    observeSections();

    const pageObserver = new MutationObserver(observeSections);
    const main = document.querySelector("main");

    if (main) {
      pageObserver.observe(main, {
        childList: true,
      });
    }

    return () => {
      sectionObserver.disconnect();
      pageObserver.disconnect();

      if (clickedTargetTimeoutRef.current) {
        window.clearTimeout(clickedTargetTimeoutRef.current);
      }
    };
  }, []);

  const handleActiveHrefChange = (href: string) => {
    clickedTargetRef.current = href;
    setActiveHref(href);

    if (clickedTargetTimeoutRef.current) {
      window.clearTimeout(clickedTargetTimeoutRef.current);
    }

    clickedTargetTimeoutRef.current = window.setTimeout(() => {
      clickedTargetRef.current = null;
    }, 1400);
  };

  return (
    <header
      className={`${poppins.className} fixed left-0 top-0 z-50 flex min-h-[78px] w-full items-center px-6 py-5 text-[#f0f2fa] transition-all duration-300 sm:px-10 lg:px-42.5 ${
        hasScrolled
          ? "border-b border-white/10 bg-[#08110c]/55 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className={`flex shrink-0 items-center gap-2 font-bold leading-none transition-all duration-500 ease-out ${
          hasScrolled
            ? "pointer-events-none -translate-x-4 scale-95 opacity-0"
            : "translate-x-0 scale-100 opacity-100"
        }`}
        aria-label="DevPro home"
        data-node-id="3:4"
        data-name="Logo"
      >
        <span className="text-xl text-[#2ed959]" aria-hidden="true">
          {"</>"}
        </span>
        <span className="text-[19px] text-white">DevPro</span>
      </Link>

      <nav
        aria-label="Primary navigation"
        className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
          hasScrolled
            ? "left-1/2 -translate-x-1/2"
            : "right-6 translate-x-0 sm:right-10 lg:right-[10.625rem]"
        }`}
      >
        <SlideTabs
          activeHref={activeHref}
          items={navigationItems}
          onActiveHrefChange={handleActiveHrefChange}
        />
      </nav>
    </header>
  );
}

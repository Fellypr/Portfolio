"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
};

type CursorPosition = {
  left: number;
  width: number;
  opacity: number;
};

type SlideTabsProps = {
  activeHref?: string;
  items: NavItem[];
  onActiveHrefChange?: (href: string) => void;
};

export function SlideTabs({
  activeHref,
  items,
  onActiveHrefChange,
}: SlideTabsProps) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);
  const selected = Math.max(
    0,
    items.findIndex((item) => item.href === activeHref),
  );

  const updateCursor = (index: number) => {
    const selectedTab = tabsRef.current[index];

    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();

      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    updateCursor(selected);
  }, [selected, items]);

  useEffect(() => {
    const handleResize = () => updateCursor(selected);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selected]);

  const moveToSelectedTab = () => {
    updateCursor(selected);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <ul
      onMouseLeave={moveToSelectedTab}
      className="relative hidden w-fit items-center rounded-full border border-[#19b630] bg-[#060b1441] p-1 text-sm leading-none backdrop-blur sm:flex"
    >
      {items.map((item, index) => (
        <Tab
          key={item.href}
          ref={(element) => {
            tabsRef.current[index] = element;
          }}
          href={item.href}
          isSelected={selected === index}
          setPosition={setPosition}
          onClick={() => onActiveHrefChange?.(item.href)}
        >
          {item.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}

type TabProps = {
  children: React.ReactNode;
  href: string;
  isSelected: boolean;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick: () => void;
};

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, href, isSelected, setPosition, onClick }, ref) => {
    const updatePosition = () => {
      if (!ref || typeof ref === "function" || !ref.current) {
        return;
      }

      const { width } = ref.current.getBoundingClientRect();

      setPosition({
        left: ref.current.offsetLeft,
        width,
        opacity: 1,
      });
    };

    return (
      <li ref={ref} onMouseEnter={updatePosition} className="relative z-10">
        <Link
          href={href}
          aria-current={isSelected ? "page" : undefined}
          onClick={onClick}
          className="block px-3 py-1.5 text-xs font-medium uppercase text-white mix-blend-difference transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ed959] md:px-5 md:py-2 md:text-sm"
        >
          {children}
        </Link>
      </li>
    );
  },
);

Tab.displayName = "Tab";

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full border-[#622abd] border-2 bg-[#17181a96] md:h-8"
    />
  );
}

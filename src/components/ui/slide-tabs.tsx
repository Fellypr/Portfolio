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
  items: NavItem[];
};

export function SlideTabs({ items }: SlideTabsProps) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [selected, setSelected] = useState(0);
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const selectedTab = tabsRef.current[selected];

    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();

      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected]);

  const moveToSelectedTab = () => {
    const selectedTab = tabsRef.current[selected];

    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();

      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  };

  return (
    <ul
      onMouseLeave={moveToSelectedTab}
      className="relative hidden w-fit items-center rounded-full border border-white/60 bg-[#060b1441] p-1 text-sm leading-none backdrop-blur sm:flex"
    >
      {items.map((item, index) => (
        <Tab
          key={item.href}
          ref={(element) => {
            tabsRef.current[index] = element;
          }}
          href={item.href}
          setPosition={setPosition}
          onClick={() => setSelected(index)}
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
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick: () => void;
};

const Tab = React.forwardRef<HTMLLIElement, TabProps>(
  ({ children, href, setPosition, onClick }, ref) => {
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
      className="absolute z-0 h-7 rounded-full border-white/50 border bg-[#2a2f3896] md:h-8"
    />
  );
}

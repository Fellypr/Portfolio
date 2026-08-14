import Link from "next/link";
import { Poppins } from "next/font/google";

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
  return (
    <header
      className={`${poppins.className} flex w-full items-center justify-between px-6 py-5 text-[#f0f2fa] sm:px-10 lg:px-42.5 bg-transparent absolute z-20`}
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
        <ul className="hidden items-center gap-[42px] text-sm leading-none sm:flex">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-[#2ed959] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ed959]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: "/imagems/Footer/icon-github.svg",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: "/imagems/Footer/icon-linkedin.svg",
  },
  {
    label: "Email",
    href: "mailto:contato@example.com",
    icon: "/imagems/Footer/icon-email.svg",
  },
];

export function Footer() {
  return (
    <footer
      className={`${poppins.className} border-t border-[rgba(31,77,97,0.72)] bg-[rgba(2,6,12,0.94)] px-5 pt-10 pb-7 text-[#f2f7fc] sm:px-10 lg:px-[72px] lg:pt-11`}
      data-node-id="62:2"
      data-name="Footer / Portfolio"
    >
      <div
        className="mx-auto flex w-full max-w-[1296px] flex-col gap-8 overflow-hidden lg:h-[112px] lg:flex-row lg:items-center lg:justify-between lg:gap-6"
        data-node-id="62:3"
        data-name="Footer / Main Row"
      >
        <div
          className="flex max-w-[390px] flex-col items-start gap-2.5 overflow-hidden"
          data-node-id="62:6"
          data-name="Footer / Brand"
        >
          <Link
            href="/"
            className="flex h-[30px] items-start gap-2.5 overflow-hidden font-semibold leading-normal"
            aria-label="DevPro home"
            data-node-id="62:7"
            data-name="Footer / Logo"
          >
            <span
              className={`${robotoMono.className} text-[22px] leading-none text-[#40f26e]`}
              aria-hidden="true"
            >
              {"</>"}
            </span>
            <span className="text-[20px] leading-none text-[#f2f7fc]">
              DevPro
            </span>
          </Link>

          <p className="text-[13px] leading-normal font-normal text-[#94a3b8]">
            Código limpo, produtos úteis e experiências digitais bem construídas.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="overflow-hidden text-[14px] leading-normal font-normal text-[#f2f7fc]"
          data-node-id="62:11"
          data-name="Footer / Navigation"
        >
          <ul className="flex flex-wrap items-center gap-x-[34px] gap-y-3">
            {navigationItems.map((item) => (
              <li key={item.href} className="w-[86px]">
                <Link
                  href={item.href}
                  className="transition-colors duration-200 hover:text-[#40f26e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#40f26e]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="flex items-center gap-3 overflow-hidden"
          data-node-id="63:2"
          data-name="Footer / Social Links"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={social.label}
              className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[22px] border border-[rgba(41,87,115,0.85)] bg-[rgba(6,15,26,0.78)] transition-colors duration-200 hover:border-[#40f26e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#40f26e]"
            >
              <Image
                src={social.icon}
                alt=""
                width={20}
                height={20}
                className="size-5"
                aria-hidden="true"
              />
            </a>
          ))}
        </div>
      </div>

      <div
        className="mx-auto mt-5 h-px w-full max-w-[1296px] bg-gradient-to-r from-[rgba(31,71,102,0)] via-[rgba(51,235,122,0.75)] to-[rgba(31,71,102,0)] lg:mt-0"
        data-node-id="62:4"
        data-name="Footer / Divider"
      />

      <div
        className="mx-auto flex w-full max-w-[1296px] flex-col gap-4 overflow-hidden pt-6 text-[12px] leading-normal sm:flex-row sm:items-center sm:justify-between"
        data-node-id="62:5"
        data-name="Footer / Bottom Row"
      >
        <p className="font-normal text-[#7a8aa1]">
          © 2026 DevPro. Todos os direitos reservados.
        </p>
        <p
          className={`${robotoMono.className} text-[#40f26e] sm:text-right`}
          data-node-id="63:16"
        >
          ● Disponível para novos projetos
        </p>
      </div>
    </footer>
  );
}

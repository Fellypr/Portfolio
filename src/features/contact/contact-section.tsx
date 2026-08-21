"use client";

import * as React from "react";
import { Poppins, Roboto_Mono } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const email = "contato@example.com";
const linkedInUrl = "https://www.linkedin.com/";
const githubUrl = "https://github.com/";

const channels = [
  {
    title: "Email",
    description: "Envie um email para conversarmos sobre seu projeto.",
    icon: "@",
    iconClass: "border-[#294f61] bg-[rgba(5,18,26,0.78)] text-[#5ce070]",
    buttonClass: "border-[#294f6b] text-[#5ce070] hover:bg-[rgba(92,224,112,0.08)]",
    action: "Copiar email",
    href: `mailto:${email}`,
  },
  {
    title: "LinkedIn",
    description: "Conecte-se comigo e acompanhe minha jornada profissional.",
    icon: "in",
    iconClass: "border-[#295c99] bg-[rgba(5,18,36,0.78)] text-[#4da3ff]",
    buttonClass: "border-[#265999] text-[#4da3ff] hover:bg-[rgba(77,163,255,0.08)]",
    action: "Abrir perfil ↗",
    href: linkedInUrl,
  },
  {
    title: "GitHub",
    description: "Confira meus repositórios e projetos de código aberto.",
    icon: "GH",
    iconClass: "border-[#57338c] bg-[rgba(15,9,33,0.78)] text-[#ad6bff]",
    buttonClass: "border-[#57338c] text-[#ad6bff] hover:bg-[rgba(173,107,255,0.08)]",
    action: "Abrir perfil ↗",
    href: githubUrl,
  },
];

export function ContactSection() {
  const [copied, setCopied] = React.useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <section
      id="contact"
      className={`${poppins.className} relative overflow-hidden bg-[#030911] bg-[url('/imagems/About/fundo.png')] bg-cover bg-center text-white`}
      data-node-id="45:2"
      data-name="Contact / Section"
    >
      <div className="mx-auto grid min-h-[540px] w-full max-w-[1440px] grid-cols-1 gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[620px_650px] lg:gap-[45px] lg:px-[42px] lg:py-[48px]">
        <div
          className="flex flex-col items-start overflow-hidden"
          data-node-id="45:3"
          data-name="Contact / Intro"
        >
          <div
            className="flex items-center gap-2.5 overflow-hidden rounded-[6px] border border-[rgba(46,77,107,0.85)] bg-[rgba(3,8,15,0.7)] px-4 py-2.5"
            data-node-id="45:6"
            data-name="Contact / Badge"
          >
            <span className="size-2.5 shrink-0 rounded-full bg-[#5ce070]" />
            <p className="text-[14px] leading-none font-semibold tracking-[1.12px] whitespace-nowrap text-[#5ce070]">
              03 // CONTATO
            </p>
          </div>

          <h2 className="mt-[43px] text-[42px] leading-tight font-bold tracking-[-1px] text-[#f7faff] sm:text-[50px] lg:text-[58px]">
            Entre em contato
          </h2>

          <p className="mt-2 max-w-[440px] text-[17px] leading-[1.5] font-normal text-[#bfc9db]">
            Vamos conversar sobre projetos, oportunidades ou apenas{" "}
            <span className="text-[#5ce070]">trocar ideias</span>.
          </p>


          <div
            className="mt-[28px] h-[280px] w-full max-w-[620px] overflow-hidden rounded-[10px] border border-[rgba(41,64,92,0.8)] bg-[rgba(1,5,10,0.86)] lg:mt-[27px]"
            data-node-id="45:21"
            data-name="Contact / Terminal"
          >
            <div className="h-[42px] bg-[rgba(10,19,33,0.95)]" />
            <div
              className={`${robotoMono.className} px-4 pt-3 text-[11px] leading-[1.75] whitespace-pre-wrap text-[#b2c4db] sm:px-[21px] sm:text-[13px]`}
              data-node-id="45:23"
            >
              <p className="text-[#57e575]">portfolio:~$ contact</p>
              <br />
              <p>{`→  Email:      ${email}`}</p>
              <p>→  LinkedIn:   linkedin.com/in/seu-perfil</p>
              <p>→  GitHub:     github.com/seu-usuario</p>
              <p>→  Fuso:       UTC-3 (BRT)</p>
              <p>→  Status:     Disponível para novos projetos</p>
              <br />
              <p>portfolio:~$ █</p>
            </div>
          </div>
        </div>

        <div
          className="flex w-full flex-col gap-[18px] overflow-hidden lg:pt-[75px]"
          data-node-id="45:4"
          data-name="Contact / Channels"
        >
          {channels.map((channel) => {
            const isEmail = channel.title === "Email";

            return (
              <div
                key={channel.title}
                className="flex min-h-[135px] w-140 flex-col gap-5 overflow-hidden rounded-[10px] border border-[rgba(38,61,92,0.8)] bg-[rgba(3,8,17,0.66)] px-5 py-5 sm:flex-row sm:items-center sm:gap-[22px] sm:px-6 sm:py-[22px]"
                data-name={`Contact Card / ${channel.title}`}
              >
                <div
                  className={`flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border text-[26px] leading-none font-semibold ${channel.iconClass}`}
                >
                  {channel.icon}
                </div>

                <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5 overflow-hidden">
                  <h3 className="text-[21px] leading-normal font-semibold text-[#f7faff]">
                    {channel.title}
                  </h3>
                  <p className="max-w-[330px] text-[14px] leading-[1.45] font-normal text-[#adbacf]">
                    {channel.description}
                  </p>
                </div>

                {isEmail ? (
                  <button
                    type="button"
                    onClick={copyEmail}
                    className={`shrink-0 rounded-[7px] border px-4 py-[11px] text-[14px] leading-none font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5ce070] ${channel.buttonClass}`}
                  >
                    {copied ? "Email copiado" : channel.action}
                  </button>
                ) : (
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`shrink-0 rounded-[7px] border px-4 py-[11px] text-[14px] leading-none font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4da3ff] ${channel.buttonClass}`}
                  >
                    {channel.action}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

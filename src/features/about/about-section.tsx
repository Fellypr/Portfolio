import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "in" },
  { label: "Email", href: "mailto:contato@example.com", icon: "@" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className={`${poppins.className} relative overflow-hidden bg-[#030911] bg-[url('/imagems/About/fundo.png')] bg-cover bg-center text-white`}
    >
      <div className="mx-auto grid min-h-[548px] w-full max-w-[1440px] grid-cols-1 items-center gap-5 px-5 py-20 sm:px-8 lg:grid-cols-[343px_299px_520px] lg:gap-[35px] lg:px-[70px] lg:py-0">
        <div className="order-2 flex flex-col items-start gap-5 overflow-hidden lg:order-1 lg:pt-[31px]">
          <p className="text-[16px] leading-[1.3] font-semibold text-[#00ff96] uppercase">
            {"// Quem sou"}
          </p>

          <h2 className="max-w-[343px] text-[19px] leading-[1.43] font-normal text-[#f4f7ff] sm:text-[22px]">
            Desenvolvedor Full Stack apaixonado por transformar ideias em{" "}
            <span className="text-[#00ff96]">experiências digitais incríveis.</span>
          </h2>

          <div className="flex items-center gap-2.5 pt-[15px]">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex size-[68px] items-center justify-center rounded-[27px] border border-[rgba(46,79,115,0.9)] bg-[rgba(3,9,17,0.72)] text-[12px] leading-none font-bold text-[#00ff96] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00ff96]"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative flex h-[320px] w-[130px] rotate-[-0.68deg] items-center justify-center bg-[rgba(65,60,60,0.35)] sm:h-[401px] sm:w-[300px]">
            <p className="max-w-[206px] rotate-[0.68deg] text-center text-[30px] leading-[1.05] font-normal text-black sm:text-[36px]">
              espaço para Imgem
            </p>
          </div>
        </div>

        <div className="order-3 flex max-w-[520px] flex-col items-start gap-5 overflow-hidden">
          <p className="rounded-[6px] border border-[#21406b] bg-[rgba(3,6,15,0.72)] px-3.5 py-2 text-[12px] leading-none font-bold tracking-[0.08em] text-[#00ff96] uppercase">
            {"01 // Sobre mim"}
          </p>

          <div>
            <h2 className="text-[42px] leading-[1.08] font-bold text-[#f7f8ff] sm:text-[52px]">
              Sobre mim
            </h2>
            <p className="mt-1 text-[14px] leading-none font-medium tracking-[0.32em] text-[#8fb6e9] uppercase">
              Desenvolvedor Full Stack
            </p>
          </div>

          <div className="space-y-3 text-[14px] leading-[1.43] font-normal text-[#f4f7ff]">
            <p>
              Sou desenvolvedor Full Stack com foco em criar aplicações web
              modernas, rápidas e escaláveis. Gosto de unir código limpo,
              arquitetura sólida e design cuidadoso para entregar soluções que
              realmente fazem a diferença.
            </p>
            <p>
              Tenho experiência com JavaScript, TypeScript, React, Node.js,
              NestJS, PostgreSQL e MongoDB, além de ferramentas que potencializam
              performance e a experiência do usuário.
            </p>
            <p>
              Acredito em aprendizado contínuo, colaboração e atenção aos
              detalhes em cada linha de código.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

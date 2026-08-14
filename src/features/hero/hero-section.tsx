import Image from "next/image";
import { Poppins } from "next/font/google";
import { CarroselHero } from "./carrosel-hero";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export function HeroSection() {
  return (
    <section
      className={`${poppins.className} relative min-h-screen w-full overflow-hidden bg-[#090f1d] bg-[url('/imagems/Hero/image1.png')] bg-[length:auto_811px] bg-top bg-repeat-x text-white md:min-h-[875px]`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-[110px] text-center sm:px-8 md:pt-[110px]">
        <p className="text-[19px] leading-[1.3] font-semibold text-[#30db5c]">
          Hello World! eu sou
        </p>

        <h1 className="mt-2.5 text-[42px] leading-[1.3] font-bold text-white sm:text-[50px]">
          Fellype Kenned
        </h1>

        <p className="mt-2.5 max-w-[488px] text-[15px] leading-[1.3] font-normal text-[#e5ebf2]">
          Transformo ideias em experiências digitais, unindo código limpo, boas soluções e atenção aos detalhes. Este é meu espaço para criar, experimentar e construir projetos que fazem sentido.
        </p>

        <div className="mt-[34px] flex flex-col items-center gap-3.5 text-sm leading-none font-medium min-[420px]:flex-row">
          <a
            href="#projects"
            className="flex h-[47px] w-[174px] items-center justify-center gap-[9px] rounded-[7px] bg-[#2ed657] px-6 text-[#05140a] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ed657]"
          >
            <span className="font-semibold" aria-hidden="true">
              {"</>"}
            </span>
            <span>Ver Projetos</span>
          </a>

          <a
            href="#contact"
            className="flex h-[47px] w-[154px] items-center justify-center gap-[9px] rounded-[7px] border border-[rgba(51,209,92,0.8)] bg-[rgba(4,8,15,0.72)] px-6 text-[#42eb6b] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#42eb6b]"
          >
            <span className="font-semibold text-[#38e563]" aria-hidden="true">
              @
            </span>
            <span>Contact Me</span>
          </a>
        </div>

        <div className="relative mt-5 h-auto w-full max-w-[608px] md:mt-[17px]">
          <Image
            src="/imagems/Setup.png"
            alt="Developer workstation setup"
            width={608}
            height={406}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </div>

      <CarroselHero />
    </section>
  );
}

import Image from "next/image";
import { Poppins, Roboto_Mono } from "next/font/google";
import { OrbitStack } from "./orbit-stack";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

function TerminalManifesto() {
  return (
    <div className="relative h-[150px] w-full max-w-[571px] overflow-hidden rounded-[10px] border border-[rgba(31,51,82,0.9)] bg-[rgba(3,8,17,0.82)]">
      <div className="absolute -top-px -left-px h-[38px] w-[calc(100%+1px)] bg-[#09121f]" />

      <div className="absolute top-[13px] left-[15px] flex items-center gap-2.5">
        <Image
          src="/imagems/Stacks/window-dot-red.svg"
          alt=""
          width={10}
          height={10}
          className="size-2.5"
        />
        <Image
          src="/imagems/Stacks/window-dot-yellow.svg"
          alt=""
          width={10}
          height={10}
          className="size-2.5"
        />
        <Image
          src="/imagems/Stacks/window-dot-green.svg"
          alt=""
          width={10}
          height={10}
          className="size-2.5"
        />
      </div>

      <p
        className={`${robotoMono.className} absolute top-[13px] right-[14px] text-[9px] leading-none font-normal text-[#40f26e]`}
      >
        ~/portfolio
      </p>

      <div
        className={`${robotoMono.className} absolute top-[57px] left-[17px] space-y-[18px] text-[11px] leading-none font-normal`}
      >
        <p className="text-[#85f5a3]">{"> construindo soluções digitais"}</p>
        <p className="text-[#e0e8f5]">{"> com código, dados e propósito"}</p>
        <p className="text-[#e0e8f5]">{"> _"}</p>
      </div>
    </div>
  );
}

function CodeEcosystemOrbit() {
  return (
    <div
      className="relative h-[185px] w-[380px] max-w-full"
      data-name="Orbit / Code Ecosystem"
    >
      <Image
        src="/imagems/Stacks/code-orbit-ring-lg.svg"
        alt=""
        width={340}
        height={92}
        className="absolute top-[58px] left-0 h-[92px] w-[340px] rotate-[10deg]"
      />
      <Image
        src="/imagems/Stacks/code-orbit-ring-md.svg"
        alt=""
        width={285}
        height={72}
        className="absolute top-[65px] left-[38px] h-[72px] w-[285px] rotate-[10deg]"
      />
      <Image
        src="/imagems/Stacks/code-orbit-ring-sm.svg"
        alt=""
        width={205}
        height={54}
        className="absolute top-[72px] left-[83px] h-[54px] w-[205px] rotate-[10deg]"
      />
      <Image
        src="/imagems/Stacks/code-core.svg"
        alt=""
        width={74}
        height={74}
        className="absolute top-[54px] left-[151px] size-[74px]"
      />

      <p
        className={`${robotoMono.className} absolute top-[72px] left-[163px] text-[27px] leading-normal font-normal whitespace-nowrap text-[#40f26e]`}
      >
        {"</>"}
      </p>

      <Image
        src="/imagems/Stacks/orbit-node-1.svg"
        alt=""
        width={10}
        height={10}
        className="absolute top-[54px] left-[74px] size-2.5"
      />
      <Image
        src="/imagems/Stacks/orbit-node-2.svg"
        alt=""
        width={9}
        height={9}
        className="absolute top-[67px] left-[263px] size-[9px]"
      />
      <Image
        src="/imagems/Stacks/orbit-node-3.svg"
        alt=""
        width={11}
        height={11}
        className="absolute top-[151px] left-[232px] size-[11px]"
      />
      <Image
        src="/imagems/Stacks/orbit-node-4.svg"
        alt=""
        width={6}
        height={6}
        className="absolute top-[100px] left-[351px] size-1.5"
      />
    </div>
  );
}

export function StacksSection() {
  return (
    <section
      id="stacks"
      className={`${poppins.className} relative overflow-hidden bg-[#030911] bg-[url('/imagems/About/fundo.png')] bg-cover bg-center px-5 py-20 text-white sm:px-8 lg:py-[22px]`}
      data-node-id="32:17"
      data-name="Stacks / Technologies"
    >
      <div className="mx-auto grid min-h-[457px] w-full max-w-[1024px] grid-cols-1 items-center gap-12 lg:grid-cols-[589px_455px] lg:gap-[43px]">
        <div className="flex flex-col items-start">
          <p className="text-[16px] leading-6 font-medium text-[#40f26e] uppercase">
            {"—  02 // Stacks"}
          </p>

          <h2 className="mt-6 max-w-[620px] text-[38px] leading-[1.12] font-bold text-[#f5f7fc] sm:text-[46px] sm:leading-[56px]">
            Tecnologias que uso para construir produtos.
          </h2>

          <p className="mt-5 max-w-[600px] text-[17px] leading-[26px] font-normal text-[#a3adbf]">
            Trabalho com um ecossistema moderno e confiável para entregar
            aplicações escaláveis, performáticas e com ótima experiência de
            desenvolvimento.
          </p>

          <div className="mt-[18px] w-full">
            <TerminalManifesto />
          </div>

          <div className="mt-[22px] flex w-full justify-center lg:justify-start lg:pl-[90px]">
            <CodeEcosystemOrbit />
          </div>
        </div>

        <div className="flex justify-center lg:justify-start">
          <OrbitStack />
        </div>
      </div>
    </section>
  );
}

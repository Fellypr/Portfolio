import { Poppins } from "next/font/google";
import { CodeEcosystemOrbit } from "./code-ecosystem-orbit";
import { OrbitStack } from "./orbit-stack";
import { TerminalManifesto } from "./terminal-manifesto";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export function StacksSection() {
  return (
    <section
      id="stacks"
      className={`${poppins.className} relative overflow-hidden bg-[#030911] bg-[url('/imagems/About/fundo.png')] bg-cover bg-center px-5 py-20 text-white sm:px-8 lg:py-[62px]`}
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

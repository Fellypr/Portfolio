import Image from "next/image";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export function CodeEcosystemOrbit() {
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

import Image from "next/image";
import { Roboto_Mono } from "next/font/google";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

export function TerminalManifesto() {
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

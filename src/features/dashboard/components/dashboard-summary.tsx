import Image from "next/image";

import { summaryCards } from "../dashboard-data";

export function DashboardSummary() {
  return (
    <section className="grid grid-cols-3 gap-[20px]">
      {summaryCards.map((card) => (
        <article
          key={card.label}
          className="flex h-[118px] w-[100%] items-center rounded-[14px] border border-[#273449] bg-[#111827] shadow-[0_5px_16px_rgba(0,0,0,0.35)]"
        >
          <div
            className="ml-[20px] flex size-[66px] items-center justify-center rounded-[14px]"
            style={{ backgroundColor: card.iconBackground }}
          >
            <Image src={card.icon} alt="" className="size-[28px]" width={28} height={28} />
          </div>
          <div className="ml-[24px]">
            <p className="text-[12px] leading-none font-medium text-[#cbd5e1]">{card.label}</p>
            <p
              className={[
                "mt-[14px] leading-none font-semibold text-[#f8fafc]",
                card.compactValue ? "text-[20px]" : "text-[25px]",
              ].join(" ")}
            >
              {card.value}
            </p>
            <p className="mt-[12px] text-[11px] leading-none text-[#94a3b8]">{card.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

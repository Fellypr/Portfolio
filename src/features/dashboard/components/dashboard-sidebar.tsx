import Image from "next/image";

import { dashboardAssets, sidebarItems } from "../dashboard-data";

export function DashboardSidebar() {
  return (
    <aside className="h-[903px] w-[280px] shrink-0 overflow-hidden border border-[#273449] bg-[#111827]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-[12px] px-[25px] pt-[21px]">
          <div className="relative flex size-[34px] items-center justify-center rounded-[7px] bg-[#5547f5]">
            <span className="text-[19px] leading-none font-bold text-white">▤</span>
          </div>
          <p className="text-[19px] leading-none font-semibold whitespace-nowrap text-[#f8fafc]">
            Painel do Portfólio
          </p>
        </div>

        <nav className="mt-[43px] space-y-[12px]">
          {sidebarItems.map((item) => (
            <div key={item.label} className="relative h-[52px]">
              {item.active ? (
                <>
                  <div className="absolute top-0 left-[7px] h-[52px] w-[260px] rounded-[10px] bg-[#29245f]" />
                  <div className="absolute top-0 left-[-1px] h-[52px] w-[4px] rounded-[2px] bg-[#5547f5]" />
                </>
              ) : null}
              <div className="relative flex h-full items-center">
                <Image
                  src={item.icon}
                  alt=""
                  className="ml-[29px] size-[22px] shrink-0"
                  width={22}
                  height={22}
                />
                <span
                  className={[
                    "ml-[24px] text-[14px] leading-none whitespace-nowrap",
                    item.active
                      ? "font-semibold text-[#4f46e5]"
                      : "font-normal text-[#e2e8f0]",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto px-[23px] pb-[28px]">
          <div className="mb-[28px] h-px w-[232px] bg-[#263244]" />
          <div className="flex items-center">
            <Image src={dashboardAssets.theme} alt="" className="ml-[7px] size-[20px]" width={20} height={20} />
            <div className="ml-[23px]">
              <p className="text-[11px] leading-none text-[#94a3b8]">Tema</p>
              <p className="mt-[7px] text-[12px] leading-none text-[#cbd5e1]">Escuro</p>
            </div>
            <Image
              src={dashboardAssets.chevronTheme}
              alt=""
              className="ml-auto mr-[9px] size-[16px]"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

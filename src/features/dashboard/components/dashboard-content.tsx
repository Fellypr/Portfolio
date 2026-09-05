import Image from "next/image";

import { dashboardAssets } from "../dashboard-data";
import { DashboardSummary } from "./dashboard-summary";
import { ProjectsPanel } from "./projects-panel";
import { AboutPanel, ContactsPanel } from "./sidebar-panels";

export function DashboardContent() {
  return (
    <section className="min-h-screen w-full overflow-x-auto overflow-y-hidden bg-[#0b1120] px-6 py-[42px]">
      <div className="mx-auto w-[1316px]">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-[30px] leading-none font-bold text-[#f8fafc]">Gerenciar Portfólio</h1>
            <p className="mt-[17px] text-[13px] leading-none text-[#94a3b8]">
              Gerencie os conteúdos do seu portfólio de forma simples e organizada.
            </p>
          </div>
          <button className="flex h-[50px] w-[174px] items-center rounded-[12px] bg-[#5547f5] pl-[22px]">
            <Image src={dashboardAssets.plus} alt="" className="size-[22px]" width={22} height={22} />
            <span className="ml-[11px] text-[14px] leading-none font-semibold text-white">Novo projeto</span>
          </button>
        </header>

        <div className="mt-[30px]">
          <DashboardSummary />
        </div>

        <div className="mt-[21px] flex gap-[29px]">
          <ProjectsPanel />
          <aside className="space-y-[22px]">
            <AboutPanel />
            <ContactsPanel />
          </aside>
        </div>
      </div>
    </section>
  );
}

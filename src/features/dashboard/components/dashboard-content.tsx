"use client";

import Image from "next/image";
import { useState } from "react";

import { dashboardAssets } from "../dashboard-data";
import { DashboardSummary } from "./dashboard-summary";
import { ProjectsPanel } from "./projects-panel";
import { AboutPanel, ContactsPanel } from "./sidebar-panels";
import { CreateProjectModal } from "../modals/create-project-modal";
import { useDashboardProjects } from "../hooks/use-dashboard-projects";

export function DashboardContent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { createProject, isSubmitting, refresh } = useDashboardProjects();

  const handleCreate = async (data: Parameters<typeof createProject>[0]) => {
    await createProject(data);
    refresh();
  };

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
          <button
            type="button"
            onClick={() => setIsCreateOpen(true)}
            className="flex h-[50px] w-[174px] items-center rounded-[12px] bg-[#5547f5] pl-[22px] transition hover:bg-[#4f46e5]"
          >
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

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { dashboardAssets } from "../dashboard-data";
import { DashboardSummary } from "./dashboard-summary";
import { ProjectsPanel } from "./projects-panel";
import { AboutPanel, ContactsPanel } from "./sidebar-panels";
import { CreateProjectModal } from "../modals/create-project-modal";
import { useDashboardProjects } from "../hooks/use-dashboard-projects";
import { useDashboardAboutMe } from "../hooks/use-dashboard-about-me";
import { useDashboardContact } from "../hooks/use-dashboard-contacts";

export function DashboardContent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const projectsHook = useDashboardProjects();
  const aboutMeHook = useDashboardAboutMe();
  const contactsHook = useDashboardContact();

  const handleCreate = async (data: Parameters<typeof projectsHook.createProject>[0]) => {
    await projectsHook.createProject(data);
  };

  const publishedCount = useMemo(() => {
    return projectsHook.projects.filter(
      (p) => (p.status ?? "").toLowerCase() === "publicado"
    ).length;
  }, [projectsHook.projects]);

  const stacksCount = useMemo(() => {
    const techSet = new Set<string>();
    projectsHook.projects.forEach((p) => {
      if (p.technologies) {
        p.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .forEach((t) => techSet.add(t));
      }
    });
    return techSet.size;
  }, [projectsHook.projects]);

  const activeContactsCount = useMemo(() => {
    const c = contactsHook.contact;
    if (!c) return 0;
    let count = 0;
    if (c.whatsapp?.trim()) count++;
    if (c.email?.trim()) count++;
    if (c.linkedin?.trim()) count++;
    return count;
  }, [contactsHook.contact]);

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
            className="flex h-[50px] w-[174px] items-center rounded-[12px] bg-[#5547f5] pl-[22px] transition hover:bg-[#4f46e5] cursor-pointer"
          >
            <Image src={dashboardAssets.plus} alt="" className="size-[22px]" width={22} height={22} />
            <span className="ml-[11px] text-[14px] leading-none font-semibold text-white">Novo projeto</span>
          </button>
        </header>

        <div className="mt-[30px]">
          <DashboardSummary
            projectsCount={projectsHook.projects.length}
            publishedCount={publishedCount}
            stacksCount={stacksCount}
            contactsCount={activeContactsCount}
          />
        </div>

        <div className="mt-[21px] flex gap-[29px]">
          <ProjectsPanel
            projects={projectsHook.projects}
            loading={projectsHook.loading}
            error={projectsHook.error}
            isSubmitting={projectsHook.isSubmitting}
            updateProject={projectsHook.updateProject}
            deleteProject={projectsHook.deleteProject}
            refresh={projectsHook.refresh}
          />
          <aside className="space-y-[22px]">
            <AboutPanel
              aboutMe={aboutMeHook.aboutMe}
              loading={aboutMeHook.loading}
              error={aboutMeHook.error}
              isSubmitting={aboutMeHook.isSubmitting}
              updateAboutMe={aboutMeHook.updateAboutMe}
              createAboutMe={aboutMeHook.createAboutMe}
              refresh={aboutMeHook.refresh}
            />
            <ContactsPanel
              contact={contactsHook.contact}
              loading={contactsHook.loading}
              error={contactsHook.error}
              isSubmitting={contactsHook.isSubmitting}
              updateContact={contactsHook.updateContact}
              createContact={contactsHook.createContact}
              refresh={contactsHook.refresh}
            />
          </aside>
        </div>
      </div>

      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
        isSubmitting={projectsHook.isSubmitting}
      />
    </section>
  );
}


"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type { ProjectResponseDto, UpdateProjectDto } from "@/api/generated/interfaces";
import { dashboardAssets } from "../dashboard-data";
import { useDashboardProjects } from "../hooks/use-dashboard-projects";
import { EditProjectModal } from "../modals/edit-project-modal";
import { ProjectThumbnail } from "./project-thumbnail";

function StatusPill({ status }: { status?: string | null }) {
  const isPublished = (status ?? "").toLowerCase() === "publicado";

  return (
    <div
      className={[
        "flex h-[26px] w-[92px] items-center rounded-[13px] pl-[11px]",
        isPublished ? "bg-[#143522]" : "bg-[#3a2a0b]",
      ].join(" ")}
    >
      <span
        className={[
          "size-[8px] rounded-[4px]",
          isPublished ? "bg-[#16a34a]" : "bg-[#d18b00]",
        ].join(" ")}
      />
      <span
        className={[
          "ml-[7px] text-[10px] leading-none font-medium",
          isPublished ? "text-[#16a34a]" : "text-[#d18b00]",
        ].join(" ")}
      >
        {status || "Rascunho"}
      </span>
    </div>
  );
}

function parseTechnologies(techsString?: string | null): string[] {
  if (!techsString) return [];
  return techsString
    .split(",")
    .map((tech) => tech.trim())
    .filter(Boolean);
}

export function ProjectsPanel() {
  const {
    projects,
    loading,
    error,
    isSubmitting,
    updateProject,
    deleteProject,
    refresh,
  } = useDashboardProjects();

  const [selectedProject, setSelectedProject] = useState<ProjectResponseDto | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("Todos");

  const filteredProjects = useMemo(() => {
    if (filterStatus === "Todos") return projects;
    return projects.filter(
      (p) => (p.status ?? "").toLowerCase() === filterStatus.toLowerCase()
    );
  }, [projects, filterStatus]);

  const handleDelete = async (id?: number) => {
    if (!id) return;
    const confirmed = window.confirm("Deseja realmente excluir este projeto?");
    if (confirmed) {
      try {
        await deleteProject(id);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao excluir.";
        alert(message);
      }
    }
  };

  const handleSaveEdit = async (id: number, data: UpdateProjectDto) => {
    await updateProject(id, data);
  };

  return (
    <>
      <section className="h-[535px] w-[902px] overflow-hidden rounded-[12px] border border-[#273449] bg-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.35)] flex flex-col justify-between">
        <div>
          <header className="flex h-[56px] items-center justify-between border-b border-[#263244] px-[24px]">
            <div className="flex items-center gap-3">
              <h2 className="text-[16px] leading-none font-semibold text-[#f8fafc]">
                Projetos
              </h2>
              <span className="rounded-[10px] bg-[#1e293b] px-2 py-0.5 text-[11px] text-[#94a3b8]">
                {projects.length}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <select
                aria-label="Filtrar por status"
                className="flex h-[34px] rounded-[8px] border border-[#334155] bg-[#111827] px-[12px] text-[11px] text-[#e2e8f0] outline-none transition focus:border-[#5547f5]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="Todos">Todos os status</option>
                <option value="Publicado">Publicados</option>
                <option value="Rascunho">Rascunhos</option>
              </select>

              <button
                type="button"
                onClick={() => refresh()}
                title="Recarregar projetos"
                className="flex size-[34px] items-center justify-center rounded-[8px] border border-[#334155] bg-[#111827] text-[#94a3b8] hover:text-[#f8fafc]"
              >
                ↻
              </button>
            </div>
          </header>

          <div className="max-h-[435px] overflow-y-auto">
            {loading ? (
              <div className="flex h-[200px] flex-col items-center justify-center gap-2 text-[#94a3b8]">
                <div className="size-6 animate-spin rounded-full border-2 border-[#5547f5] border-t-transparent" />
                <span className="text-[12px]">Carregando projetos da API...</span>
              </div>
            ) : error ? (
              <div className="p-6 text-center">
                <p className="text-[13px] text-red-400">{error}</p>
                <button
                  type="button"
                  onClick={() => refresh()}
                  className="mt-3 rounded-[6px] bg-[#334155] px-3 py-1.5 text-[11px] text-white hover:bg-[#475569]"
                >
                  Tentar novamente
                </button>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex h-[200px] flex-col items-center justify-center text-[#94a3b8]">
                <p className="text-[13px]">Nenhum projeto encontrado.</p>
              </div>
            ) : (
              filteredProjects.map((project, index) => {
                const techList = parseTechnologies(project.technologies);

                return (
                  <article
                    key={project.id ?? index}
                    className={[
                      "flex h-[145px] border-b border-[#263244] px-[24px] pt-[18px]",
                      index === filteredProjects.length - 1 ? "border-b-0" : "",
                    ].join(" ")}
                  >
                    <ProjectThumbnail variant="devQuest" />

                    <div className="ml-[29px] w-[330px] pt-[2px]">
                      <h3 className="text-[16px] leading-none font-semibold text-[#f8fafc] truncate">
                        {project.titleProject}
                      </h3>
                      <p className="mt-[16px] text-[11px] leading-[17px] text-[#94a3b8] line-clamp-2">
                        {project.description}
                      </p>
                      <div className="mt-[13px] flex flex-wrap gap-[6px]">
                        {techList.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="flex h-[23px] items-center rounded-[5px] border border-[#1d4ed8] bg-[#14213a] px-[8px] text-[10px] leading-none font-medium text-[#2563eb]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-auto flex w-[238px] justify-between">
                      <div className="pt-0">
                        <StatusPill status={project.status} />
                        <button
                          type="button"
                          className="mt-[12px] h-[31px] w-[190px] rounded-[6px] border border-[#475569] bg-[#111827] text-[11px] leading-none font-medium text-[#e2e8f0] transition hover:border-[#64748b] hover:bg-[#172033]"
                          onClick={() => setSelectedProject(project)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(project.id)}
                          className="mt-[9px] h-[31px] w-[190px] rounded-[6px] border border-[#fca5a5]/30 bg-[#111827] text-[11px] leading-none font-medium text-[#ef4444] transition hover:bg-red-950/30"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        <div className="flex h-[44px] shrink-0 items-center justify-center border-t border-[#263244] bg-[#111827]">
          <span className="text-[12px] leading-none font-medium text-[#64748b]">
            Total de {projects.length} projeto(s) carregados da API
          </span>
        </div>
      </section>

      <EditProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSave={handleSaveEdit}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

import Image from "next/image";

import { dashboardAssets, projects, type ProjectTag } from "../dashboard-data";
import { ProjectThumbnail } from "./project-thumbnail";

const tagToneClasses: Record<NonNullable<ProjectTag["tone"]>, string> = {
  blue: "border-[#1d4ed8] bg-[#14213a] text-[#2563eb]",
  purple: "border-[#a21caf] bg-[#321637] text-[#a21caf]",
  amber: "border-[#a16207] bg-[#35270e] text-[#b7791f]",
};

function ProjectTagPill({ tag }: { tag: ProjectTag }) {
  return (
    <span
      className={[
        "flex h-[25px] items-center rounded-[5px] border px-[10px] text-[10px] leading-none font-medium",
        tagToneClasses[tag.tone ?? "blue"],
      ].join(" ")}
    >
      {tag.label}
    </span>
  );
}

function StatusPill({ status }: { status: "Publicado" | "Rascunho" }) {
  const published = status === "Publicado";

  return (
    <div
      className={[
        "flex h-[26px] w-[92px] items-center rounded-[13px] pl-[11px]",
        published ? "bg-[#143522]" : "bg-[#3a2a0b]",
      ].join(" ")}
    >
      <span className={["size-[8px] rounded-[4px]", published ? "bg-[#16a34a]" : "bg-[#d18b00]"].join(" ")} />
      <span
        className={[
          "ml-[7px] text-[10px] leading-none font-medium",
          published ? "text-[#16a34a]" : "text-[#d18b00]",
        ].join(" ")}
      >
        {status}
      </span>
    </div>
  );
}

export function ProjectsPanel() {
  return (
    <section className="h-[535px] w-[902px] rounded-[12px] border border-[#273449] bg-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
      <header className="flex h-[56px] items-start justify-between border-b border-[#263244] px-[24px] pt-[19px]">
        <h2 className="text-[16px] leading-none font-semibold text-[#f8fafc]">Projetos</h2>
        <button className="flex h-[34px] w-[186px] items-center rounded-[8px] border border-[#334155] bg-[#111827] px-[15px]">
          <span className="text-[11px] leading-none text-[#e2e8f0]">Todos os status</span>
          <Image src={dashboardAssets.chevronFilter} alt="" className="ml-auto size-[14px]" width={14} height={14} />
        </button>
      </header>

      <div>
        {projects.map((project, index) => (
          <article
            key={project.title}
            className={[
              "flex h-[145px] border-b border-[#263244] px-[24px] pt-[18px]",
              index === projects.length - 1 ? "border-b-0" : "",
            ].join(" ")}
          >
            <ProjectThumbnail variant={project.thumbnail} />

            <div className="ml-[29px] w-[330px] pt-[2px]">
              <h3 className="text-[16px] leading-none font-semibold text-[#f8fafc]">{project.title}</h3>
              <p className="mt-[23px] text-[11px] leading-[17px] text-[#94a3b8]">
                {project.description[0]}
                <br />
                {project.description[1]}
              </p>
              <div className="mt-[13px] flex gap-[10px]">
                {project.tags.map((tag) => (
                  <ProjectTagPill key={tag.label} tag={tag} />
                ))}
              </div>
            </div>

            <div className="ml-auto flex w-[238px] justify-between">
              <div className="pt-0">
                <StatusPill status={project.status} />
                <button className="mt-[12px] h-[31px] w-[190px] rounded-[6px] border border-[#475569] bg-[#111827] text-[11px] leading-none font-medium text-[#e2e8f0]">
                  Editar
                </button>
                <button className="mt-[9px] h-[31px] w-[190px] rounded-[6px] border border-[#fca5a5] bg-[#111827] text-[11px] leading-none font-medium text-[#ef4444]">
                  Excluir
                </button>
              </div>
              <span className="-mt-[5px] text-[20px] leading-none font-bold text-[#f8fafc]">⋮</span>
            </div>
          </article>
        ))}
      </div>

      <div className="flex h-[44px] items-center justify-center border-t border-[#263244]">
        <button className="text-[12px] leading-none font-medium whitespace-pre text-[#4f46e5]">
          {`Ver todos os projetos  ›`}
        </button>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

import { ProjectThumbnail } from "../components/project-thumbnail";
import type { DashboardProject } from "../dashboard-data";

type EditProjectModalProps = {
  project: DashboardProject | null;
  onClose: () => void;
};

export function EditProjectModal({ project, onClose }: EditProjectModalProps) {
  const isOpen = Boolean(project);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/75 px-6 backdrop-blur-[6px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseDown={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-project-title"
            className="w-full max-w-[720px] overflow-hidden rounded-[14px] border border-[#273449] bg-[#111827] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between border-b border-[#263244] px-[26px] py-[22px]">
              <div>
                <p className="text-[11px] leading-none font-medium tracking-[0.08em] text-[#64748b] uppercase">
                  Projeto
                </p>
                <h2 id="edit-project-title" className="mt-[10px] text-[22px] leading-none font-semibold text-[#f8fafc]">
                  Editar projeto
                </h2>
              </div>

              <button
                type="button"
                aria-label="Fechar modal"
                className="flex size-[34px] items-center justify-center rounded-[8px] border border-[#334155] bg-[#0f172a] text-[20px] leading-none text-[#cbd5e1] transition hover:border-[#475569] hover:bg-[#172033]"
                onClick={onClose}
              >
                x
              </button>
            </header>

            <form
              className="grid grid-cols-1 gap-[26px] px-[26px] py-[24px] sm:grid-cols-[185px_1fr]"
              onSubmit={(event) => {
                event.preventDefault();
                onClose();
              }}
            >
              <ProjectThumbnail variant={project.thumbnail} />

              <div className="space-y-[17px]">
                <label className="block">
                  <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                    Título
                  </span>
                  <input
                    className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] font-medium text-[#f8fafc] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                    defaultValue={project.title}
                  />
                </label>

                <label className="block">
                  <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                    Descrição
                  </span>
                  <textarea
                    className="h-[86px] w-full resize-none rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] py-[12px] text-[13px] leading-[18px] text-[#e2e8f0] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                    defaultValue={project.description.join("\n")}
                  />
                </label>

                <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-[1fr_170px]">
                  <label className="block">
                    <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                      Tecnologias
                    </span>
                    <input
                      className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] text-[#f8fafc] outline-none transition focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                      defaultValue={project.tags.map((tag) => tag.label).join(", ")}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                      Status
                    </span>
                    <select
                      className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[12px] text-[13px] font-medium text-[#f8fafc] outline-none transition focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                      defaultValue={project.status}
                    >
                      <option>Publicado</option>
                      <option>Rascunho</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[12px] border-t border-[#263244] pt-[22px] sm:col-span-2">
                <button
                  type="button"
                  className="h-[40px] w-[112px] rounded-[8px] border border-[#334155] bg-[#111827] text-[12px] leading-none font-medium text-[#e2e8f0] transition hover:border-[#475569] hover:bg-[#172033]"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex h-[40px] w-[146px] items-center justify-center rounded-[8px] bg-[#5547f5] text-[12px] leading-none font-semibold text-white transition hover:bg-[#4f46e5]"
                >
                  Salvar edição
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

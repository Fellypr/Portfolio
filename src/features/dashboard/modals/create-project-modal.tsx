"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { ProjectThumbnail } from "../components/project-thumbnail";
import type { CreateProjectDto } from "@/api/generated/interfaces";

type CreateProjectModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (data: CreateProjectDto) => Promise<void> | void;
  isSubmitting?: boolean;
};

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
  isSubmitting = false,
}: CreateProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [status, setStatus] = useState("Publicado");
  const [urlImage, setUrlImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setTechnologies("");
      setStatus("Publicado");
      setUrlImage("");
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Título e descrição são obrigatórios.");
      return;
    }

    try {
      setError(null);
      if (onCreate) {
        await onCreate({
          titleProject: title.trim(),
          description: description.trim(),
          technologies: technologies.trim() || "Geral",
          status: status.trim(),
          urlImage: urlImage.trim() || "default-thumbnail",
        });
      }
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Falha ao criar o projeto.";
      setError(message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
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
            aria-labelledby="create-project-title"
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
                  Novo Projeto
                </p>
                <h2 id="create-project-title" className="mt-[10px] text-[22px] leading-none font-semibold text-[#f8fafc]">
                  Criar projeto
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
              onSubmit={handleSubmit}
            >
              <div>
                <ProjectThumbnail variant="devQuest" />
                <label className="mt-3 block">
                  <span className="mb-[6px] block text-[10px] leading-none font-medium text-[#94a3b8]">
                    URL da Imagem
                  </span>
                  <input
                    className="h-[36px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[10px] text-[12px] text-[#f8fafc] outline-none transition focus:border-[#5547f5]"
                    value={urlImage}
                    onChange={(e) => setUrlImage(e.target.value)}
                    placeholder="https://..."
                  />
                </label>
              </div>

              <div className="space-y-[17px]">
                {error && (
                  <div className="rounded-[6px] border border-red-500/40 bg-red-500/10 p-2.5 text-[12px] text-red-400">
                    {error}
                  </div>
                )}

                <label className="block">
                  <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                    Título
                  </span>
                  <input
                    className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] font-medium text-[#f8fafc] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Plataforma E-commerce"
                    required
                  />
                </label>

                <label className="block">
                  <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                    Descrição
                  </span>
                  <textarea
                    className="h-[86px] w-full resize-none rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] py-[12px] text-[13px] leading-[18px] text-[#e2e8f0] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Breve resumo das funcionalidades e objetivo do projeto."
                    required
                  />
                </label>

                <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-[1fr_170px]">
                  <label className="block">
                    <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                      Tecnologias (separadas por vírgula)
                    </span>
                    <input
                      className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] text-[#f8fafc] outline-none transition focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      placeholder="React, TypeScript, Node.js"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
                      Status
                    </span>
                    <select
                      className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[12px] text-[13px] font-medium text-[#f8fafc] outline-none transition focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Publicado">Publicado</option>
                      <option value="Rascunho">Rascunho</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-[12px] border-t border-[#263244] pt-[22px] sm:col-span-2">
                <button
                  type="button"
                  className="h-[40px] w-[112px] rounded-[8px] border border-[#334155] bg-[#111827] text-[12px] leading-none font-medium text-[#e2e8f0] transition hover:border-[#475569] hover:bg-[#172033]"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex h-[40px] w-[146px] items-center justify-center rounded-[8px] bg-[#5547f5] text-[12px] leading-none font-semibold text-white transition hover:bg-[#4f46e5] disabled:opacity-50"
                >
                  {isSubmitting ? "Criando..." : "Criar projeto"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


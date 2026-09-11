"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import type { DashboardProfile } from "../dashboard-data";

type EditProfileModalProps = {
  isOpen: boolean;
  profile: DashboardProfile;
  onClose: () => void;
  onSave?: (profile: DashboardProfile) => void;
};

type EditProfileFormProps = {
  profile: DashboardProfile;
  onClose: () => void;
  onSave?: (profile: DashboardProfile) => void;
};

function EditProfileForm({ profile, onClose, onSave }: EditProfileFormProps) {
  const [formData, setFormData] = useState<DashboardProfile>(profile);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave?.(formData);
    onClose();
  };

  const handleNameChange = (name: string) => {
    const words = name.trim().split(/\s+/);
    const suggestedInitials =
      words.length >= 2
        ? `${words[0][0] ?? ""}${words[words.length - 1][0] ?? ""}`.toUpperCase()
        : (name.slice(0, 2) || "LE").toUpperCase();

    setFormData((prev) => ({
      ...prev,
      name,
      initials: prev.initials.length <= 2 ? suggestedInitials : prev.initials,
    }));
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      className="w-full max-w-[620px] overflow-hidden rounded-[14px] border border-[#273449] bg-[#111827] shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 18, scale: 0.98 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <header className="flex items-start justify-between border-b border-[#263244] px-[26px] py-[22px]">
        <div>
          <p className="text-[11px] leading-none font-medium tracking-[0.08em] text-[#64748b] uppercase">
            Sobre mim
          </p>
          <h2
            id="edit-profile-title"
            className="mt-[10px] text-[22px] leading-none font-semibold text-[#f8fafc]"
          >
            Editar perfil
          </h2>
        </div>

        <button
          type="button"
          aria-label="Fechar modal"
          className="flex size-[34px] items-center justify-center rounded-[8px] border border-[#334155] bg-[#0f172a] text-[20px] leading-none text-[#cbd5e1] transition hover:border-[#475569] hover:bg-[#172033] cursor-pointer"
          onClick={onClose}
        >
          ×
        </button>
      </header>

      <form
        className="space-y-[20px] px-[26px] py-[24px]"
        onSubmit={handleSubmit}
      >
        {/* Profile Avatar & Quick Preview */}
        <div className="flex items-center gap-[20px] rounded-[10px] border border-[#263244] bg-[#0f172a] p-[16px]">
          <div className="flex size-[64px] shrink-0 items-center justify-center rounded-full bg-[#1f2937] ring-2 ring-[#5547f5]/40">
            <span className="text-[18px] leading-none font-bold text-white">
              {formData.initials || "LE"}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-[14px] leading-none font-semibold text-[#f8fafc]">
              {formData.name || "Seu Nome"}
            </p>
            <p className="mt-[6px] text-[12px] leading-none font-medium text-[#4f46e5]">
              {formData.role || "Cargo / Especialidade"}
            </p>
            <p className="mt-[6px] text-[11px] leading-none text-[#94a3b8]">
              Iniciais exibidas no avatar
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-[1fr_120px]">
          <label className="block">
            <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
              Nome completo
            </span>
            <input
              type="text"
              required
              className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] font-medium text-[#f8fafc] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Ex: Luiz Emiliano"
            />
          </label>

          <label className="block">
            <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
              Iniciais
            </span>
            <input
              type="text"
              maxLength={3}
              className="h-[42px] w-full uppercase rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-center text-[13px] font-bold text-[#f8fafc] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
              value={formData.initials}
              onChange={(e) =>
                setFormData({ ...formData, initials: e.target.value.toUpperCase() })
              }
              placeholder="LE"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
            Cargo / Profissão
          </span>
          <input
            type="text"
            required
            className="h-[42px] w-full rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] text-[13px] font-medium text-[#f8fafc] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
            placeholder="Ex: Desenvolvedor Full Stack"
          />
        </label>

        <label className="block">
          <span className="mb-[8px] block text-[11px] leading-none font-medium text-[#94a3b8]">
            Biografia / Apresentação
          </span>
          <textarea
            rows={4}
            required
            className="h-[96px] w-full resize-none rounded-[8px] border border-[#334155] bg-[#0f172a] px-[13px] py-[12px] text-[13px] leading-[18px] text-[#e2e8f0] outline-none transition placeholder:text-[#64748b] focus:border-[#5547f5] focus:ring-2 focus:ring-[#5547f5]/25"
            value={formData.bio}
            onChange={(e) =>
              setFormData({ ...formData, bio: e.target.value })
            }
            placeholder="Escreva um breve resumo sobre você..."
          />
        </label>

        <div className="flex items-center justify-end gap-[12px] border-t border-[#263244] pt-[20px]">
          <button
            type="button"
            className="h-[40px] w-[112px] rounded-[8px] border border-[#334155] bg-[#111827] text-[12px] leading-none font-medium text-[#e2e8f0] transition hover:border-[#475569] hover:bg-[#172033] cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex h-[40px] w-[146px] items-center justify-center rounded-[8px] bg-[#5547f5] text-[12px] leading-none font-semibold text-white transition hover:bg-[#4f46e5] cursor-pointer"
          >
            Salvar perfil
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export function EditProfileModal({
  isOpen,
  profile,
  onClose,
  onSave,
}: EditProfileModalProps) {
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
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/75 px-6 backdrop-blur-[6px] h-screen w-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseDown={onClose}
        >
          <EditProfileForm
            profile={profile}
            onClose={onClose}
            onSave={onSave}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import type {
  AboutMeResponseDto,
  ContactResponseDto,
  CreateAboutMeDto,
  CreateContactDto,
  UpdateAboutMeDto,
  UpdateContactDto,
} from "@/api/generated/interfaces";
import { dashboardAssets, defaultProfile } from "../dashboard-data";
import { EditProfileModal, type ProfileFormData } from "../modals";

export interface AboutPanelProps {
  aboutMe?: AboutMeResponseDto | null;
  loading?: boolean;
  error?: string | null;
  isSubmitting?: boolean;
  updateAboutMe?: (id: number, dto: UpdateAboutMeDto) => Promise<unknown>;
  createAboutMe?: (dto: CreateAboutMeDto) => Promise<unknown>;
  refresh?: () => Promise<void> | void;
}

export function AboutPanel({
  aboutMe,
  loading = false,
  error = null,
  isSubmitting = false,
  updateAboutMe,
  createAboutMe,
  refresh,
}: AboutPanelProps) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const profileData: ProfileFormData = useMemo(() => {
    const name = aboutMe?.nameInPortfolio || defaultProfile.name;
    const role = aboutMe?.profession || defaultProfile.role;
    const bio = aboutMe?.descriptionAboutMe || defaultProfile.bio;

    const words = name.trim().split(/\s+/);
    const suggestedInitials =
      words.length >= 2
        ? `${words[0][0] ?? ""}${words[words.length - 1][0] ?? ""}`.toUpperCase()
        : (name.slice(0, 2) || "LE").toUpperCase();

    const initials = aboutMe?.subDescriptions?.trim() || suggestedInitials;

    return {
      name,
      role,
      bio,
      initials,
    };
  }, [aboutMe]);

  const handleSaveProfile = async (formData: ProfileFormData) => {
    const dto: UpdateAboutMeDto = {
      nameInPortfolio: formData.name.trim(),
      profession: formData.role.trim(),
      descriptionAboutMe: formData.bio.trim(),
      subDescriptions: formData.initials.trim() || "LE",
    };

    if (aboutMe?.id && updateAboutMe) {
      await updateAboutMe(aboutMe.id, dto);
    } else if (createAboutMe) {
      await createAboutMe(dto as CreateAboutMeDto);
    }
    refresh?.();
  };

  return (
    <>
      <section className="h-auto w-[385px] rounded-[12px] border border-[#273449] bg-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
        <header className="flex items-center gap-[14px] px-[20px] pt-[18px]">
          <Image
            src={dashboardAssets.profile}
            alt=""
            className="size-[20px]"
            width={20}
            height={20}
          />
          <h2 className="text-[15px] leading-none font-semibold text-[#f8fafc]">
            Sobre mim
          </h2>
          {error && (
            <span className="ml-auto text-[11px] text-red-400" title={error}>
              Erro na API
            </span>
          )}
        </header>

        {loading ? (
          <div className="flex h-[130px] items-center justify-center text-[#94a3b8]">
            <div className="size-5 animate-spin rounded-full border-2 border-[#5547f5] border-t-transparent" />
            <span className="ml-2 text-[12px]">Carregando perfil...</span>
          </div>
        ) : (
          <div className="mt-[14px] flex px-[20px] pb-[20px]">
            <div className="p-[2px]">
              <div className="flex size-[82px] shrink-0 items-center justify-center rounded-full bg-[#1f2937] ring-1 ring-[#334155]">
                <span className="text-[20px] leading-none font-bold text-white">
                  {profileData.initials || "LE"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(true)}
                className="ml-[10px] mt-[8px] text-[11px] leading-none font-medium whitespace-pre text-[#4f46e5] transition hover:text-[#6366f1] cursor-pointer"
              >
                {`Editar perfil  ›`}
              </button>
            </div>
            <div className="ml-[20px] flex-1 min-w-0">
              <h3 className="text-[15px] leading-none font-semibold text-[#f8fafc] truncate">
                {profileData.name}
              </h3>
              <p className="mt-[11px] text-[12px] leading-none font-medium text-[#4f46e5] truncate">
                {profileData.role}
              </p>
              <p className="mt-[14px] text-[11px] leading-[18px] text-[#cbd5e1] line-clamp-4">
                {profileData.bio}
              </p>
            </div>
          </div>
        )}
      </section>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        profile={profileData}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={handleSaveProfile}
        isSubmitting={isSubmitting}
      />
    </>
  );
}

type ChannelKey = "email" | "linkedin" | "whatsapp";

interface ChannelConfig {
  key: ChannelKey;
  label: string;
  placeholder: string;
}

const CHANNELS: ChannelConfig[] = [
  { key: "email", label: "E-mail", placeholder: "seu.email@exemplo.com" },
  { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/perfil" },
  { key: "whatsapp", label: "WhatsApp", placeholder: "(11) 98765-4321" },
];

export interface ContactsPanelProps {
  contact?: ContactResponseDto | null;
  loading?: boolean;
  error?: string | null;
  isSubmitting?: boolean;
  updateContact?: (id: number, dto: UpdateContactDto) => Promise<unknown>;
  createContact?: (dto: CreateContactDto) => Promise<unknown>;
  refresh?: () => Promise<void> | void;
}

export function ContactsPanel({
  contact,
  loading = false,
  error = null,
  isSubmitting = false,
  updateContact,
  createContact,
  refresh,
}: ContactsPanelProps) {
  const [editingKey, setEditingKey] = useState<ChannelKey | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleStartEdit = (key: ChannelKey) => {
    setEditingKey(key);
    setEditValue(contact?.[key] || "");
    setSaveError(null);
  };

  const handleSave = async (key: ChannelKey) => {
    try {
      setSaveError(null);
      const newWhatsapp = key === "whatsapp" ? editValue.trim() : (contact?.whatsapp || "");
      const newEmail = key === "email" ? editValue.trim() : (contact?.email || "");
      const newLinkedin = key === "linkedin" ? editValue.trim() : (contact?.linkedin || "");

      if (contact?.id && updateContact) {
        await updateContact(contact.id, {
          whatsapp: newWhatsapp,
          email: newEmail,
          linkedin: newLinkedin,
        });
      } else if (createContact) {
        await createContact({
          whatsapp: newWhatsapp,
          email: newEmail,
          linkedin: newLinkedin,
        });
      }
      setEditingKey(null);
      refresh?.();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar canal.";
      setSaveError(message);
    }
  };

  return (
    <section className="h-auto min-h-[168px] w-[385px] rounded-[12px] border border-[#273449] bg-[#111827] pb-[16px] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
      <header className="flex items-center gap-[14px] px-[20px] pt-[18px]">
        <Image
          src={dashboardAssets.contactsPanel}
          alt=""
          className="size-[20px]"
          width={20}
          height={20}
        />
        <h2 className="text-[15px] leading-none font-semibold text-[#f8fafc]">
          Contatos
        </h2>
        {error && (
          <span className="ml-auto text-[11px] text-red-400" title={error}>
            Erro na API
          </span>
        )}
      </header>

      {saveError && (
        <div className="mx-[22px] mt-2 rounded-[6px] border border-red-500/40 bg-red-500/10 p-2 text-[11px] text-red-400">
          {saveError}
        </div>
      )}

      {loading ? (
        <div className="flex h-[100px] items-center justify-center text-[#94a3b8]">
          <div className="size-5 animate-spin rounded-full border-2 border-[#5547f5] border-t-transparent" />
          <span className="ml-2 text-[12px]">Carregando contatos...</span>
        </div>
      ) : (
        <div className="mt-[19px] space-y-[14px] px-[22px]">
          {CHANNELS.map(({ key, label, placeholder }) => {
            const isEditing = editingKey === key;
            const value = contact?.[key] || "";

            return (
              <div
                key={key}
                className="grid grid-cols-[84px_1fr_20px] items-center gap-[6px]"
              >
                <p className="text-[11px] leading-none font-medium text-[#e2e8f0]">
                  {label}
                </p>

                {isEditing ? (
                  <input
                    type="text"
                    autoFocus
                    value={editValue}
                    placeholder={placeholder}
                    disabled={isSubmitting}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSave(key);
                      } else if (e.key === "Escape") {
                        setEditingKey(null);
                      }
                    }}
                    className="h-[26px] w-full rounded-[4px] border border-[#5547f5] bg-[#0f172a] px-[8px] text-[11px] text-[#f8fafc] outline-none transition focus:ring-1 focus:ring-[#5547f5]"
                  />
                ) : (
                  <p className="truncate text-[10px] leading-none text-[#cbd5e1]" title={value}>
                    {value || <span className="italic text-[#64748b]">Não informado</span>}
                  </p>
                )}

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    if (isEditing) {
                      handleSave(key);
                    } else {
                      handleStartEdit(key);
                    }
                  }}
                  className="flex size-[20px] items-center justify-center rounded-[4px] text-[13px] leading-none font-medium text-[#94a3b8] transition hover:bg-[#1e293b] hover:text-[#f8fafc] disabled:opacity-50 cursor-pointer"
                  title={isEditing ? "Salvar contato" : "Editar contato"}
                  aria-label={isEditing ? `Salvar ${label}` : `Editar ${label}`}
                >
                  {isSubmitting && isEditing ? "..." : isEditing ? "✓" : "↗"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


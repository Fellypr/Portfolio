"use client";

import Image from "next/image";
import { useState } from "react";

import {
  contacts as initialContacts,
  dashboardAssets,
  defaultProfile,
  type DashboardProfile,
} from "../dashboard-data";
import { EditProfileModal } from "../modals";

export function AboutPanel() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState<DashboardProfile>(defaultProfile);

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
        </header>

        <div className="mt-[14px] flex px-[20px] pb-[20px]">
          <div className="p-[2px]">
            <div className="flex size-[82px] shrink-0 items-center justify-center rounded-full bg-[#1f2937]">
              <span className="text-[20px] leading-none font-bold text-white">
                {profile.initials || "LE"}
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
          <div className="ml-[20px] flex-1">
            <h3 className="text-[15px] leading-none font-semibold text-[#f8fafc]">
              {profile.name}
            </h3>
            <p className="mt-[11px] text-[12px] leading-none font-medium text-[#4f46e5]">
              {profile.role}
            </p>
            <p className="mt-[14px] text-[11px] leading-[18px] text-[#cbd5e1] line-clamp-4">
              {profile.bio}
            </p>
          </div>
        </div>
      </section>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        profile={profile}
        onClose={() => setIsEditProfileOpen(false)}
        onSave={setProfile}
      />
    </>
  );
}

export function ContactsPanel() {
  const [contactsList, setContactsList] = useState(initialContacts);
  const [editingLabel, setEditingLabel] = useState<string | null>(null);

  const handleToggleEdit = (label: string) => {
    setEditingLabel((current) => (current === label ? null : label));
  };

  const handleValueChange = (label: string, newValue: string) => {
    setContactsList((prev) =>
      prev.map((contact) =>
        contact.label === label ? { ...contact, value: newValue } : contact
      )
    );
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
      </header>

      <div className="mt-[19px] space-y-[14px] px-[22px]">
        {contactsList.map((contact) => {
          const isEditing = editingLabel === contact.label;

          return (
            <div
              key={contact.label}
              className="grid grid-cols-[84px_1fr_20px] items-center gap-[6px]"
            >
              <p className="text-[11px] leading-none font-medium text-[#e2e8f0]">
                {contact.label}
              </p>

              {isEditing ? (
                <input
                  type="text"
                  autoFocus
                  value={contact.value}
                  onChange={(e) =>
                    handleValueChange(contact.label, e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "Escape") {
                      setEditingLabel(null);
                    }
                  }}
                  className="h-[26px] w-full rounded-[4px] border border-[#5547f5] bg-[#0f172a] px-[8px] text-[11px] text-[#f8fafc] outline-none transition focus:ring-1 focus:ring-[#5547f5]"
                />
              ) : (
                <p className="truncate text-[10px] leading-none text-[#cbd5e1]">
                  {contact.value}
                </p>
              )}

              <button
                type="button"
                onClick={() => handleToggleEdit(contact.label)}
                className="flex size-[20px] items-center justify-center rounded-[4px] text-[13px] leading-none font-medium text-[#94a3b8] transition hover:bg-[#1e293b] hover:text-[#f8fafc] cursor-pointer"
                title={isEditing ? "Salvar contato" : "Editar contato"}
                aria-label={isEditing ? `Salvar ${contact.label}` : `Editar ${contact.label}`}
              >
                {isEditing ? "✓" : "↗"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

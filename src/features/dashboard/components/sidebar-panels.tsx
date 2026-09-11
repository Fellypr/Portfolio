"use client";

import Image from "next/image";
import { useState } from "react";

import {
  contacts,
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
  return (
    <section className="h-[168px] w-[385px] rounded-[12px] border border-[#273449] bg-[#111827] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
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

      <div className="mt-[19px] space-y-[17px] px-[22px]">
        {contacts.map((contact) => (
          <div
            key={contact.label}
            className="grid grid-cols-[84px_1fr_12px] items-center"
          >
            <p className="text-[11px] leading-none font-medium text-[#e2e8f0]">
              {contact.label}
            </p>
            <p className="text-[10px] leading-none text-[#cbd5e1]">
              {contact.value}
            </p>
            <span className="text-[13px] leading-none font-medium text-[#94a3b8]">
              ↗
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

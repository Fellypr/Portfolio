import Image from "next/image";

import { contacts, dashboardAssets } from "../dashboard-data";

export function AboutPanel() {
  return (
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

      <div className="mt-[14px] flex px-[20px]">
        <div className = "p-[2px]">
          <div className="flex size-[82px] shrink-0 items-center justify-center rounded-full bg-[#1f2937]">
            <span className="text-[20px] leading-none font-bold text-white">
              LE
            </span>
          </div>
          <button className="ml-[10px] text-[11px] leading-none font-medium whitespace-pre text-[#4f46e5] cursor-pointer">
            {`Editar perfil  ›`}
          </button>
        </div>
        <div className="ml-[20px]">
          <h3 className="text-[15px] leading-none font-semibold text-[#f8fafc]">
            Luiz Emiliano
          </h3>
          <p className="mt-[11px] text-[12px] leading-none font-medium text-[#4f46e5]">
            Desenvolvedor Full Stack
          </p>
          <p className="mt-[14px] text-[11px] leading-[18px] text-[#cbd5e1]">
            Desenvolvedor apaixonado por criar
            <br />
            soluções web modernas, escaláveis
            <br />e com excelente experiência do usuário...
          </p>
        </div>
      </div>
    </section>
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

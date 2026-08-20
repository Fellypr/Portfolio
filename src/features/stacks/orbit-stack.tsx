"use client";

import Image from "next/image";
import { Poppins, Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500"],
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

const skills = [
  {
    id: 1,
    name: "JavaScript",
    shortName: "JS",
    description: "Base para interfaces dinâmicas e experiências web ricas.",
    color: "#40f26e",
    ring: "/imagems/Stacks/icon-ring-js.svg",
    angle: -90,
    relatedIds: [2, 3],
  },
  {
    id: 2,
    name: "TypeScript",
    shortName: "TS",
    description: "Tipagem e previsibilidade para aplicações escaláveis.",
    color: "#40f26e",
    ring: "/imagems/Stacks/icon-ring-ts.svg",
    angle: -150,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    name: "Python",
    shortName: "PY",
    description: "Automação, dados e backends com desenvolvimento ágil.",
    color: "#40f26e",
    ring: "/imagems/Stacks/icon-ring-python.svg",
    angle: -20,
    relatedIds: [1, 2, 5],
  },
  {
    id: 4,
    name: "Java",
    shortName: "JV",
    description: "Soluções robustas para serviços e arquitetura corporativa.",
    color: "#40f26e",
    ring: "/imagems/Stacks/icon-ring-java.svg",
    angle: 135,
    relatedIds: [2, 5],
  },
  {
    id: 5,
    name: "Go",
    shortName: "GO",
    description: "Performance e simplicidade para APIs e sistemas concorrentes.",
    color: "#40f26e",
    ring: "/imagems/Stacks/icon-ring-go.svg",
    angle: 55,
    relatedIds: [3, 4],
  },
];

function SkillOrbitItem({
  id,
  name,
  shortName,
  description,
  color,
  ring,
  x,
  y,
  opacity,
  zIndex,
  isActive,
  isRelated,
  onSelect,
}: (typeof skills)[number] & {
  x: number;
  y: number;
  opacity: number;
  zIndex: number;
  isActive: boolean;
  isRelated: boolean;
  onSelect: (id: number) => void;
}) {
  return (
    <div
      className="absolute h-[72px] w-[120px] cursor-pointer transition-all duration-700 ease-out"
      data-name={`Skill / ${name}`}
      style={{
        opacity: isActive ? 1 : opacity,
        transform: `translate(${x}px, ${y}px)`,
        zIndex: isActive ? 40 : zIndex,
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(id);
      }}
    >
      <div
        className={`absolute top-[-6px] left-[33px] size-[54px] rounded-full transition-opacity duration-300 ${
          isRelated ? "animate-pulse opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle, ${color}57 0%, rgba(15,184,209,0.18) 45%, transparent 72%)`,
        }}
      />

      <div
        className={`absolute top-0 left-[39px] size-[42px] transition-transform duration-300 ${
          isActive ? "scale-125" : isRelated ? "scale-110" : "scale-100"
        }`}
      >
        <Image
          src={ring}
          alt=""
          width={70}
          height={70}
          className="absolute inset-[-14px] size-[70px] max-w-none"
        />
      </div>

      <p
        className={`${poppins.className} absolute top-[51px] left-1/2 w-[120px] -translate-x-1/2 text-center text-[12px] leading-none font-medium transition-all duration-300 ${
          isActive ? "scale-110 text-[#f2fffa]" : "text-[#ccdbe5]"
        }`}
      >
        {name}
      </p>

      <p
        className={`${robotoMono.className} absolute top-3 left-1/2 h-[18px] w-[30px] -translate-x-1/2 text-center text-[12px] leading-normal font-normal`}
        style={{
          backgroundImage: "linear-gradient(133deg, #40f26e 7%, #0fb8d1 93%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {shortName}
      </p>

      {isActive && (
        <div className="absolute top-[82px] left-1/2 z-50 w-[210px] -translate-x-1/2 rounded-[8px] border border-[rgba(15,184,209,0.48)] bg-[rgba(18,19,20,0.94)] p-3 text-center shadow-[0_16px_50px_rgba(0,0,0,0.45),0_0_28px_rgba(64,242,110,0.12)]">
          <p
            className={`${poppins.className} text-[13px] leading-none font-medium`}
            style={{ color: "#f2fffa" }}
          >
            {name}
          </p>
          <p className="mt-2 text-[11px] leading-[1.45] text-[#ccdbe5]">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

export function OrbitStack() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSkillId, setActiveSkillId] = useState<number | null>(null);

  useEffect(() => {
    if (!autoRotate) {
      return;
    }

    const rotationTimer = window.setInterval(() => {
      setRotationAngle((currentAngle) => (currentAngle + 0.3) % 360);
    }, 50);

    return () => {
      window.clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const relatedSkillIds =
    skills.find((skill) => skill.id === activeSkillId)?.relatedIds ?? [];

  function handleSkillSelect(skillId: number) {
    const selectedSkillIndex = skills.findIndex((skill) => skill.id === skillId);
    const selectedSkill = skills[selectedSkillIndex];

    if (!selectedSkill) {
      return;
    }

    if (activeSkillId === skillId) {
      setActiveSkillId(null);
      setAutoRotate(true);
      return;
    }

    setActiveSkillId(skillId);
    setAutoRotate(false);
    setRotationAngle(270 - selectedSkill.angle);
  }

  function handleOrbitReset() {
    setActiveSkillId(null);
    setAutoRotate(true);
  }

  return (
    <div
      className="relative h-[320px] w-[342px] sm:h-[426px] sm:w-[455px]"
      data-node-id="55:2"
      data-name="Programming Skills / Orbit"
      onClick={handleOrbitReset}
    >
      <div className="absolute top-1/2 left-1/2 h-[426px] w-[455px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.75] sm:scale-100">
        <Image
          src="/imagems/Stacks/lifecycle-ring.svg"
          alt=""
          width={340}
          height={340}
          className="absolute top-[56px] left-[57px] size-[340px]"
        />
        <Image
          src="/imagems/Stacks/core-ring.svg"
          alt=""
          width={150}
          height={150}
          className="absolute top-[151px] left-[152px] size-[150px]"
        />
        <Image
          src="/imagems/Stacks/core-glow.svg"
          alt=""
          width={112}
          height={112}
          className="absolute top-[170px] left-[171px] size-[112px]"
        />
        <Image
          src="/imagems/Stacks/gradient-core.svg"
          alt=""
          width={64}
          height={64}
          className="absolute top-[194px] left-[195px] size-16"
        />
        <Image
          src="/imagems/Stacks/core-dot.svg"
          alt=""
          width={54}
          height={56}
          className="absolute top-[198px] left-[201px] h-14 w-[54px]"
        />

        {skills.map((skill) => {
          const angle = (skill.angle + rotationAngle) % 360;
          const radian = (angle * Math.PI) / 180;
          const radius = 190;
          const x = 227.5 + radius * Math.cos(radian) - 60;
          const y = 213 + radius * Math.sin(radian) - 21;
          const zIndex = Math.round(20 + 10 * Math.sin(radian));
          const opacity = Math.max(
            0.45,
            Math.min(1, 0.65 + 0.35 * ((1 + Math.sin(radian)) / 2)),
          );

          return (
            <SkillOrbitItem
              key={skill.name}
              {...skill}
              x={x}
              y={y}
              opacity={opacity}
              zIndex={zIndex}
              isActive={activeSkillId === skill.id}
              isRelated={relatedSkillIds.includes(skill.id)}
              onSelect={handleSkillSelect}
            />
          );
        })}

        <p
          className={`${robotoMono.className} absolute top-[211px] left-[228px] h-5 w-10 -translate-x-1/2 text-center text-[20px] leading-none font-normal text-[#f2fffa]`}
        >
          {"</>"}
        </p>
      </div>
    </div>
  );
}

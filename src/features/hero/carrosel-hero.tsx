"use client";

import { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiHtml5,
  SiCss,
  SiGit,
  SiDocker,
  SiBootstrap,
  SiVuedotjs,
  SiAngular,
  SiPostgresql,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { TbBrandCSharp } from "react-icons/tb";

interface Technology {
  icon: IconType;
  label: string;
  color: string;
}

const technologies: Technology[] = [
  { icon: SiJavascript, label: "JavaScript", color: "#F7DF1E" },
  { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNodedotjs, label: "Node.js", color: "#5FA04E" },
  { icon: SiPython, label: "Python", color: "#3776AB" },
  { icon: TbBrandCSharp, label: "C#", color: "#239120" },
  { icon: SiHtml5, label: "HTML5", color: "#E34F26" },
  { icon: SiCss, label: "CSS3", color: "#1572B6" },
  { icon: SiGit, label: "Git", color: "#F05032" },
  { icon: SiDocker, label: "Docker", color: "#2496ED" },
  { icon: FaAws, label: "AWS", color: "#FF9900" },
  { icon: SiBootstrap, label: "Bootstrap", color: "#7952B3" },
  { icon: SiVuedotjs, label: "Vue.js", color: "#4FC08D" },
  { icon: SiAngular, label: "Angular", color: "#DD0031" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
];

function TechnologyList({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="flex h-full shrink-0 items-center gap-7 pr-7"
    >
      {technologies.map((technology) => {
        const Icon = technology.icon;
        return (
          <div
            key={technology.label}
            className="group flex shrink-0 items-center gap-2.5 rounded-full border border-[rgba(41,61,87,0.5)] bg-[#101726]/60 px-3.5 py-1.5 transition-all duration-200 hover:border-[rgba(51,209,92,0.4)] hover:bg-[#162238] select-none"
          >
            <span
              className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ color: technology.color }}
            >
              <Icon className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium tracking-wide text-[#c2ccdb] transition-colors duration-200 group-hover:text-white">
              {technology.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function CarroselHero() {
  return (
    <div className="absolute top-[811px] left-0 h-16 w-full overflow-hidden border-y border-[rgba(41,61,87,0.7)] bg-[#141c2f]/95 backdrop-blur-sm">
      {/* Máscaras de gradiente nas laterais para suavizar o carrossel infinito */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#141c2f] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#141c2f] to-transparent" />

      <div className="flex h-full overflow-hidden px-4 text-sm leading-none font-medium whitespace-nowrap text-[#c2ccdb]">
        <div className="flex h-full animate-hero-carousel hover:[animation-play-state:paused]">
          <TechnologyList />
          <TechnologyList hidden />
        </div>
      </div>
    </div>
  );
}

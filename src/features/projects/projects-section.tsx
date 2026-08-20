"use client";

import * as React from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const projectCards = [
  {
    id: 1,
    title: "Terminal Finance",
    subtitle: "Dashboard para acompanhar métricas financeiras em tempo real.",
    technologies: ["React", "TypeScript", "Recharts"],
    gradient: "linear-gradient(131deg,#0d2940 14%,#145961 86%)",
  },
  {
    id: 2,
    title: "DevFlow API",
    subtitle: "Backend escalável para automações e integrações internas.",
    technologies: ["Node.js", "NestJS", "PostgreSQL"],
    gradient: "linear-gradient(130deg,#1f1747 14%,#2e5275 86%)",
  },
  {
    id: 3,
    title: "Studio Commerce",
    subtitle: "Experiência de compra rápida com vitrine responsiva.",
    technologies: ["Next.js", "Tailwind", "Stripe"],
    gradient: "linear-gradient(129deg,#0a2e57 14%,#26757a 86%)",
  },
  {
    id: 4,
    title: "Título do projeto",
    subtitle: "Subtítulo ou breve descrição do projeto",
    technologies: ["React", "TypeScript", "Node.js"],
    gradient: "linear-gradient(135deg,#172e5c 14%,#1aad85 86%)",
  },
  {
    id: 5,
    title: "Insight CRM",
    subtitle: "Pipeline comercial com filtros, relatórios e visão executiva.",
    technologies: ["React", "Prisma", "MongoDB"],
    gradient: "linear-gradient(129deg,#2e1c52 14%,#2e7394 86%)",
  },
  {
    id: 6,
    title: "Ops Monitor",
    subtitle: "Painel operacional para alertas, filas e saúde de serviços.",
    technologies: ["TypeScript", "Go", "Docker"],
    gradient: "linear-gradient(130deg,#4d1a2e 14%,#8a4029 86%)",
  },
  {
    id: 7,
    title: "Portfolio Lab",
    subtitle: "Experimentos visuais com componentes e microinterações.",
    technologies: ["Next.js", "CSS", "Figma"],
    gradient: "linear-gradient(131deg,#142b47 14%,#3d576b 86%)",
  },
];

const slotOffsets = [0, 300, 530, 730];
const slotY = [0, 10, 15, 20];
const slotScaleX = [1, 0.6875, 0.625, 0.5625];
const slotScaleY = [1, 0.84375, 0.75, 0.65625];
const slotOpacity = [1, 0.84, 0.72, 0.55];

function interpolateSlot(values: number[], distance: number) {
  const startIndex = Math.min(Math.floor(distance), values.length - 1);
  const endIndex = Math.min(startIndex + 1, values.length - 1);
  const progress = distance - startIndex;

  return values[startIndex] + (values[endIndex] - values[startIndex]) * progress;
}

export function ProjectsSection() {
  const count = projectCards.length;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(3);
  const targetRef = React.useRef(3);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selected, setSelected] = React.useState(3);
  const selectedProject = projectCards[selected];

  const indexAt = React.useCallback(
    (pos: number) => ((Math.round(pos) % count) + count) % count,
    [count],
  );

  const clamp = React.useCallback((pos: number) => pos, []);

  const paint = React.useCallback(() => {
    const pos = posRef.current;

    cardRefs.current.forEach((card, index) => {
      if (!card) {
        return;
      }

      let offset = index - pos;
      offset = ((offset % count) + count) % count;
      if (offset > count / 2) {
        offset -= count;
      }

      const distance = Math.abs(offset);
      const cappedDistance = Math.min(distance, 3);
      const direction = Math.sign(offset);
      const x = direction * interpolateSlot(slotOffsets, cappedDistance);
      const y = interpolateSlot(slotY, cappedDistance);
      const scaleX = interpolateSlot(slotScaleX, cappedDistance);
      const scaleY = interpolateSlot(slotScaleY, cappedDistance);
      const opacity = interpolateSlot(slotOpacity, cappedDistance);
      const borderOpacity =
        distance < 0.5 ? 0.85 : Math.max(0.35, 0.58 - cappedDistance * 0.08);
      const shadowOpacity = Math.max(0, 0.2 - cappedDistance * 0.08);

      card.style.transform =
        `translate(-50%, -50%) translateX(${x}px) translateY(${y}px) ` +
        `scale(${scaleX}, ${scaleY})`;
      card.style.opacity = String(opacity);
      card.style.zIndex = String(100 - Math.round(distance * 10));
      card.style.borderWidth = distance < 0.5 ? "2px" : "1px";
      card.style.borderColor = `rgba(87,122,158,${borderOpacity})`;
      card.style.boxShadow = `0 8px 28px rgba(20,229,148,${shadowOpacity})`;
    });
  }, [count]);

  const settle = React.useCallback(
    (target: number) => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      targetRef.current = target;
      setSelected(indexAt(target));

      const step = () => {
        const remaining = target - posRef.current;

        if (Math.abs(remaining) < 0.0004) {
          posRef.current = target;
          paint();
          rafRef.current = null;
          return;
        }

        posRef.current += remaining * 0.16;
        paint();
        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    },
    [indexAt, paint],
  );

  const goTo = React.useCallback(
    (index: number) => {
      const target =
        index + Math.round((targetRef.current - index) / count) * count;
      settle(clamp(target));
    },
    [clamp, count, settle],
  );

  const nudge = React.useCallback(
    (by: number) => settle(clamp(Math.round(targetRef.current) + by)),
    [clamp, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    targetRef.current = posRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      pos: posRef.current,
      v: 0,
      t: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.id !== event.pointerId) {
      return;
    }

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / 250);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) {
      setSelected(index);
    }

    paint();
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;

    if (!drag || drag.id !== event.pointerId) {
      return;
    }

    dragRef.current = null;
    const carried = Math.max(-2, Math.min(2, drag.v * 0.18));
    settle(clamp(Math.round(posRef.current + carried)));
  };

  useIsoLayoutEffect(() => {
    paint();

    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const observer = new ResizeObserver(paint);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [paint]);

  React.useEffect(
    () => () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    },
    [],
  );

  return (
    <section
      id="projects"
      className={`${poppins.className} relative overflow-hidden bg-[#020912] bg-[url('/imagems/Projects/fundo.png')] bg-cover bg-center text-white`}
      data-node-id="39:2"
      data-name="Projects / Showcase Carousel"
    >
      <div className="relative mx-auto h-[640px] w-full max-w-[1440px] overflow-hidden sm:h-[720px] lg:h-[811px]">
        <p className="absolute top-[70px] left-5 text-[16px] leading-6 font-medium whitespace-pre-wrap text-[#40f26e] sm:left-8 lg:top-[95px] lg:left-[80px]">
          {"—  03 // Projetos"}
        </p>

        <div
          ref={frameRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Projetos"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              nudge(-1);
            } else if (event.key === "ArrowRight") {
              event.preventDefault();
              nudge(1);
            }
          }}
          className="absolute top-[166px] left-1/2 h-[360px] w-[1440px] origin-top -translate-x-1/2 scale-[0.58] cursor-grab touch-pan-y outline-none active:cursor-grabbing sm:top-[190px] sm:scale-[0.75] lg:top-0 lg:scale-100"
        >
          {projectCards.map((project) => (
            <div
              key={project.id}
              ref={(node) => {
                cardRefs.current[project.id - 1] = node;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${project.id} de ${count}`}
              aria-current={selected === project.id - 1}
              onClick={() => goTo(project.id - 1)}
              className="absolute top-[369px] left-[710px] size-[320px] rounded-[14px] border border-[rgba(87,122,158,0.35)] transition-[border-color,box-shadow] duration-300 will-change-transform"
              style={{ backgroundImage: project.gradient }}
              data-project-id={project.id}
              data-name={`Project ${String(project.id).padStart(2, "0")}${
                project.id === selected + 1 ? " / Featured" : ""
              }`}
            />
          ))}
        </div>

        <div
          className="absolute top-[445px] left-1/2 flex w-[320px] -translate-x-1/2 flex-col items-center gap-2 overflow-hidden text-center sm:top-[510px] lg:top-[563px]"
          data-name="Project / Featured Details"
        >
          <h2 className="text-[24px] leading-normal font-semibold whitespace-nowrap text-[#f5faff]">
            {selectedProject.title}
          </h2>

          <p className="text-[14px] leading-normal font-normal whitespace-wrap text-[#9eb2c9]">
            {selectedProject.subtitle}
          </p>

          <p className="text-[11px] leading-normal font-medium tracking-[1.1px] whitespace-nowrap text-[#2edb85]">
            TECNOLOGIAS UTILIZADAS
          </p>

          <div
            className="flex items-center gap-2 overflow-hidden pt-1"
            data-name="Project / Technologies"
          >
            {selectedProject.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-[14px] border border-[rgba(31,148,107,0.75)] bg-[rgba(10,26,43,0.88)] px-[11px] py-1.5 text-[11px] leading-normal font-medium whitespace-nowrap text-[#b8e0d1]"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

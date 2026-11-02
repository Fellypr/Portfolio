"use client";

import * as React from "react";
import { Poppins } from "next/font/google";
import { useDashboardProjects } from "@/features/dashboard/hooks/use-dashboard-projects";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

const GRADIENTS = [
  "linear-gradient(131deg,#0d2940 14%,#145961 86%)",
  "linear-gradient(130deg,#1f1747 14%,#2e5275 86%)",
  "linear-gradient(129deg,#0a2e57 14%,#26757a 86%)",
  "linear-gradient(135deg,#172e5c 14%,#1aad85 86%)",
  "linear-gradient(129deg,#2e1c52 14%,#2e7394 86%)",
  "linear-gradient(130deg,#4d1a2e 14%,#8a4029 86%)",
  "linear-gradient(131deg,#142b47 14%,#3d576b 86%)",
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
  const { projects, loading, error } = useDashboardProjects();

  const projectCards = React.useMemo(() => {
    return projects.map((p, i) => ({
      id: p.id ?? i + 1,
      title: p.titleProject ?? "Sem título",
      subtitle: p.description ?? "",
      technologies: p.technologies
        ? p.technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      urlImage: p.urlImage || null,
      fallbackGradient: GRADIENTS[i % GRADIENTS.length],
      websiteUrl: p.websiteUrl || "#",
      githubUrl: p.githubUrl || "https://github.com",
    }));
  }, [projects]);

  const count = projectCards.length;
  const frameRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const posRef = React.useRef(0);
  const targetRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const dragRef = React.useRef<{
    id: number;
    x: number;
    pos: number;
    v: number;
    t: number;
  } | null>(null);

  const [selectedOverride, setSelectedOverride] = React.useState<number | null>(null);

  const selected = React.useMemo(() => {
    if (count === 0) return 0;
    if (selectedOverride !== null && selectedOverride < count) {
      return selectedOverride;
    }
    return Math.min(3, count - 1);
  }, [count, selectedOverride]);

  const selectedProject = count > 0 && selected < count ? projectCards[selected] : null;

  const indexAt = React.useCallback(
    (pos: number) => {
      if (count === 0) return 0;
      return ((Math.round(pos) % count) + count) % count;
    },
    [count],
  );

  const clamp = React.useCallback((pos: number) => pos, []);

  const paint = React.useCallback(() => {
    if (count === 0) return;
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
      if (count === 0) return;

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      targetRef.current = target;
      setSelectedOverride(indexAt(target));

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
    [count, indexAt, paint],
  );

  const goTo = React.useCallback(
    (index: number) => {
      if (count === 0) return;
      const target =
        index + Math.round((targetRef.current - index) / count) * count;
      settle(clamp(target));
    },
    [clamp, count, settle],
  );

  const nudge = React.useCallback(
    (by: number) => {
      if (count === 0) return;
      settle(clamp(Math.round(targetRef.current) + by));
    },
    [clamp, count, settle],
  );

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (count === 0) return;

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

    if (!drag || drag.id !== event.pointerId || count === 0) {
      return;
    }

    const now = performance.now();
    const previous = posRef.current;
    posRef.current = clamp(drag.pos - (event.clientX - drag.x) / 250);
    drag.v = ((posRef.current - previous) / Math.max(now - drag.t, 1)) * 1000;
    drag.t = now;

    const index = indexAt(posRef.current);
    if (index !== selected) {
      setSelectedOverride(index);
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
    if (count > 0) {
      const initial = Math.min(3, count - 1);
      posRef.current = initial;
      targetRef.current = initial;
    }
    paint();

    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const observer = new ResizeObserver(paint);
    observer.observe(frame);

    return () => observer.disconnect();
  }, [count, paint]);

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

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#9eb2c9] text-sm animate-pulse">
              Carregando projetos...
            </span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#f87171] text-sm">{error}</span>
          </div>
        )}

        {!loading && !error && count === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#9eb2c9] text-sm">
              Nenhum projeto encontrado.
            </span>
          </div>
        )}

        {!loading && !error && count > 0 && (
          <>
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
              {projectCards.map((project, index) => (
                <img
                  src={project.urlImage ?? undefined}
                  alt={project.title}
                  style={{
                    background: project.fallbackGradient,
                  }}
                  key={project.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} de ${count}`}
                  aria-current={selected === index}
                  onClick={() => goTo(index)}
                  className="absolute top-[369px] left-[710px] max-w-[350px] max-h-[250px]
                  min-w-[450px] min-h-[250px] rounded-[14px] border border-[rgba(66,66,66,0.35)] bg-no-repeat bg-cover bg-center transition-[border-color,box-shadow] duration-300 will-change-transform"
      
                  data-project-id={project.id}
                  data-name={`Project ${String(index + 1).padStart(2, "0")}${
                    index === selected ? " / Featured" : ""
                  }`}
                />
              ))}
            </div>

            {selectedProject && (
              <div
                className="absolute top-[245px] left-1/2 flex w-205 -translate-x-1/2 flex-col items-center gap-2 overflow-hidden text-center sm:top-[310px] lg:top-[500px] p-2"
                data-name="Project / Featured Details"
              >
                <h2 className="text-[24px] leading-normal font-semibold whitespace-nowrap text-[#f5faff]">
                  {selectedProject.title}
                </h2>

                <p className="text-[14px] leading-normal font-normal whitespace-wrap text-[#9eb2c9]">
                  {selectedProject.subtitle}
                </p>

                {selectedProject.technologies.length > 0 && (
                  <>
                    <p className="text-[11px] leading-normal font-medium tracking-[1.1px] whitespace-nowrap text-[#2edb85]">
                      TECNOLOGIAS UTILIZADAS
                    </p>

                    <div
                      className="flex items-center gap-2 overflow-hidden pt-1 flex-wrap justify-center"
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
                  </>
                )}

                <div
                  className="mt-2 flex items-center justify-center gap-3 pt-2"
                  data-name="Project / Actions"
                >
                  <a
                    href={selectedProject.websiteUrl || "#"}
                    target={
                      selectedProject.websiteUrl && selectedProject.websiteUrl !== "#"
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="flex h-[38px] items-center justify-center gap-2 rounded-[8px] bg-[#2ed657] px-4 text-[13px] font-medium text-[#05140a] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#3af06a] hover:shadow-[0_0_16px_rgba(46,214,87,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2ed657]"
                  >
                    <span>Visitar Site</span>
                    <svg
                      className="size-4 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </a>

                  <a
                    href={selectedProject.githubUrl || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-[38px] items-center justify-center gap-2 rounded-[8px] border border-[#374151] bg-[#24292e] px-4 text-[13px] font-medium text-[#f0f6fc] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#40f26e] hover:bg-[#2f363d] hover:text-white hover:shadow-[0_0_16px_rgba(36,41,46,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#40f26e]"
                  >
                    <svg
                      className="size-4 shrink-0 fill-current text-white"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const projectCards = [
  {
    id: 1,
    className:
      "left-[-100px] top-[284px] h-[210px] w-[180px] opacity-55 bg-[linear-gradient(131deg,#0d2940_14%,#145961_86%)]",
  },
  {
    id: 2,
    className:
      "left-[80px] top-[264px] h-[240px] w-[200px] opacity-72 bg-[linear-gradient(130deg,#1f1747_14%,#2e5275_86%)]",
  },
  {
    id: 3,
    className:
      "left-[300px] top-[244px] h-[270px] w-[220px] opacity-84 bg-[linear-gradient(129deg,#0a2e57_14%,#26757a_86%)]",
  },
  {
    id: 4,
    className:
      "left-[550px] top-[209px] size-[320px] border-2 border-[rgba(87,122,158,0.85)] bg-[linear-gradient(135deg,#172e5c_14%,#1aad85_86%)] opacity-100 shadow-[0_8px_28px_rgba(20,229,148,0.2)]",
    featured: true,
  },
  {
    id: 5,
    className:
      "left-[900px] top-[244px] h-[270px] w-[220px] opacity-84 bg-[linear-gradient(129deg,#2e1c52_14%,#2e7394_86%)]",
  },
  {
    id: 6,
    className:
      "left-[1140px] top-[264px] h-[240px] w-[200px] opacity-72 bg-[linear-gradient(130deg,#4d1a2e_14%,#8a4029_86%)]",
  },
  {
    id: 7,
    className:
      "left-[1360px] top-[284px] h-[210px] w-[180px] opacity-55 bg-[linear-gradient(131deg,#142b47_14%,#3d576b_86%)]",
  },
];

const technologies = ["React", "TypeScript", "Node.js"];

export function ProjectsSection() {
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

        <div className="absolute top-[166px] left-1/2 h-[360px] w-[1440px] origin-top -translate-x-1/2 scale-[0.58] sm:top-[190px] sm:scale-[0.75] lg:top-0 lg:scale-100">
          {projectCards.map((project) => (
            <div
              key={project.id}
              className={`absolute rounded-[14px] border border-[rgba(87,122,158,0.35)] ${project.className}`}
              data-name={`Project ${String(project.id).padStart(2, "0")}${project.featured ? " / Featured" : ""}`}
            />
          ))}
        </div>

        <div
          className="absolute top-[445px] left-1/2 flex w-[320px] -translate-x-1/2 flex-col items-center gap-2 overflow-hidden text-center sm:top-[510px] lg:top-[563px]"
          data-name="Project / Featured Details"
        >
          <h2 className="text-[24px] leading-normal font-semibold whitespace-nowrap text-[#f5faff]">
            Título do projeto
          </h2>

          <p className="text-[14px] leading-normal font-normal whitespace-nowrap text-[#9eb2c9]">
            Subtítulo ou breve descrição do projeto
          </p>

          <p className="text-[11px] leading-normal font-medium tracking-[1.1px] whitespace-nowrap text-[#2edb85]">
            TECNOLOGIAS UTILIZADAS
          </p>

          <div
            className="flex items-center gap-2 overflow-hidden pt-1"
            data-name="Project / Technologies"
          >
            {technologies.map((technology) => (
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

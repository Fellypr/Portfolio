const technologies = [
  { icon: "JS", label: "JavaScript", color: "#f7d11f" },
  { icon: "⚛", label: "React", color: "#33c2f0" },
  { icon: "⬡", label: "Node.js", color: "#4dba52" },
  { icon: "Py", label: "Python", color: "#408ce0" },
  { icon: "5", label: "HTML5", color: "#f25421" },
  { icon: "3", label: "CSS3", color: "#297ae8" },
  { icon: "S", label: "SASS", color: "#d1458c" },
  { icon: "◆", label: "Git", color: "#f04a29" },
  { icon: "▰", label: "Docker", color: "#2999e8" },
  { icon: "aws", label: "AWS", color: "#ff9926" },
  { icon: "B", label: "Bootstrap", color: "#7847e8" },
  { icon: "V", label: "Vue.js", color: "#40bf85" },
  { icon: "A", label: "Angular", color: "#e32138" },
  { icon: "DB", label: "PostgreSQL", color: "#336bad" },
];

function TechnologyList({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden}
      className="flex h-full shrink-0 items-center gap-[34px] pr-[34px]"
    >
      {technologies.map((technology) => (
        <span key={technology.label} className="shrink-0">
          <span style={{ color: technology.color }}>{technology.icon}</span>
          <span>{`  ${technology.label}`}</span>
        </span>
      ))}
    </div>
  );
}

export function CarroselHero() {
  return (
    <div className="absolute top-[811px] left-0 h-16 w-full overflow-hidden border border-[rgba(41,61,87,0.7)] bg-[#141c2f]">
      <div className="flex h-full overflow-hidden px-6 text-sm leading-none font-medium whitespace-nowrap text-[#c2ccdb]">
        <div className="flex h-full animate-hero-carousel">
          <TechnologyList />
          <TechnologyList hidden />
        </div>
      </div>
    </div>
  );
}

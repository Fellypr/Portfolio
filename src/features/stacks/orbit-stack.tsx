import Image from "next/image";
import { Poppins, Roboto_Mono } from "next/font/google";

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
    name: "JavaScript",
    shortName: "JS",
    color: "#f2c71f",
    ring: "/imagems/Stacks/icon-ring-js.svg",
    className: "left-[168px] top-0",
  },
  {
    name: "TypeScript",
    shortName: "TS",
    color: "#2e8ceb",
    ring: "/imagems/Stacks/icon-ring-ts.svg",
    className: "left-0 top-[103px]",
  },
  {
    name: "Python",
    shortName: "PY",
    color: "#4dabe0",
    ring: "/imagems/Stacks/icon-ring-python.svg",
    className: "left-[335px] top-[145px]",
  },
  {
    name: "Java",
    shortName: "JV",
    color: "#f06129",
    ring: "/imagems/Stacks/icon-ring-java.svg",
    className: "left-[38px] top-[334px]",
  },
  {
    name: "Go",
    shortName: "GO",
    color: "#14b8c7",
    ring: "/imagems/Stacks/icon-ring-go.svg",
    className: "left-[278px] top-[354px]",
  },
];

function SkillOrbitItem({
  name,
  shortName,
  color,
  ring,
  className,
}: (typeof skills)[number]) {
  return (
    <div
      className={`absolute h-[72px] w-[120px] ${className}`}
      data-name={`Skill / ${name}`}
    >
      <div className="absolute top-0 left-[39px] size-[42px]">
        <Image
          src={ring}
          alt=""
          width={70}
          height={70}
          className="absolute inset-[-14px] size-[70px] max-w-none"
        />
      </div>

      <p
        className={`${poppins.className} absolute top-[51px] left-1/2 w-[120px] -translate-x-1/2 text-center text-[12px] leading-none font-medium text-[#d1deeb]`}
      >
        {name}
      </p>

      <p
        className={`${robotoMono.className} absolute top-3 left-1/2 h-[18px] w-[30px] -translate-x-1/2 text-center text-[12px] leading-normal font-normal`}
        style={{ color }}
      >
        {shortName}
      </p>
    </div>
  );
}

export function OrbitStack() {
  return (
    <div
      className="relative h-[320px] w-[342px] sm:h-[426px] sm:w-[455px]"
      data-node-id="55:2"
      data-name="Programming Skills / Orbit"
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

        {skills.map((skill) => (
          <SkillOrbitItem key={skill.name} {...skill} />
        ))}

        <p
          className={`${robotoMono.className} absolute top-[211px] left-[228px] h-5 w-10 -translate-x-1/2 text-center text-[20px] leading-none font-normal text-[#e5f2ff]`}
        >
          {"</>"}
        </p>
      </div>
    </div>
  );
}

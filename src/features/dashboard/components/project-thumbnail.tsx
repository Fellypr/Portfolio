import type { DashboardProject } from "../dashboard-data";

type ProjectThumbnailProps = {
  variant: DashboardProject["thumbnail"];
};

export function ProjectThumbnail({ variant }: ProjectThumbnailProps) {
  if (variant === "finance") {
    return (
      <div className="relative h-[112px] w-[185px] shrink-0 overflow-hidden rounded-[10px] bg-[#132b21]">
        <div className="absolute top-[14px] left-[15px] h-[80px] w-[155px] rounded-[4px] border border-[#315144] bg-[#111827]" />
        <div className="absolute top-[22px] left-[23px] h-[64px] w-[25px] rounded-[2px] bg-[#193b2a]" />
        <div className="absolute top-[50px] left-[56px] h-[2px] w-[100px] rounded-[1px] bg-[#a7d8b6]" />
      </div>
    );
  }

  if (variant === "figma") {
    return (
      <div className="relative h-[112px] w-[185px] shrink-0 overflow-hidden rounded-[10px] bg-[#46219a]">
        <p className="absolute top-[25px] left-[14px] text-[13px] leading-[18px] font-bold whitespace-nowrap text-white">
          Web Section
          <br />
          to Figma
        </p>
        <div className="absolute top-[16px] left-[113px] h-[62px] w-[50px] rounded-[4px] bg-[#8b5cf6]" />
      </div>
    );
  }

  return (
    <div className="relative h-[112px] w-[185px] shrink-0 overflow-hidden rounded-[10px] bg-[#11163d]">
      <p className="absolute top-[26px] left-[32px] text-[18px] leading-[21px] font-bold whitespace-nowrap text-white">
        DEV
        <br />
        QUEST
      </p>
      <div className="absolute top-[22px] left-[126px] h-[52px] w-[36px] rounded-[8px] bg-[#4f46e5]" />
    </div>
  );
}

import { ButtonProps } from "../Types";
import { GrProjects } from "react-icons/gr";

export default function ProjectLink({ children }: ButtonProps) {
  return (
    <div className="text-sm px-4 text-blue-950 py-1.5 md:w-[150px] w-[230px] rounded-md">
      <div className="flex items-center gap-x-2  ">
        <GrProjects className="text-sm" />
        <p className="font-semibold">{children}</p>
      </div>
    </div>
  );
}

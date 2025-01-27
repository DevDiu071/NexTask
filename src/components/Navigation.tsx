import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import ProjectLink from "./ProjectLink";
import { ProjectsPropStructure } from "../Types";
import { MdDeleteForever } from "react-icons/md";
import clsx from "clsx";

export interface ProjectProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projects: ProjectsPropStructure[];
  toggleNav: boolean;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
}

export default function Navigation({
  projects,
  setModalOpen,
  setTaskData,
  setProjects,
  toggleNav,
}: ProjectProps) {
  const navigate = useNavigate();
  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id));
    navigate(`/${projects[0].name}`);
  };

  return (
    <>
      <div className="hidden md:flex flex-col items-center border-r md:px-2">
        <Logo />
        <div className="flex flex-col gap-y-2 mb-4 project-link">
          {projects?.map((project) => (
            <NavLink
              to={`${project.name}`}
              key={project.id}
              className="group bg-gray-100 rounded-md flex items-center"
              onClick={() => setTaskData(project)}
            >
              <ProjectLink key={project.id}>
                {project.name.slice(0, 13)}...
              </ProjectLink>
              <MdDeleteForever
                onClick={() => handleDeleteProject(project.id)}
                className="group-hover opacity-0 group-hover:opacity-100 pr-3 text-[30px]"
              />
            </NavLink>
          ))}
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="text-sm bg-blue-700 w-[175px]  text-white py-1.5 px-8 rounded-md"
        >
          Create Board
        </button>
      </div>

      <div
        className={clsx(
          "md:hidden transition-all bg-white border-b pt-[400px] w-full h-screen absolute  pb-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center flex flex-col items-center",
          { "-top-[300px]": !toggleNav, "top-4": toggleNav }
        )}
      >
        <div className="flex flex-col gap-y-2 mb-4 project-link mt-10">
          {projects?.map((project) => (
            <NavLink
              to={`${project.name}`}
              key={project.id}
              className="group bg-gray-100 rounded-md flex items-center"
              onClick={() => setTaskData(project)}
            >
              <ProjectLink key={project.id}>
                {project.name.slice(0, 13)}...
              </ProjectLink>
              <MdDeleteForever
                onClick={() => handleDeleteProject(project.id)}
                className="group-hover opacity-0 group-hover:opacity-100 pr-3 text-[30px]"
              />
            </NavLink>
          ))}
          <button
            onClick={() => setModalOpen(true)}
            className="text-sm bg-blue-700 w-[260px]  text-white py-1.5 px-8 rounded-md"
          >
            Create Board
          </button>
        </div>
      </div>
    </>
  );
}

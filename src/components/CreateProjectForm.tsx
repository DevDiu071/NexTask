import { FieldErrors, useForm } from "react-hook-form";
import {
  ProjectFormProps,
  ProjectProps,
  ProjectsPropStructure,
} from "../Types";

interface formProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
  projects: ProjectsPropStructure[];
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  updated: boolean;
}

export default function CreateProjectForm({
  setProjects,
  setModalOpen,
  setTaskData,
  projects,
  setUpdated,
  updated,
}: formProps) {
  const { register, handleSubmit } = useForm<ProjectProps>();

  const handleForm = function (data: ProjectFormProps) {
    console.log(data, data.name);
    if (projects.length === 5) {
      alert("Number of projects exceeded!");
      return;
    }
    setProjects((prevState) => [
      ...prevState,
      {
        name: data.name,
        id: Math.random(),
        todos: [],
        inProgress: [],
        done: [],
      },
    ]);
    if (updated === false)
      setTaskData({
        name: data.name,
        id: Math.random(),
        todos: [],
        inProgress: [],
        done: [],
      });
    setModalOpen(false);
    setUpdated(true);
  };

  const handleError = function (error: FieldErrors<ProjectFormProps>) {
    console.log(error);
  };
  return (
    <form
      onSubmit={handleSubmit(handleForm, handleError)}
      className="absolute top-[120px] rounded-md right-0 flex flex-col max-w-[500px] box-shadow h-[160px] bg-white shadow-lg p-4 inset-0 mx-3 md:mx-auto"
    >
      <label>Your project name</label>
      <input
        type="text"
        id="project"
        placeholder="Project name"
        required
        className="w-full py-1.5 px-4 rounded-md border mt-1.5"
        {...register("name", { required: "Should not be blank" })}
      />
      <div className="flex justify-end">
        <button className="text-sm bg-blue-600 py-1.5 px-8 text-white rounded-md mt-6">
          Submit
        </button>
      </div>
    </form>
  );
}

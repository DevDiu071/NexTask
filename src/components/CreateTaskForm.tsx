import { useForm } from "react-hook-form";
import { ProjectsPropStructure } from "../Types";
import { useNavigate } from "react-router-dom";
import { TodoType } from "../App";
import { useEffect } from "react";

interface TaskFormProps {
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  projects: ProjectsPropStructure[];
  startEdit: boolean;
  edit: TodoType | undefined;
  setEdit: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
  setStartEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
}

interface FormData {
  name: string;
  detail: string;
  project: string;
  id: number;
  todos: TodoType[];
  inProgress: TodoType[];
  done: TodoType[];
}

export default function CreateTaskForm({
  setTaskModalOpen,
  projects,
  setTaskData,
  setProjects,
  setStartEdit,
  startEdit,
  setEdit,
  edit,
}: TaskFormProps) {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const navigate = useNavigate();

  useEffect(() => {
    if (startEdit && edit) {
      setValue("name", edit.name);
      setValue("detail", edit.detail);
      setValue("project", edit.project);
    }
  }, [startEdit, edit, setValue]);

  const submit = function (data: FormData) {
    console.log(data);
    if (startEdit && edit) {
      setProjects((prevState) => {
        const updatedProjects = prevState.map((project) =>
          project.name === data.project
            ? {
                ...project,
                todos: project.todos.map((todo) =>
                  todo.id === edit.id ? { ...todo, ...data } : todo
                ),
              }
            : project
        );

        const currentProject = updatedProjects.find(
          (project) => project.name === data.project
        );
        if (currentProject) {
          setTaskData(currentProject);
          navigate(`/${data.project}`);
        }
        reset();
        return updatedProjects;
      });
      setStartEdit(false);
      setEdit(undefined);
    } else {
      setProjects((prevState) => {
        const updatedProjects = prevState.map((project) =>
          project.name === data.project
            ? {
                ...project,
                todos: [
                  ...project.todos,
                  {
                    ...data,
                    completed: false,
                    column: "todo",
                    id: Math.random(),
                  } as TodoType,
                ],
              }
            : project
        );

        // Update the taskData state to reflect the changes in the current project
        const currentProject = updatedProjects.find(
          (project) => project.name === data.project
        );
        if (currentProject) {
          setTaskData(currentProject);
          navigate(`/${data.project}`);
        }

        return updatedProjects;
      });
    }

    setTaskModalOpen(false);
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="absolute top-[120px] rounded-md right-0 flex flex-col max-w-[500px] h-[350px] bg-white shadow mx-3 p-4 inset-0 md:mx-auto"
    >
      <label className="text-gray-600 text-md">Task name</label>
      <input
        type="text"
        id="project"
        placeholder="Task name"
        className="w-full py-1.5 px-4 rounded-md border mt-1"
        required
        {...register("name")}
      />
      <label className="text-gray-600 text-md mt-2">Choose project</label>
      <select
        className="border mt-1 py-1.5 px-4 rounded-md"
        required
        {...register("project")}
      >
        {projects.map((project) => (
          <option key={project.id} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
      <label className="text-gray-600 mt-2">Task detail</label>
      <textarea
        id="project"
        placeholder="Project name"
        className="w-full py-1.5 px-4 rounded-md border mt-1 resize-none"
        rows={3}
        required
        {...register("detail")}
      />
      <div className="flex justify-end">
        <button className="text-sm bg-blue-600 py-1.5 px-8 text-white rounded-md mt-6">
          {startEdit ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

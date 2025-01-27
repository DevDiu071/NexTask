import { useParams } from "react-router-dom";
import Done from "./Done";
import InProgress from "./InProgress";
import Todo from "./Todo";
import { useEffect } from "react";
import { ProjectsPropStructure } from "../Types";
import { TodoType } from "../App";

export interface TaskCompProps {
  setParamName: React.Dispatch<React.SetStateAction<string>>;
  projects: ProjectsPropStructure[];
  taskData: Partial<ProjectsPropStructure>;
  startEdit: boolean;
  setStartEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
}

export default function TaskComp({
  projects,
  setParamName,
  taskData,
  setTaskData,
  setProjects,
  setTaskModalOpen,
  setEdit,
  setStartEdit,
}: // startEdit,
TaskCompProps) {
  const { projectName } = useParams();

  useEffect(
    function () {
      setParamName(projectName ?? "");
      if (projects.length === 0) {
        window.location.href = "/";
      }
    },
    [projectName, setParamName, projects]
  );

  if (
    taskData.todos &&
    taskData.todos.length === 0 &&
    taskData.inProgress &&
    taskData.inProgress.length === 0 &&
    taskData.done &&
    taskData.done.length === 0
  )
    return (
      <p className="text-md text-blue-900 text-center font-semibold mt-[90px]">
        Start by adding a Task!
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-x-4 mt-6 ">
      {taskData.todos && taskData.todos.length > 0 && (
        <Todo
          taskData={taskData}
          setTaskData={setTaskData}
          setProjects={setProjects}
          setTaskModalOpen={setTaskModalOpen}
          setEdit={setEdit}
          setStartEdit={setStartEdit}
        />
      )}
      {taskData.inProgress && taskData.inProgress.length > 0 && (
        <InProgress
          taskData={taskData}
          setProjects={setProjects}
          setTaskData={setTaskData}
        />
      )}
      {taskData.done && taskData.done.length > 0 && (
        <Done
          taskData={taskData}
          setProjects={setProjects}
          setTaskData={setTaskData}
          setTaskModalOpen={setTaskModalOpen}
          setEdit={setEdit}
          setStartEdit={setStartEdit}
        />
      )}
    </div>
  );
}

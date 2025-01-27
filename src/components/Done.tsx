import { RiDeleteBin6Line } from "react-icons/ri";
import { ProjectsPropStructure } from "../Types";
import { FaTasks } from "react-icons/fa";
import { GoCheckbox } from "react-icons/go";
import { TodoType } from "../App";

interface DoneProps {
  taskData: Partial<ProjectsPropStructure>;
  setStartEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
}

export default function Done({
  taskData,
  setProjects,
  setTaskData,
}: DoneProps) {
  const handleDelete = function (id: number) {
    const filterDoneOut =
      taskData.done && taskData.done.filter((done) => done.id != id);

    setTaskData((prev) => ({
      ...prev,
      done: filterDoneOut || [],
    }));

    setProjects((prevState) => {
      return prevState.map((project) =>
        project.id === taskData.id
          ? {
              ...project,
              done: project.done?.filter((done) => done.id !== id) || [],
            }
          : project
      );
    });
  };

  return (
    <div className="bg-blue-100 py-3 px-3 rounded-md mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <GoCheckbox className="text-xl" />
        <h2 className="text-xl font-semibold">Done</h2>
      </div>
      <div className="flex flex-col gap-y-3">
        {taskData.done?.map((done) => (
          <div key={done.id} className="bg-slate-50 px-4 pb-2 pt-1 rounded-md ">
            <div className="flex justify-between items-center mt-2">
              <FaTasks />
              <div className="flex items-center gap-x-2">
                <RiDeleteBin6Line
                  className="cursor-pointer"
                  onClick={() => handleDelete(done.id)}
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold mt-2">{done.name}</p>
              <p className="text-sm">{done.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

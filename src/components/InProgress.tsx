import { RiDeleteBin6Line } from "react-icons/ri";
import { ProjectsPropStructure } from "../Types";
import { FaTasks } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";

interface InProgressProp {
  taskData: Partial<ProjectsPropStructure>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
}

export default function InProgress({
  taskData,
  setTaskData,
  setProjects,
}: InProgressProp) {
  const handleDone = function (id: number) {
    const filterInprogress =
      taskData.inProgress &&
      taskData.inProgress.filter((progress) => progress.id === id);

    if (filterInprogress && filterInprogress.length > 0) {
      setTaskData((prev) => ({
        ...prev,
        done: [...(prev.done || []), ...filterInprogress],
        inProgress:
          prev.inProgress?.filter((progress) => progress.id !== id) || [],
      }));

      setProjects((prevState) => {
        return prevState.map((project) =>
          project.id === taskData.id
            ? {
                ...project,
                done: [...(project.done || []), ...filterInprogress],
                inProgress:
                  project.todos?.filter((progress) => progress.id !== id) || [],
              }
            : project
        );
      });
    }
  };

  const handleDelete = function (id: number) {
    const filterInProgressOut =
      taskData.inProgress &&
      taskData.inProgress.filter((progress) => progress.id != id);

    setTaskData((prev) => ({
      ...prev,
      inProgress: filterInProgressOut || [],
    }));

    setProjects((prevState) => {
      return prevState.map((project) =>
        project.id === taskData.id
          ? {
              ...project,
              inProgress:
                project.inProgress?.filter((progress) => progress.id !== id) ||
                [],
            }
          : project
      );
    });
  };

  return (
    <div className="bg-blue-100 py-3 px-3 rounded-md mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <GrInProgress className="text-xl" />
        <h2 className="text-xl font-semibold">In progress</h2>
      </div>
      <div className="flex flex-col gap-y-3">
        {taskData.inProgress?.map((progress) => (
          <div
            key={progress.id}
            className="bg-slate-50 px-4 pb-2 pt-1 rounded-md "
          >
            <div className="flex justify-between items-center mt-2">
              <FaTasks />
              <div className="flex items-center gap-x-2">
                <p
                  onClick={() => handleDone(progress.id)}
                  className="text-xs bg-blue-100 py-0.5 px-3 font-semibold cursor-pointer rounded-sm"
                >
                  Complete
                </p>

                <RiDeleteBin6Line
                  className="cursor-pointer"
                  onClick={() => handleDelete(progress.id)}
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold mt-2">{progress.name}</p>
              <p className="text-sm">{progress.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

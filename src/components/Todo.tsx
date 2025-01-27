import { FaTasks } from "react-icons/fa";
import { ProjectsPropStructure } from "../Types";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCheckBoxOutlineBlank, MdOutlineEdit } from "react-icons/md";
import { TodoType } from "../App";

interface TodoProps {
  setStartEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<TodoType | undefined>>;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  taskData: Partial<ProjectsPropStructure>;
  setTaskData: React.Dispatch<React.SetStateAction<ProjectsPropStructure>>;
  setProjects: React.Dispatch<React.SetStateAction<ProjectsPropStructure[]>>;
}

export default function Todo({
  taskData,
  setTaskData,
  setProjects,
  setEdit,
  setStartEdit,
  setTaskModalOpen,
}: TodoProps) {
  const handleFilter = function (id: number) {
    const filterInprogress =
      taskData.todos && taskData.todos.filter((todo) => todo.id === id);

    if (filterInprogress && filterInprogress.length > 0) {
      setTaskData((prev) => ({
        ...prev,
        inProgress: [...(prev.inProgress || []), ...filterInprogress],
        todos: prev.todos?.filter((todo) => todo.id !== id) || [],
      }));
    }

    setProjects((prevState) => {
      return prevState.map((project) =>
        project.id === taskData.id
          ? {
              ...project,
              inProgress: [
                ...(project.inProgress || []),
                ...(filterInprogress || []),
              ],
              todos: project.todos?.filter((todo) => todo.id !== id) || [],
            }
          : project
      );
    });
  };

  const handleDelete = function (id: number) {
    const filterTodoOut =
      taskData.todos && taskData.todos.filter((todo) => todo.id != id);
    console.log(filterTodoOut);
    setTaskData((prev) => ({
      ...prev,
      todos: filterTodoOut || [],
    }));

    setProjects((prevState) => {
      return prevState.map((project) =>
        project.id === taskData.id
          ? {
              ...project,
              todos: project.todos?.filter((todo) => todo.id !== id) || [],
            }
          : project
      );
    });
  };

  const handleEdit = (task: TodoType) => {
    setTaskModalOpen(true);
    setStartEdit(true);
    setEdit(task);

    console.log(task);
  };

  return (
    <div className="bg-blue-100 py-3 px-3 rounded-md mb-4">
      <div className="flex items-center gap-x-1 mb-2">
        <MdCheckBoxOutlineBlank className="text-xl" />
        <h2 className="text-xl font-semibold">Todo</h2>
      </div>
      <div className="flex flex-col gap-y-3">
        {taskData.todos?.map((todo) => (
          <div key={todo.id} className="bg-slate-50 px-4 pb-2 pt-1 rounded-md ">
            <div className="flex justify-between items-center mt-2">
              <FaTasks />
              <div className="flex items-center gap-x-2">
                <p
                  onClick={() => handleFilter(todo.id)}
                  className="text-xs bg-blue-100 py-0.5 px-3 font-semibold cursor-pointer rounded-sm"
                >
                  Start
                </p>
                <MdOutlineEdit
                  className="cursor-pointer"
                  onClick={() => handleEdit(todo)}
                />
                <RiDeleteBin6Line
                  onClick={() => handleDelete(todo.id)}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <p className="text-lg font-semibold mt-2">{todo.name}</p>
              <p className="text-sm">{todo.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

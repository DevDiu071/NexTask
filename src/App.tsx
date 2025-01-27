import { useState } from "react";
import CreateProjectForm from "./components/CreateProjectForm";

import Navigation from "./components/Navigation";
import { ProjectsPropStructure } from "./Types";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import TaskComp from "./components/TaskComp";
import Header from "./components/Header";
import CreateTaskForm from "./components/CreateTaskForm";
import Empty from "./components/Empty";

export interface TodoType {
  name: string;
  id: number;
  detail: string;
  completed: false;
  column: string;
  project: string;
}

export default function App() {
  const [projects, setProjects] = useState<ProjectsPropStructure[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [paramName, setParamName] = useState<string>("");
  const [edit, setEdit] = useState<TodoType | undefined>();
  const [startEdit, setStartEdit] = useState<boolean>(false);
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<ProjectsPropStructure>({
    id: 0,
    name: "",
    todos: [],
    inProgress: [], // Initialize inProgress as an empty array
    done: [],
  });
  const [updated, setUpdated] = useState<boolean>(false);

  console.log(edit);
  return (
    <BrowserRouter>
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="h-full w-full backdrop-blur-[2px] absolute top-0"
        ></div>
      )}
      {taskModalOpen && (
        <div
          onClick={() => setTaskModalOpen(false)}
          className="h-full w-full backdrop-blur-[2px] absolute top-0"
        ></div>
      )}
      <div className="grid md:grid-cols-[1fr_5fr] h-screen">
        <Navigation
          projects={projects}
          setModalOpen={setModalOpen}
          setTaskData={setTaskData}
          setProjects={setProjects}
          toggleNav={toggleNav}
        />
        <div>
          <Header setToggleNav={setToggleNav} toggleNav={toggleNav} />
          <div className="px-6 md:px-12 mt-[50px]">
            {projects.length > 0 && (
              <div className="flex justify-between items-center">
                <p className="text-3xl font-bold">{paramName}</p>
                <button
                  onClick={() => setTaskModalOpen(true)}
                  className="text-sm bg-blue-700 text-white py-1.5 px-8 rounded-md"
                >
                  New Task +
                </button>
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  projects.length > 0 ? (
                    <Navigate to={`/${projects[0]?.name}`} replace />
                  ) : (
                    <Empty />
                  )
                }
              />

              <Route
                path="/:projectName"
                element={
                  projects.length === 0 ? (
                    <Navigate to="/" replace />
                  ) : (
                    <TaskComp
                      projects={projects}
                      taskData={taskData}
                      setParamName={setParamName}
                      setTaskData={setTaskData}
                      setProjects={setProjects}
                      setTaskModalOpen={setTaskModalOpen}
                      setEdit={setEdit}
                      startEdit={startEdit}
                      setStartEdit={setStartEdit}
                    />
                  )
                }
              />
            </Routes>
          </div>
        </div>
        {modalOpen && (
          <CreateProjectForm
            setProjects={setProjects}
            setModalOpen={setModalOpen}
            setTaskData={setTaskData}
            projects={projects}
            setUpdated={setUpdated}
            updated={updated}
          />
        )}
        {taskModalOpen && (
          <CreateTaskForm
            setTaskModalOpen={setTaskModalOpen}
            projects={projects}
            setProjects={setProjects}
            setTaskData={setTaskData}
            setStartEdit={setStartEdit}
            startEdit={startEdit}
            edit={edit}
            setEdit={setEdit}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Button from "../UI/Button";
import Header from "./Header";
import TaskComp from "./TaskComp";

export default function Main() {
  return (
    <div>
      <Header setToggleNav={() => {}} toggleNav={false} />
      <div className="px-10 mt-[80px]">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-semibold">Tasks</p>
                  <Button>New Task +</Button>
                </div>
              }
            >
              <Route
                path="/:projectname"
                element={
                  <TaskComp
                    setParamName={() => {}}
                    projects={[]}
                    taskData={
                      {
                        /* Add valid properties here */
                      }
                    }
                    startEdit={false}
                    setStartEdit={() => {}}
                    setEdit={() => {}}
                    setTaskModalOpen={() => {}}
                    setTaskData={() => {}}
                    setProjects={() => {}}
                  />
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

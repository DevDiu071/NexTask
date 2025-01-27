import { TodoType } from "./App";

export interface ButtonProps {
  children: React.ReactNode;
}

export interface ProjectsPropStructure {
  name: string;
  id: number;
  todos: TodoType[];
  inProgress: TodoType[];
  done: TodoType[];
}

export interface Data {
  name: string;
  detail: string;
  project: string;
}

export interface ProjectProps {
  name: string;
}

export interface ProjectFormProps {
  name: string;
}

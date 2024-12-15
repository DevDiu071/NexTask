import Button from "../UI/Button";
import Done from "./Done";
import Header from "./Header";
import InProgress from "./InProgress";
import Todo from "./Todo";

export default function Main() {
  return (
    <div>
      <Header />
      <div className="px-12 mt-[80px]">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">Tasks</p>
          <Button>New Task +</Button>
        </div>
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-2 mt-4 bg-cyan-300">
          <Todo />
          <InProgress />
          <Done />
        </div>
      </div>
    </div>
  );
}

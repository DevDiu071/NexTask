import { MdAddTask } from "react-icons/md";

export default function Logo() {
  return (
    <div className="flex gap-x-2 items-center mt-8 font-bold justify-center mb-[50px]">
      <MdAddTask className="text-3xl text-blue-600" />
      <p className="text-xl">NexTask.</p>
    </div>
  );
}

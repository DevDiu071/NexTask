import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Header() {
  return (
    <div className="my-4 flex items-center gap-x-[60px] border-b pb-5 px-12">
      <input
        type="text"
        id="search"
        placeholder="Search"
        className="w-full py-1.5 px-4 rounded-md border"
      />
      <div className="flex items-center gap-x-2">
        <IoIosNotificationsOutline className="text-2xl" />
        <FaRegUserCircle className="text-3xl" />
      </div>
    </div>
  );
}

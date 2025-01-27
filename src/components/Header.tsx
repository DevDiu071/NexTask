import { FaRegUserCircle } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import Logo from "./Logo";
import { MdMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface HeaderProps {
  setToggleNav: React.Dispatch<React.SetStateAction<boolean>>;
  toggleNav: boolean;
}

export default function Header({ setToggleNav, toggleNav }: HeaderProps) {
  return (
    <>
      <div className="hidden md:mt-6 md:flex items-center justify-between gap-x-[60px] border-b pb-5 px-6 md:px-12">
        <h1 className="title text-xl hidden  md:flex md:justify-center md:text-3xl md:ml-[70px] font-bold">
          Start Tracking
        </h1>
        <div className="flex items-center gap-x-2">
          <IoIosNotificationsOutline className="text-2xl hidden md:block" />
          <FaRegUserCircle className="text-3xl hidden md:block" />
          <MdMenu
            className="md:hidden text-3xl cursor-pointer z-50"
            onClick={() => setToggleNav((toggle) => !toggle)}
          />
        </div>
      </div>

      <div className="md:hidden -mt-2 pt-5 md:mt-6 bg-white w-full  flex items-center justify-between fixed top-0 right-0 border-b pb-5 px-6 md:px-12">
        <Logo />
        <div className="flex items-center gap-x-2">
          <IoIosNotificationsOutline className="text-2xl hidden md:block" />
          <FaRegUserCircle className="text-3xl hidden md:block" />
          {!toggleNav && (
            <MdMenu
              className="md:hidden text-4xl  cursor-pointer relative z-50"
              onClick={() => setToggleNav((toggle) => !toggle)}
            />
          )}

          {toggleNav && (
            <IoClose
              className="md:hidden text-4xl cursor-pointer"
              onClick={() => setToggleNav((toggle) => !toggle)}
            />
          )}
        </div>
      </div>
    </>
  );
}

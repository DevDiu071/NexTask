import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { ImFilesEmpty } from "react-icons/im";

export default function Empty() {
  return (
    <div className="flex flex-col mt-[150px] items-center">
      <ImFilesEmpty className="text-[110px] text-blue-900" />
      <p className="text-sm text-gray-600 mt-4 flex items-center gap-x-2">
        <span>Your projects will appear here</span>
        <FaRegFaceSmileBeam className="text-[25px]" />
      </p>
    </div>
  );
}

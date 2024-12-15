import { ButtonProps } from "../Types";

export default function Button({ children }: ButtonProps) {
  return (
    <button className="text-sm bg-blue-700 text-white py-1.5 px-8 rounded-md">
      {children}
    </button>
  );
}

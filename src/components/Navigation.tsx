import Button from "../UI/Button";
import Logo from "./Logo";

export default function Navigation() {
  return (
    <div className="flex flex-col items-center border-r">
      <Logo />
      <Button>Create Board</Button>
    </div>
  );
}

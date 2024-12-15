import Main from "./components/Main";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div className="grid xl:grid-cols-[1fr_5fr] h-screen">
      <Navigation />
      <Main />
    </div>
  );
}

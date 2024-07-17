import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./componets/Navbar";
import HeroSection from "./componets/HeroSection";

let d = [
  {
    id: "I" + "aperiam." + 125,
    todo: "I am Task 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, aperiam.",
    date: "12-12-2024",
    status: "pending",
  },
  {
    id: "I" + "aperiam." + 126,
    todo: "I am Task 1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, aperiam.",
    date: "12-12-2024",
    status: "pending",
  },

];

function App() {
  const [theme, setTheme] = useState("dark");
  const [rootbg, setRootbg] = useState("bg-zinc-800");
  const [data, setData] = useState(d);

  return (
    <div className={`${rootbg} min-h-screen w-screen flex flex-col md:flex-row`}>
      <div className="w-full md:w-[10%] bg-red-400">
        <Navbar setTheme={setTheme} />
      </div>
      <div className="w-full">
        <HeroSection theme={theme} data={data} setData={setData} setRootbg={setRootbg} />

      </div>
    </div>
  );
}

export default App;

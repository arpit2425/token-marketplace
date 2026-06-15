import { Hero } from "./components/hero";
import Navbar from "./components/navbar";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-orange-800 from-[10%]  to-black">
      <Navbar/>
      <Hero/>
    </div>

  );
}

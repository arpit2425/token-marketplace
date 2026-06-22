import { Hero } from "./components/hero";
import Navbar from "./components/navbar";
import { Section } from "./components/section";


export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#351d10] from-[10%]  to-black">
    <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#351d10] from-[10%]  to-black"></div>
      <Navbar/>
      <Hero/>
      <Section/>
    
    </div>

  );
}

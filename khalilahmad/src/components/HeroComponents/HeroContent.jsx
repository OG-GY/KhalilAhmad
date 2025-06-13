"use client";
import {Roboto_Condensed,Oswald, Merriweather_Sans, Rubik_Mono_One} from "next/font/google";
import { PhoneForwarded } from 'lucide-react';


const robotocondensed= Roboto_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const merri = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400"],
});
const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  weight: ["400"],
});

export default function HeroContent() {
  return (
    <div className="text-white max-w-md mb-8">
      <h3 className={`text-xl uppercase font-extrabold text-gray-300 ${oswald.className}`}>Hello I'm</h3>
      <h1 className={` mt-0 text-5xl lg:text-6xl font-extrabold text-amber-400 `}>Khalil <span className="">Ahmad</span></h1>
      <h2 className="text-3xl lg:text-3xl font-semibold mt-6">Full Stack Web Developer</h2>
      <h2 className="text-xl lg:text-2xl mt-1">
        I am a <span className="text-amber-400">UI/UX Designer</span>
      </h2>

      <div className="flex mt-6 gap-4">
        <button className={`${merri.className} text-md cursor-pointer bg-amber-400 text-black font-extrabold px-6 py-2 rounded-sm hover:bg-none transition `}>
          Download CV
        </button>
        <button className="cursor-pointer border-2 border-amber-400 text-amber-400 px-4 py-3 rounded-sm hover:bg-amber-400 hover:text-black transition">
          <PhoneForwarded />
        </button>
      </div>
    </div>
  );
}

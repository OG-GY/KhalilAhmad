"use client";
import {Oswald, Merriweather_Sans, Rubik_Mono_One } from "next/font/google";
import { PhoneForwarded } from 'lucide-react';
import {ReactTyped} from "react-typed";

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
    <div className="text-white w-full max-w-md lg:max-w-lg xl:max-w-xl mb-8 lg:mb-0 text-center lg:text-left">
      <h3 className={`text-lg sm:text-xl md:text-2xl uppercase font-extrabold text-gray-300 ${oswald.className}`}>
        Hello I'm
      </h3>
      
      <h1 className={`mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold text-amber-400 leading-tight`}>
        Khalil <span className="text-white">Ahmad</span>
      </h1>
      
      <h2 className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-semibold mt-4 lg:mt-6 leading-tight">
        Full Stack Web Developer
      </h2>
      
      <h2 className="text-lg sm:text-xl lg:text-xl xl:text-2xl mt-2 lg:mt-3 text-gray-200">
        I am a{' '}
        <ReactTyped 
          className="text-amber-400 font-medium" 
          strings={["UI/UX Designer", "Frontend Developer", "Backend Developer", "Problem Solver"]}
          typeSpeed={50}
          backSpeed={30}
          loop 
        />
      </h2>

      <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start mt-6 lg:mt-8 gap-3 sm:gap-4">
        <button className={`${merri.className} w-full sm:w-auto leading-none cursor-pointer bg-amber-400 text-black px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-transparent hover:text-amber-400 hover:border-2 hover:border-amber-400 hover:scale-105 transition-all duration-300`}>
          Hire Me
        </button>
        
        <button className="w-full sm:w-auto cursor-pointer border-2 border-amber-400 text-amber-400 px-4 py-3 rounded-lg hover:bg-amber-400 hover:text-black transition-all duration-300 flex items-center justify-center gap-2">
          <PhoneForwarded className="h-4 w-4" />
          <span className="sm:hidden">Contact</span>
        </button>
      </div>
    </div>
  );
}

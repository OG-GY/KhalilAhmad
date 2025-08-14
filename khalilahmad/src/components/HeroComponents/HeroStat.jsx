"use client";
import CountUp from "../ui/Count";

export default function HeroStat({ upper, count, lower, string }) {
  return (
    <div className="flex flex-col items-center text-center p-2 sm:p-3 bg-zinc-900 rounded-xl">
      <p className="text-xs sm:text-sm text-gray-200 underline mb-1">
        {upper}
      </p>
      
      <div className="flex items-center justify-center">
        <CountUp 
          from={0}
          to={parseInt(count)}
          separator=","
          direction="up"
          duration={1}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400"
        >
          0
        </CountUp>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-400">
          {string}
        </span>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-200 mt-1 leading-tight">
        {lower}
      </p>
    </div>
  );
}

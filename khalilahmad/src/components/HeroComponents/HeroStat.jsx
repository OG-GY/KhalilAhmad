"use client";
import CountUp from "../ui/Count";

export default function HeroStat({ upper, count, lower, string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-md text-gray-200 underline">{upper}</p>
      <div>
        <CountUp from={0}
          to={count}
          separator=","
          direction="up"
          duration={1}
          className={`count-up-text text-4xl font-bold text-amber-400`}>0</CountUp> <span className={`count-up-text text-4xl text-amber-400`}>{string}</span>
      </div>
      <p className="text-sm text-gray-200">{lower}</p>
    </div>
  );
}

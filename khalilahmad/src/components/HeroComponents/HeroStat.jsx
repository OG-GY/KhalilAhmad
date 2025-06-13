"use client";

export default function HeroStat({ upper, count, lower }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-md text-gray-200 underline">{upper}</p>
      <h1 className="text-4xl font-bold text-amber-400">{count}</h1>
      <p className="text-sm text-gray-200">{lower}</p>
    </div>
  );
}

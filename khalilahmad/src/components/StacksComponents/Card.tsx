"use client";
import Image from "next/image";
import GlareHover from "../ui/GlareHover";

interface CardProps {
  name: string;
  image: string;
  tags: string[];
}

export default function Card({ name, image, tags }: CardProps) {
  const chipColors = [
    {
      bg: "bg-blue-500/20",
      border: "border-blue-500",
      text: "text-blue-300",
    },
    {
      bg: "bg-green-500/20",
      border: "border-green-500",
      text: "text-green-300",
    },
    {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-300",
    },
    {
      bg: "bg-purple-500/20",
      border: "border-purple-500",
      text: "text-purple-300",
    },
  ];

  return (
    <GlareHover
      glareColor="#FFB900"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
    >
      <div className="bg-black rounded-lg shadow-md pt-8 pb-5 flex flex-col items-center justify-center w-100 text-center border border-gray-700">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
          {name}
        </h2>

        <div className="flex flex-row flex-wrap justify-center gap-3">
          {tags.map((tag, index) => {
            const color = chipColors[index % chipColors.length];
            return (
              <span
                key={index}
                className={`px-2 py-1 rounded-md text-sm font-medium shadow-sm border ${color.bg} ${color.border} ${color.text}`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </GlareHover>
  );
}

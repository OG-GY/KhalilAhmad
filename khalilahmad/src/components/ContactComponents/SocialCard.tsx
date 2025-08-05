"use client";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { ReactElement } from "react";

interface SocialItem {
  icon: ReactElement;
  label: string;
  value: string;
  link: string;
}

const socials: SocialItem[] = [
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Lahore, Pakistan",
    link: "https://",
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "reachkhalilhere@gmail.com",
    link: "https://",
  },
  {
    icon: <FaPhone />,
    label: "Contact",
    value: "Contact me on Discord.",
    link: "https://",
  },
];

export default function SocialCard() {
  return (
    <div className="flex flex-col gap-8">
      {socials.map((s, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer group transition duration-100"
        >
          <div className="text-2xl bg-yellow-800 text-white p-3 rounded-lg">
            {s.icon}
          </div>
          <div className="ml-4">
            <p className="text-md font-bold">{s.label}</p>
            <p className="text-sm hover:text-yellow-800 group-hover:text-yellow-800 transition duration-300  text-gray-400">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

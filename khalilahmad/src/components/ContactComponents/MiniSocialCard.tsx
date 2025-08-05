"use client";
import {
  FaGithub,
  FaLinkedin,
//   FaTwitter,
  FaInstagram,
//   FaTiktok,
//   FaFacebook,
  FaDiscord
} from "react-icons/fa";
import { ReactElement } from "react";

interface MiniSocial {
  icon: ReactElement;
  name: string;
}

const socials: MiniSocial[] = [
  { icon: <FaGithub />, name: "GitHub" },
  { icon: <FaLinkedin />, name: "LinkedIn" },
//   { icon: <FaTwitter />, name: "Twitter" },
  { icon: <FaInstagram />, name: "Instagram" },
//   { icon: <FaTiktok />, name: "TikTok" },
//   { icon: <FaFacebook />, name: "Facebook" },
  { icon: <FaDiscord />, name: "Discord" }
];

export default function MiniSocialCard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {socials.map((s, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center bg-yellow-500/10 hover:bg-yellow-800 text-white rounded-xl p-4 cursor-pointer transition duration-200"
        >
          <div className="text-xl mb-1">{s.icon}</div>
          <span className="text-sm font-medium">{s.name}</span>
        </div>
      ))}
    </div>
  );
}

"use client";
import HeroStat from "./HeroStat";
import { addToast, ToastProvider } from "@heroui/toast";
import { Github, Linkedin, Instagram, Facebook, MailOpen } from 'lucide-react';
import { Oswald } from "next/font/google";
import { Tooltip } from "@heroui/react";


const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});


export default function HeroAbout() {
  const Socials = [
    { name: "Github", color: "warning", icon: Github, link: "https://github.io/OG-GY" },
    { name: "Linkedin", color: "warning", icon: Linkedin, link: "https://www.linkedin.com/in/khalil-ahmad-411270260/" },
    { name: "Instagram", color: "warning", icon: Instagram, link: "https://" },
    { name: "Facebook", color: "warning", icon: Facebook, link: "https://web.facebook.com/khalil.ahmad.916877" },
    { name: "Gmail", color: "warning", icon: MailOpen, copy: "iamkhalil2005@gmail.com" },
  ];

  return (
    <div className="text-white max-w-sm mt-10 lg:-mt-8">
      <h4 className={` text-3xl font-bold text-amber-400 mb-2`}>About Me</h4>
      <p className="text-md text-gray-300 mb-4">
        Full Stack Developer with experience across multiple tech stacks, languages, and domains. Specialized in <span className="text-amber-400">Next.js</span>, <span className="text-amber-400">React</span>, and <span className="text-amber-400">Node.js</span>. I build scalable web applications and have a passion for creating intuitive user experiences.
      </p>
      <div className="flex justify-between gap-4 mb-6 mt-2">
        <HeroStat upper="Top" count="5%" lower="on Topmate" string="%"/>
        <HeroStat upper="Mentored" count="40+" lower="Student Developers" string="+" />
        <HeroStat upper="Built" count="20+" lower="Web Projects" string="+"/>
      </div>
      <div className="mt-8">
        <h4 className="text-xl font-bold text-amber-400 mb-2">Find me on</h4>
        <div className="flex gap-3 mt-4 items-center justify-center flex-wrap">
          {Socials.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Tooltip
                key={index}
                content={social.name}
                showArrow={true}
                color={social.color}
                placement="bottom"
              >
                {social.copy ? (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(social.copy);
                      addToast({
                        title: "Toast title",
                        description: "Toast displayed successfully",
                        color: "warning",
                      })
                    }}
                    className="text-white border-2 cursor-pointer border-amber-400 p-2 rounded-full hover:bg-amber-400 hover:text-black transition"
                  >
                    <IconComponent size={24} />
                  </button>
                ) : (
                  <a
                    href={social.link}
                    className="text-white border-2 border-amber-400 p-2 rounded-full hover:bg-amber-400 hover:text-black transition"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent size={24} />
                  </a>
                )}
              </Tooltip>
            );
          })}
        </div>
      </div>

    </div>
  );
}

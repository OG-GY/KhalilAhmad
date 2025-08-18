"use client";
import HeroStat from "./HeroStat";
import { addToast, ToastProvider } from "@heroui/toast";
import { Github, Linkedin, Instagram, Facebook, MailOpen } from 'lucide-react';
import { Oswald } from "next/font/google";
import { Tooltip } from "@heroui/react";
import { socials } from "@/data/socials";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export default function HeroAbout() {
  const Socials = [
    { name: "Github", color: "warning", icon: Github, link: socials.github },
    { name: "Linkedin", color: "warning", icon: Linkedin, link: socials.linkedin },
    { name: "Instagram", color: "warning", icon: Instagram, link: socials.instagram },
    { name: "Facebook", color: "warning", icon: Facebook, link: socials.facebook },
    { name: "Gmail", color: "warning", icon: MailOpen, copy: socials.gmail },
  ];

  return (
    <div className="text-white w-full max-w-sm lg:max-w-md xl:max-w-lg text-center lg:text-left">
      <h4 className="text-2xl sm:text-3xl font-bold text-amber-400 mb-3 lg:mb-4">
        About Me
      </h4>

      <p className="text-sm sm:text-base lg:text-md text-gray-300 mb-6 leading-relaxed">
        Full Stack Developer with experience across multiple tech stacks, languages, and domains.
        Specialized in{' '}
        <span className="text-amber-400 font-medium">Next.js</span>,{' '}
        <span className="text-amber-400 font-medium">React</span>, and{' '}
        <span className="text-amber-400 font-medium">Node.js</span>.
        I build scalable web applications and have a passion for creating intuitive user experiences.
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 lg:mb-8">
        <HeroStat upper="Top" count="5" lower="on Topmate" string="%" />
        <HeroStat upper="Mentored" count="40" lower="Student Developers" string="+" />
        <HeroStat upper="Built" count="20" lower="Web Projects" string="+" />
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center">
        <div className="mt-6 lg:mt-8">
          <h4 className="text-lg sm:text-xl font-bold text-amber-400 mb-3 lg:mb-4">
            Find me on
          </h4>

          <div className="flex gap-2 sm:gap-3 items-center justify-center lg:justify-start flex-wrap">
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
                          title: "Email Copied!",
                          description: "Email address copied to clipboard",
                          color: "warning",
                        });
                      }}
                      className="text-white border-2 cursor-pointer border-amber-400 p-2 sm:p-2 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 hover:scale-110"
                    >
                      <IconComponent size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  ) : (
                    <a
                      href={social.link}
                      className="text-white border-2 border-amber-400 p-2 sm:p-2 rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconComponent size={20} className="sm:w-6 sm:h-6" />
                    </a>
                  )}
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

"use client";
import HeroContent from './HeroComponents/HeroContent';
import HeroAbout from './HeroComponents/HeroAbout';
import Image from 'next/image';

export default function Hero() {
  return (
    <div className="bg-zinc-950 pt-16 md:pt-20 min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 text-white">
      {/* Mobile Layout - Image first */}
      <div className="lg:hidden w-full flex justify-center mb-8 mt-8">
        <div className="relative">
          <Image
            src="/khalilhero.png"
            width={300}
            height={400}
            alt="Khalil Ahmad"
            className="rounded-lg object-cover w-[280px] h-[350px] sm:w-[320px] sm:h-[400px]"
            priority
          />
        </div>
      </div>

      {/* Hero Content */}
      <div className="flex-1 lg:flex-none lg:max-w-lg xl:max-w-xl">
        <HeroContent />
      </div>

      {/* Desktop Image */}
      <div className="hidden lg:flex lg:flex-1 lg:justify-center lg:items-center">
        <div className="relative">
          <Image
            src="/Images/khalilHero4.png"
            width={450}
            height={600}
            alt="Khalil Ahmad"
            className="rounded-lg object-cover w-[400px] h-[500px] xl:w-[450px] xl:h-[600px]"
            priority
          />
        </div>
      </div>

      {/* Hero About */}
      <div className="flex-1 lg:flex-none lg:max-w-lg xl:max-w-xl mt-8 lg:mt-0">
        <HeroAbout />
      </div>
    </div>
  );
}

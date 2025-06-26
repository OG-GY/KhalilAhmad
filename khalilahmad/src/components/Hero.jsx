"use client";
import HeroContent from './HeroComponents/HeroContent';
import HeroAbout from './HeroComponents/HeroAbout';
import Image from 'next/image';

export default function Hero() {
  return (
    //  bg-[261c05]
    <div className="bg-black pt-20 h-[100vh] flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 text-white">
      <HeroContent />
      <div className="my-6 lg:my-0">
        <Image
          src="/Images/khalilHero4.png"
          width={510}
          height={800}
          alt="Khalil Ahmad"
          className="rounded "
        />
      </div>

      <HeroAbout />
    </div>
  );
}

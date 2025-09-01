import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ProjectsSection } from "@/components/projects-section";
import MyServices from "@/components/MyServices";
import { ContactSection } from "@/components/Contact";
import { TechStackSection } from "@/components/tech-stack-section";
// import { ExperienceSection } from "@/components/Experience"
import { Footer } from "@/components/Footer";
import { EventsSection } from "@/components/EventSection";
import { CommunitySection } from "@/components/CommunitySection";

export default function Home() {
  return (
    <main className="bg-zinc-950">
      <Navbar />
      <div className="relative">
        <Hero />
        <div
          className="hidden md:block absolute bottom-0 left-0 right-0 w-full h-15 
             bg-gradient-to-b from-zinc-950/9 via-zinc-950 to-zinc-950
             pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
      <MyServices/>
      <ProjectsSection/>
      <EventsSection/>
      <CommunitySection/>
      <TechStackSection defaultCategory="Tech Stack"/>
      <ContactSection contactEmail="reachkhalilhere@gmail.com"/>
      <Footer/>
      {/* <Services /> */}
      {/* <ExperienceSection/> */}
      {/* <Stacks /> */}
      {/* <Courses /> */}
      {/* <ContactMe /> */}
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ProjectsSection } from "@/components/projects-section";
import ThemeToggle from "@/components/ThemeToggle";
import MyServices from "@/components/MyServices";
import { TechStackSection } from "@/components/StacksComponents/TechStack";
import { ContactSection } from "@/components/Contact";
import { ExperienceSection } from "@/components/Experience"

export default function Home() {
  return (
    <main className="bg-zinc-950">
      {/* Theme toggle for testing - you can position this wherever you want */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <Navbar />
      <div className="relative">
        <Hero />
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-15 
             bg-gradient-to-b from-zinc-950/9 via-zinc-950 to-zinc-950
             pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
      {/* <Services /> */}
      <MyServices/>
      <ProjectsSection/>
      {/* <ExperienceSection/> */}
      {/* <Stacks /> */}
      <TechStackSection/>
      <ContactSection contactEmail="reachkhalilhere@gmail.com"/>
      {/* <Courses /> */}
      {/* <ContactMe /> */}
    </main>
  );
}

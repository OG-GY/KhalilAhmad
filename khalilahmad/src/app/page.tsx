import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stacks from "@/components/Stacks";
import Courses from "@/components/Courses";
import ContactMe from "@/components/ContactMe";
import { ProjectsSection } from "@/components/projects-section"

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <div className="relative">
        <Hero />
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-15 
             bg-gradient-to-b from-black/9 via-black to-black 
             pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
      <Services />
      <ProjectsSection/>
      <Stacks />
      <Courses />
      <ContactMe />
    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stacks from "@/components/Stacks";
import Courses from "@/components/Courses";
import ContactMe from "@/components/ContactMe";
import { ProjectsSection } from "@/components/projects-section";
import ThemeToggle from "@/components/ThemeToggle";
import MyServices from "@/components/MyServices";

export default function Home() {
  return (
    <main className="bg-black">
      {/* Theme toggle for testing - you can position this wherever you want */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
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
      {/* <Services /> */}
      <MyServices/>
      <ProjectsSection/>
      <Stacks />
      <Courses />
      <ContactMe />
    </main>
  );
}

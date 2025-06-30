import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stacks from "@/components/Stacks";
import Courses from "@/components/Courses";
import ContactMe from "@/components/ContactMe";


export default function Home() {

  return (
    <main>
      <Navbar />
      <div className="relative">
        <Hero />
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-15 
             bg-gradient-to-b from-black/70 via-black/50 to-black 
             pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>
      <Services />
      <Stacks />
      <Courses />
      <ContactMe />

    </main>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Technologies from "@/components/Technologies";

export default function Home() {
  return (
    <main>
      <Navbar />

      {/* Hero + Gradient only */}
      <div className="relative">
        <Hero />
        <div
          className="absolute bottom-0 left-0 right-0 w-full h-15 
             bg-gradient-to-b from-transparent via-[#09090B] to-black 
             pointer-events-none"
          style={{ zIndex: 10 }}
        />
      </div>

      {/* Other sections come after */}
      <Services />
      <Technologies />
    </main>
  );
}

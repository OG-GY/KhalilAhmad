import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main>
      <div className="">
        <Navbar/>
        <Hero />
        <Services />
      </div>
    </main>
  );
}

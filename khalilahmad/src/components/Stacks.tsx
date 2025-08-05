"use client";
import Card from "./StacksComponents/Card";

export default function Stacks() {
  return (
    <section id="skills" className="bg-black">
      <div className="text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
          
          <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16">
            <span className="text-white">Tech </span>
            <span className="text-amber-400">Stacks</span>
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 items-center justify-center">
            <Card
              name="Next JS"
              image="/Images/TechStacks/nextjs.png"
              tags={["Level: Expert", "Experience: 2y+", "Projects: 10+"]}
            />
            <Card
              name="Node JS"
              image="/Images/TechStacks/nodejs.png"
              tags={["Level: Advanced", "Experience: 1y+", "Projects: 7+"]}
            />
            <Card
              name="MongoDB"
              image="/Images/TechStacks/mongodb.png"
              tags={["Level: Advanced", "Experience: 1.5y+"]}
            />
            <Card
              name="Advanced Python"
              image="/Images/TechStacks/python.png"
              tags={["Level: Advanced", "Experience: 3y+", "Projects: 15+"]}
            />
            <Card
              name="Figma"
              image="/Images/TechStacks/figma.png"
              tags={["Level: Advanced", "Experience: 2y+", "Projects: 10+"]}
            />
            <Card
              name="PostgreSQL"
              image="/Images/TechStacks/postgresql.png"
              tags={["Level: Expert", "Experience: 1y+", "Projects: 4+"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

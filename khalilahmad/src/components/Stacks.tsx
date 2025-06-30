"use client";
import Card from "./StacksComponents/Card";

export default function Stacks() {
  return (
    <section className="">
      <div className="bg-black text-white py-16 h-[100vh] flex items-center flex-col">
        <h1 className="text-center text-4xl font-bold mb-12">
          <span className="text-white">Tech </span>
          <span className="text-yellow-500">Stacks </span>
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Card
            name="Next JS"
            image="/Images/TechStacks/nextjs.png"
            tags={["Level: Expert", "Experience: 2Y+", "Projects: 10+"]}
          />
          <Card
            name="Node JS"
            image="/Images/TechStacks/nodejs.png"
            tags={["Level: Advanced", "Experience: 1Y+", "Projects: 7+"]}
          />
          <Card
            name="MongoDB"
            image="/Images/TechStacks/mongodb.png"
            tags={["Level: Advanced", "Experience: 1.5Y+",]}
          />
          <Card
            name="Advanced Python"
            image="/Images/TechStacks/python.png"
            tags={["Level: Advanced", "Experience: 3Y+", "Projects: 15+"]}
          />
          <Card
            name="Figma"
            image="/Images/TechStacks/figma.png"
            tags={["Level: Advanced", "Experience: 2Y+", "Projects: 10+"]}
          />
          <Card
            name="PostgreSQL"
            image="/Images/TechStacks/postgresql.png"
            tags={["Level: Expert", "Experience: 1Y+", "Projects: 4+"]}
          />
        </div>
      </div>
    </section>
  );
}

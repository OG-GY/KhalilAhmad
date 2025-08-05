import InfiniteMenu from "./ui/InfiniteMenu";

const items = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    link: "https://google.com/",
    title: "Advanced React Development",
    description: "Master modern React patterns and best practices",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    link: "https://google.com/",
    title: "Full Stack Next.js",
    description: "Build production-ready applications with Next.js",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    link: "https://google.com/",
    title: "Node.js & APIs",
    description: "Create scalable backend services and APIs",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Database Design",
    description: "Learn MongoDB and PostgreSQL fundamentals",
  },
];

export default function Courses() {
  return (
    <section className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 sm:mb-12 lg:mb-16">
          <span className="text-white">Learning </span>
          <span className="text-amber-400">Journey</span>
        </h1>
        
        <div className="flex justify-center">
          <div 
            className="w-full max-w-6xl"
            style={{ 
              height: "400px", 
              position: "relative",
            }}
          >
            <InfiniteMenu items={items} />
          </div>
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Continuous learning is key to staying current in web development. 
            Here are some of the key areas I&apos;ve focused on to enhance my skills.
          </p>
        </div>
      </div>
    </section>
  );
}

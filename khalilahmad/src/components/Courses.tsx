import InfiniteMenu from "./ui/InfiniteMenu";

const items = [
  {
    image: "https://picsum.photos/300/300?grayscale",
    link: "https://google.com/",
    title: "Item 1",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/400/400?grayscale",
    link: "https://google.com/",
    title: "Item 2",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/500/500?grayscale",
    link: "https://google.com/",
    title: "Item 3",
    description: "This is pretty cool, right?",
  },
  {
    image: "https://picsum.photos/600/600?grayscale",
    link: "https://google.com/",
    title: "Item 4",
    description: "This is pretty cool, right?",
  },
];

export default function Courses() {
  return (
    <section className="bg-black text-white py-16 h-[100vh] flex items-center flex-col">
      <h1 className="text-center text-4xl font-bold mb-12">
        <span className="text-white">Courses </span>
        <span className="text-yellow-500">Details </span>
      </h1>
      <div style={{ height: "600px", position: "relative" }}>
        <InfiniteMenu items={items} />
      </div>
    </section>
  );
}

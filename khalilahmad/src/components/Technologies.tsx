import FallingText from "./ui/FallingText";

export default function Technologies() {
  return (
    <div className="h-[80vh] bg-black">
      <h1 className="text-center text-4xl font-bold mb-12">
        <span className="text-white">What </span>
        <span className="text-yellow-500">Technologies </span>
        <span className="text-white">Ive worked at </span>
      </h1>
      <FallingText
        text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
        highlightWords={["React", "Bits", "animated", "components", "simplify"]}
        highlightClass="highlighted"
        trigger="hover"
        backgroundColor="#09090B"
        wireframes={false}
        gravity={0.56}
        fontSize="2rem"
        mouseConstraintStiffness={0.9}
      />
    </div>
  );
}

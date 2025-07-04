import Image from "next/image";

interface GridItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  titleSize?: string;
  overlayColor?: string;
}

export default function ImageGrid() {
  const strengthsItems: GridItem[] = [
    {
      src: "/obama.jpg",
      alt: "Obama",
      title: "Leadership",
      description: "I lead teams with empathy, clarity, and a focus on growth.",
    },
    {
      src: "/coding.jpg",
      alt: "Coding",
      title: "Hands-on Approach",
      description: "I enjoy getting stuck in and getting my hands dirty.",
    },
    {
      src: "/architecture.jpg",
      alt: "Architecture",
      title: "System Design",
      description:
        "I architect robust systems that balance performance, reliability, and maintainability.",
      titleSize: "text-4xl font-extrabold",
      overlayColor: "group-hover:bg-[#fff]/30",
    },
  ];

  return (
    <div className="w-full flex flex-row flex-wrap justify-between">
      {strengthsItems.map((item, index) => (
        <div
          key={index}
          className="relative w-full md:w-1/2 lg:w-1/3 aspect-square overflow-hidden rounded-none group shadow-lg"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
          <div
            className={`absolute inset-0 bg-black/20 group-hover:bg-paletteWhite/80 transition-colors duration-300 ${
              item.overlayColor ? item.overlayColor : ""
            }`}
          />
          <div className="absolute bottom-8 left-0 w-full flex flex-col items-center text-center px-4 z-10">
            <h3
              className={`text-white font-bold drop-shadow-lg group-hover:text-paletteBlack ${
                item.titleSize || "text-2xl"
              }`}
            >
              {item.title}
            </h3>
            <p className="text-white text-lg drop-shadow-md mt-2 group-hover:text-paletteBlack">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

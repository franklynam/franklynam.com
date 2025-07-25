"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface GridItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  titleSize?: string;
  overlayColor?: string;
  href?: string;
}

interface ImageGridProps {
  items: GridItem[];
}

export default function ImageGrid({ items }: ImageGridProps) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="w-full flex flex-row flex-wrap">
      {items.map((item, index) => {
        const cardContent = (
          <div
            className="relative w-full h-full overflow-hidden rounded-none group shadow-lg cursor-pointer"
            onTouchStart={() => setActiveCard(index)}
            onTouchEnd={() => setActiveCard(null)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              style={{ objectFit: "cover" }}
              className={`transition-transform duration-300 group-hover:scale-105 ${
                activeCard === index ? "scale-105" : ""
              }`}
            />
            <div
              className={`absolute inset-0 bg-black/20 transition-colors duration-300 ${
                activeCard === index
                  ? "bg-paletteWhite/80"
                  : "group-hover:bg-paletteWhite/80"
              } ${
                item.overlayColor && activeCard !== index
                  ? item.overlayColor
                  : ""
              }`}
            />
            <div className="absolute bottom-8 left-0 w-full flex flex-col items-center text-center px-4 z-10">
              <h3
                className={`text-white font-bold drop-shadow-lg transition-colors duration-300 ${
                  activeCard === index
                    ? "text-paletteBlack"
                    : "group-hover:text-paletteBlack"
                } ${item.titleSize || "text-2xl"}`}
              >
                {item.title}
              </h3>
              <p
                className={`text-white text-lg drop-shadow-md mt-2 transition-colors duration-300 ${
                  activeCard === index
                    ? "text-paletteBlack"
                    : "group-hover:text-paletteBlack"
                }`}
              >
                {item.description}
              </p>
            </div>
          </div>
        );

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            className="block w-full md:w-1/2 lg:w-1/3 h-64 md:h-80"
          >
            {cardContent}
          </Link>
        ) : (
          <div key={index} className="w-full md:w-1/2 lg:w-1/3 h-64 md:h-80">
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useState } from "react";

export default function PersonalRecommendationsCarousel() {
  const recommendations = [
    {
      name: "Alison Darcy, Founder of Woebot Health",
      text: "I can say without hesitation that he was one of the most grounded, people-centered leaders I've ever worked with.",
    },
    {
      name: "Casey Sackett, CTO at Quizlet",
      text: "Frank is the yes-man you want as a partner and lead on your engineering team. He has incredibly high work ethic, is always dependable, with a positive attitude and willingness to tackle difficult business problems to bring company value.",
    },
  ];
  const [current, setCurrent] = useState(0);
  const total = recommendations.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div className="relative w-full rounded-xl p-2 md:p-8 flex flex-col items-center min-h-[220px] bg-transparent shadow-none">
        <p className="text-sm md:text-lg text-paletteBlack text-center mb-4 italic">
          &ldquo;{recommendations[current].text}&rdquo;
        </p>
        <span className="font-semibold text-paletteBlack text-sm md:text-base text-center">
          {recommendations[current].name}
        </span>
        {/* Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 text-4xl text-gray-400 hover:text-paletteBlack2 transition-colors p-0 bg-transparent shadow-none border-none hidden md:block"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-4xl text-gray-400 hover:text-paletteBlack2 transition-colors p-0 bg-transparent shadow-none border-none hidden md:block"
        >
          &#8594;
        </button>
      </div>
      {/* Dots */}
      <div className="flex gap-2 mt-4">
        {recommendations.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-paletteBlack2" : "bg-gray-400"
            } transition-colors`}
            aria-label={`Go to recommendation ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";

interface Recommendation {
  name: string;
  text: string;
}

interface PersonalRecommendationsCarouselProps {
  recommendations: Recommendation[];
}

export default function PersonalRecommendationsCarousel({
  recommendations,
}: PersonalRecommendationsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const total = recommendations.length;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      next();
    } else if (isRightSwipe) {
      prev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div
        className="relative w-full rounded-xl p-2 md:p-8 flex flex-col items-center bg-transparent shadow-none touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <p className="text-sm md:text-lg text-paletteBlack text-center mb-4">
          &ldquo;{recommendations[current].text}&rdquo;
        </p>
        <span className="font-semibold text-paletteBlack text-sm md:text-base text-center">
          {recommendations[current].name}
        </span>
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

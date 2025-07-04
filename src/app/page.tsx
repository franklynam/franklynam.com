import Image from "next/image";
import Link from "next/link";
import PersonalRecommendationsCarousel from "@/components/PersonalRecommendationsCarousel";
import ImageGrid from "@/components/ImageGrid";

export default function Home() {
  return (
    <>
      <div className="text-white relative">
        {/* Hero Section */}
        <section className="flex items-center justify-between px-[4vw] min-h-[40vh] relative z-10 flex-wrap">
          {/* Left: Text */}
          <div className="max-w-xl z-20 mt-50 ">
            <h1 className="text-paletteWhite text-3xl md:text-4xl font-medium mb-4">
              Hi. I&apos;m <span className="text-[#cf5250]">Frank</span>
              <br />
              Engineering Leader
            </h1>
            <p className="text-paletteWhite brightness-[90%] text-base">
              Software engineering for me is a craft, one honed through years of
              practice in the pursuit of excellence.
            </p>
            <div className="flex gap-4 items-center mb-10">
              <Link
                href="/franklynam-resume-may2025-v1.pdf"
                className="main-button bg-paletteRed text-white text-sm md:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </Link>
              <Link
                href="#"
                className="main-button bg-paletteGold text-white text-sm md:text-base"
              >
                Intro
              </Link>
            </div>
          </div>
          {/* Right: Headshot */}
          <div className="absolute top-0 right-0 z-10 w-full max-w-[500px] aspect-[5/7] min-w-[420px] ml-auto flex items-center justify-end brightness-50">
            <Image
              src="/flynam-shed.png"
              alt="Frank Lynam"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </section>
        {/* Carousel Section: Personal Recommendations */}
        <section className="flex items-center justify-center px-[4vw] relative z-10 flex-wrap bg-paletteWhite min-h-[20vh] md:min-h-[30vh]">
          <PersonalRecommendationsCarousel />
        </section>
        {/* Strengths Section */}
        <section className="flex items-center justify-between relative z-10 flex-wrap bg-[#181818]">
          <ImageGrid />
        </section>
      </div>
    </>
  );
}

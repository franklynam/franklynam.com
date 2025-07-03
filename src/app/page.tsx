import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-[#0d0e22] text-white relative">
        {/* Hero Section */}
        <section className="flex items-center justify-between px-[4vw] min-h-[80vh] relative z-10 flex-wrap">
          {/* Left: Text */}
          <div className="max-w-xl z-20 mt-50 lg:mt-0">
            <h1 className="text-paletteWhite text-3xl md:text-4xl font-medium mb-4">
              Hi. I&apos;m <span className="text-[#cf5250]">Frank</span><br />
              Engineering Leader
            </h1>
            <p className="text-paletteWhite brightness-[90%] text-base">
              Software engineering for me is a craft, one honed through years of practice in the pursuit of excellence.
            </p>
            <div className="flex gap-4 items-center">
              <Link href="#" className="main-button bg-paletteRed text-white text-sm md:text-base">
                Download Resume
              </Link>
              <Link href="#" className="main-button bg-paletteGold text-white text-sm md:text-base">
                Intro
              </Link>
            </div>
          </div>
          {/* Right: Headshot */}
          <div className="absolute top-0 right-0 z-10 w-full max-w-[800px] aspect-[5/6] min-w-[220px] ml-auto flex items-center justify-end brightness-50">
            <Image src="/flynam-shed.png" alt="Frank Lynam" fill style={{ objectFit: 'cover' }} />
          </div>
        </section>
        {/* Strengths Section */}
        <section className="flex items-center justify-between py-10 px-[4vw] relative z-10 flex-wrap bg-[#fbf5f3]">
          {/* Left: Trophy Icon */}
          <div className="flex-1 justify-center items-start min-w-[220px] mb-10 hidden md:flex">
            <Image src="/wins.png" alt="Trophy" width={500} height={500} />
          </div>
          {/* Right: Strengths List */}
          <div className="strengths-section flex-2 flex flex-col gap-8 min-w-[280px]">
            <h2 className="text-paletteBlack font-semibold">What I bring to the table</h2>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="circle-number bg-paletteGold">1</div>
                <div>
                  <h3>Leadership</h3>
                  <p>I lead teams with empathy, clarity, and a focus on growth and collaboration.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="circle-number bg-paletteRed">2</div>
                <div>
                  <h3>Hands-on Approach</h3>
                  <p>I enjoy getting stuck in and getting my hands dirty.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="circle-number bg-paletteBlack2">3</div>
                <div>
                  <h3>System Design</h3>
                  <p>I architect robust systems that balance performance, reliability, and maintainability.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 900px) {
          section[style*='display: flex'] {
            flex-direction: column;
            align-items: stretch !important;
          }
          section[style*='display: flex'] > div:last-child {
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: 100vw !important;
          }
          .hero-text {
            margin-top: 400px !important;
          }
        }
        @media (max-width: 550px) {
          .hero-text {
            margin-top: 200px !important;
          }
        }
      `}</style>
    </>
  );
} 
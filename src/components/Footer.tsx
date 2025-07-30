import Link from "next/link";

const BLOG_DISPLAY: boolean = false;
const SOCIAL_INSTAGRAM: boolean = false;
const SOCIAL_LINKEDIN: boolean = true;

export default function Footer() {
  return (
    <footer className="bg-paletteBlack text-paletteWhite font-mono pt-8 pb-4 px-4 md:px-16 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full">
        {/* Left: Huge FRANK */}
        <div className="text-[8vw] md:text-[5vw] leading-none font-bold text-paletteRed tracking-tight select-none">
          FRANKLYNAM.COM
        </div>
        {/* Right: Let's Talk */}
        {BLOG_DISPLAY && (
          <div className="flex-1 flex flex-col items-end justify-end mt-4 md:mt-0">
            <span className="text-paletteRed text-4xl md:text-6xl font-normal mb-2">
              Let&apos;s Talk
            </span>
          </div>
        )}
      </div>
      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-base">
        {/* Contact */}
        <div>
          <div className="text-paletteRed text-xs mb-2 uppercase tracking-widest">
            Contact
          </div>
          <div>Frank Lynam</div>
          <div>frank@franklynam.com</div>
        </div>
        {/* Socials */}
        <div>
          <div className="text-paletteRed text-xs mb-2 uppercase tracking-widest">
            Socials
          </div>
          {SOCIAL_INSTAGRAM && (
            <Link
              href="https://instagram.com/flynam"
              className="block hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </Link>
          )}
          {SOCIAL_LINKEDIN && (
            <Link
              href="https://linkedin.com/in/frank-lynam"
              className="block hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          )}
        </div>
        {BLOG_DISPLAY && (
          /* Substack */
          <div>
            <div className="text-paletteRed text-xs mb-2 uppercase tracking-widest">
              Substack
            </div>
            <div className="mb-2">
              Subscribe{" "}
              <Link
                href="https://franklynam.substack.com"
                className="hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </Link>
              .
            </div>
          </div>
        )}
      </div>
      {/* Bottom row */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-xs gap-2 text-paletteWhite opacity-80">
        <div>
          Made by Frank Lynam using Next.js and Tailwind. Hosted on AWS Amplify.
          Image credits{" "}
          <Link href="/legal" className="hover:underline">
            here
          </Link>{" "}
          and privacy policy{" "}
          <Link href="/privacy" className="hover:underline">
            here
          </Link>
          .
        </div>
        <div>&copy; 2025 Frank Lynam</div>
      </div>
    </footer>
  );
}

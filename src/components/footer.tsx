import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#17181c] text-[#ededed] py-8 pb-4 text-center mt-auto brightness-90">
      <div className="mb-4 text-sm">
        <a href="/" className="mx-4 hover:text-white transition-colors">home</a>
        <a href="/about" className="mx-4 hover:text-white transition-colors">about</a>
        <a href="/contact" className="mx-4 hover:text-white transition-colors">contact</a>
        <a href="/blog" className="mx-4 hover:text-white transition-colors">blog</a>
      </div>
      <div className="mb-4 flex justify-center items-center">
        <Link href="https://twitter.com" target="_blank" rel="noopener" className="mx-2 hover:text-white transition-colors" aria-label="Twitter">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.46 5.924c-.793.352-1.646.59-2.54.698a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.36 4.1 7.6 1.67 4.98c-.386.664-.608 1.437-.608 2.26 0 1.56.794 2.94 2.003 3.75-.737-.023-1.43-.226-2.037-.563v.057c0 2.18 1.55 4 3.604 4.418-.377.102-.775.157-1.185.157-.29 0-.57-.028-.844-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 0 1 2 19.54a12.7 12.7 0 0 0 6.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.1 9.1 0 0 0 24 4.59a8.98 8.98 0 0 1-2.54.698z"/>
          </svg>
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener" className="mx-2 hover:text-white transition-colors" aria-label="Instagram">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37 2.668 2.337 2.396 3.51 2.338 4.788 2.279 6.068 2.266 6.477 2.266 12c0 5.523.013 5.932.072 7.212.058 1.278.33 2.451 1.297 3.418.967.967 2.14 1.239 3.418 1.297C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.278-.058 2.451-.33 3.418-1.297.967-.967 1.239-2.14 1.297-3.418.059-1.28.072-1.689.072-7.212 0-5.523-.013-5.932-.072-7.212-.058-1.278-.33-2.451-1.297-3.418C19.399.402 18.226.13 16.948.072 15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
          </svg>
        </Link>
        <Link href="https://linkedin.com" target="_blank" rel="noopener" className="mx-2 hover:text-white transition-colors" aria-label="LinkedIn">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-10h3v10zm-1.5-11.27c-.97 0-1.75-.79-1.75-1.76s.78-1.76 1.75-1.76c.97 0 1.75.79 1.75 1.76s-.78 1.76-1.75 1.76zm15.25 11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z"/>
          </svg>
        </Link>
      </div>
      <div className="text-sm">&copy; Frank Lynam 2025</div>
    </footer>
  );
} 
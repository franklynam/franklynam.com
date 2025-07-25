"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header relative top-0 left-0 w-full z-11">
      <nav className="w-full bg-transparent flex justify-center items-center py-8 px-4 absolute top-0 left-0 z-10">
        <div className="flex items-center gap-8 flex-1 ml-4">
          <Link href="/" className="flex items-center">
            {/* Full logo for md+ screens, mobile logo for sm screens */}
            <Image
              src="/title+logo.png"
              alt="Logo"
              height={60}
              width={140}
              className="hidden sm:inline h-[50px] w-auto object-contain"
            />
            <Image
              src="/logo.png"
              alt="Logo"
              height={40}
              width={40}
              className="inline sm:hidden h-[40px] w-[40px] object-contain"
            />
          </Link>
        </div>
        <ul className="site-nav hidden md:flex gap-10 list-none">
          <li>
            <Link href="/">home</Link>
          </li>
          <li>
            <Link href="/strengths">strengths</Link>
          </li>
          <li>
            <Link href="/contact">contact</Link>
          </li>
          <li>
            <Link href="https://medium.com/@flynam" target="_blank">
              blog
            </Link>
          </li>
        </ul>
        <button
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 bg-none border-none z-20 cursor-pointer"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <span className="w-7 h-[3px] bg-[#ededed] my-1 rounded transition-all"></span>
          <span className="w-7 h-[3px] bg-[#ededed] my-1 rounded transition-all"></span>
          <span className="w-7 h-[3px] bg-[#ededed] my-1 rounded transition-all"></span>
        </button>
        {/* Overlay: fully transparent but clickable */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ background: "transparent" }}
          onClick={() => setMenuOpen(false)}
        />
        {/* Slide-in Menu */}
        <nav
          className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-paletteBlack text-paletteWhite z-50 transition-transform duration-300 flex flex-col ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ willChange: "transform" }}
        >
          <button
            className="absolute top-4 right-4 text-2xl"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            &times;
          </button>
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              home
            </Link>
            <Link href="/strengths" onClick={() => setMenuOpen(false)}>
              strengths
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)}>
              contact
            </Link>
            <Link href="https://medium.com/@flynam" target="_blank">
              blog
            </Link>
          </div>
        </nav>
      </nav>
    </header>
  );
}

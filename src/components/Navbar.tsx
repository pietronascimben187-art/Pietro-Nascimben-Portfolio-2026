'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrambleLink } from './ScrambleLink';
import { LogoSVG } from './LogoSVG';

export function Navbar() {
  const [nameHovered, setNameHovered] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-6 px-6 md:px-12 z-50 mix-blend-difference pointer-events-none">
      <div className="flex items-center pointer-events-auto">
        <Link
          href="/"
          data-cursor="nav"
          onMouseEnter={() => setNameHovered(true)}
          onMouseLeave={() => setNameHovered(false)}
          className="relative font-mono font-bold text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
        >
          PORTFOLIO 2026

          {/* Anchored rectangle */}
          <motion.span
            className="absolute pointer-events-none border border-white"
            style={{ inset: '-6px -10px' }}
            initial={false}
            animate={{ opacity: nameHovered ? 1 : 0, scaleX: nameHovered ? 1 : 0.75 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          />
        </Link>
      </div>

      {/* Centered Logo */}
      <div id="navbar-logo-container" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
        <Link href="/about" data-cursor="nav" className="block w-[30px] md:w-[40px] hover:opacity-50 transition-opacity">
           <LogoSVG
              initial={{ fill: "#ffffff", stroke: "transparent", opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              className="w-full h-full"
           />
        </Link>
      </div>

      <div className="flex gap-6 md:gap-14 pointer-events-auto">
        <ScrambleLink href="/work">INDEX</ScrambleLink>
        <ScrambleLink href="/about">ABOUT ME</ScrambleLink>
        <ScrambleLink href="/about#contact">CONTACT</ScrambleLink>
      </div>
    </nav>
  );
}

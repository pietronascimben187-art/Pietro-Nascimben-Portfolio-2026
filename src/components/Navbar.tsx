'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ScrambleLink } from './ScrambleLink';
import { LogoSVG } from './LogoSVG';

export function Navbar() {
  const [nameHovered, setNameHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center py-6 px-6 md:px-12 z-50 mix-blend-difference pointer-events-none">
        <div className="flex items-center pointer-events-auto">
          <Link
            href="/"
            data-cursor="nav"
            onMouseEnter={() => setNameHovered(true)}
            onMouseLeave={() => setNameHovered(false)}
            className="relative font-mono font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors"
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

        {/* Centered Logo (Hidden on mobile to save space) */}
        <div id="navbar-logo-container" className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <Link href="/about" data-cursor="nav" className="block w-[40px] hover:opacity-50 transition-opacity">
             <LogoSVG
                initial={{ fill: "#ffffff", stroke: "transparent", opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
                className="w-full h-full"
             />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-14 pointer-events-auto">
          <ScrambleLink href="/work">INDEX</ScrambleLink>
          <ScrambleLink href="/about">ABOUT ME</ScrambleLink>
          <ScrambleLink href="/about#contact">CONTACT</ScrambleLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setMenuOpen(true)}
            className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-white/70"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col px-6 py-6"
        >
          {/* Header of Mobile Menu */}
          <div className="flex justify-between items-center">
            <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-white/30">
              NAVIGATION
            </span>
            <button 
              onClick={() => setMenuOpen(false)}
              className="font-mono font-bold text-xs tracking-[0.2em] uppercase text-white hover:text-white/70"
            >
              CLOSE
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex-1 flex flex-col justify-center items-start gap-10">
            <Link href="/work" onClick={() => setMenuOpen(false)} className="text-white text-5xl sm:text-6xl uppercase font-bold tracking-tighter">INDEX</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-white text-5xl sm:text-6xl uppercase font-bold tracking-tighter">ABOUT ME</Link>
            <Link href="/about#contact" onClick={() => setMenuOpen(false)} className="text-white text-5xl sm:text-6xl uppercase font-bold tracking-tighter">CONTACT</Link>
          </div>
          
          {/* Footer Logo in Menu */}
          <div className="pb-8 w-10">
             <LogoSVG
                initial={{ fill: "#ffffff", stroke: "transparent", opacity: 0.5, x: 0, y: 0, rotate: 0, scale: 1 }}
                className="w-full h-auto"
             />
          </div>
        </motion.div>
      )}
    </>
  );
}

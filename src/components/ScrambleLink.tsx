'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLenis } from '@studio-freight/react-lenis';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function ScrambleLink({ href, children }: { href: string, children: string }) {
  const [text, setText] = useState(children);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const pathname = usePathname();
  const lenis = useLenis();

  const handleMouseEnter = () => {
    setHovered(true);
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setText((_) =>
        children.split("").map((letter, index) => {
          if (index < iteration) {
            return children[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= children.length) {
        clearInterval(intervalRef.current!);
      }
      iteration += 1 / 3;
    }, 30);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setText(children);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (pathname === path || (path === '' && pathname === '/about')) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(`#${hash}`, { offset: -50 });
        }
      }
    }
  };

  return (
    <Link
      href={href}
      data-cursor="nav"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
    >
      {text}

      {/* Thin-bordered rectangle — anchored to the text, adapts to its width */}
      <motion.span
        className="absolute pointer-events-none border border-white"
        style={{ inset: '-6px -10px' }}
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0.75 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
    </Link>
  );
}

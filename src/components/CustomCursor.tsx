'use client';
import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const onNav = target.closest('[data-cursor="nav"]') !== null;

      if (onNav) {
        setIsNavHovered(true);
        setIsHovered(false);
      } else if (
        target.tagName.toLowerCase() === 'a' ||
        target.closest('a') ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsHovered(true);
        setIsNavHovered(false);
      } else {
        setIsHovered(false);
        setIsNavHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const smoothX = useSpring(mousePosition.x, { damping: 40, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mousePosition.y, { damping: 40, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    smoothX.set(mousePosition.x);
    smoothY.set(mousePosition.y);
  }, [mousePosition, smoothX, smoothY]);

  return (
    <>
      <style>{`
         @media (hover: hover) and (pointer: fine) {
           body { cursor: none; }
           a, button { cursor: none !important; }
         }
      `}</style>

      {/* Circle cursor — hidden on nav hover & hidden entirely on mobile */}
      <motion.div
        className="hidden md:flex fixed top-0 left-0 w-20 h-20 rounded-full border-[4px] border-white pointer-events-none z-[9999] mix-blend-difference items-center justify-center"
        animate={{
          scale: isNavHovered ? 0 : (isHovered ? 1 : 0.4),
          opacity: isNavHovered ? 0 : 1,
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{
          scale: { duration: 0.35, ease: 'easeOut' },
          opacity: { duration: 0.2, ease: 'easeOut' },
        }}
      >
        {/* Small dot — visible when idle */}
        <motion.div
          className="absolute w-2.5 h-2.5 bg-white rounded-full"
          animate={{ opacity: isHovered ? 0 : 1, scale: isHovered ? 0.5 : 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        />

        {/* Bold arrow — visible on regular link hover */}
        <motion.div
          className="absolute"
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.55 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-9 h-9 text-white"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}

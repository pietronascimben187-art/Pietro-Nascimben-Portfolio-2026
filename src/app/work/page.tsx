'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const PROJECTS = [
  {
    id: 1,
    title: 'THE BLISTER',
    type: 'SPORTS & PRODUCT DESIGN',
    year: '2025',
    cover: '/images/projects/the_blister_home.png',
    description: "The Blister is a project carried out through a joint collaboration with the BVA Academy sports association, which aims to enable children aged 8 to 18 with physical or cognitive disabilities to enter the world of sport.",
  },
  {
    id: 2,
    title: 'SERVE.FLOW',
    type: 'TECHNO BODIES',
    year: '2026',
    cover: '/images/projects/3.png',
    description: "Serve flow aims to reduce fatigue and give support through an essential approach, avoiding heavy electronics and components. The product is based on the mechanics of elastic material and the mechanical joint.",
  },
  {
    id: 3,
    title: 'HASU',
    type: 'ARCHITECTURE',
    year: '2023',
    cover: '/images/projects/hasu/1.png?v=2',
    description: "Hasu is a passive, modular wool‑based surface designed to mediate indoor air through geometry and material chemistry. A porous skin where petal‑like modules slow, diffuse, and redirect airflow, allowing it to interact with wool over time.",
  },
  {
    id: 4,
    title: 'TAKE A BREATH',
    type: 'PRODUCT & UX DESIGN',
    year: '2025',
    cover: '/images/projects/take-a-breath/12.png',
    description: "Take a Breath is a project based on the design of a series of air filters that allow people to take care of their homes and health through the correct application of new technologies such as AI. The purpose is not only functional but also to create a personal experience.",
  },
  {
    id: 5,
    title: 'MOLD.E',
    type: 'R&D',
    year: '2026',
    cover: '/images/projects/Mold.e/1.png?v=2',
    description: "MOLD.E explores the intersection of organic growth and synthetic structure, pushing the boundaries of material research and design.",
  },
];

// Identical to the BoldArrow in project detail pages
function BoldArrow({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

// Image height = full expanded panel height (fills white space up to the title row)
const IMG_H = 300;

function ProjectRow({
  proj,
  index,
  anyHovered,
  onHover,
}: {
  proj: typeof PROJECTS[0];
  index: number;
  anyHovered: boolean;
  onHover: (id: number | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    // Scroll-in entry animation
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.07 }}
    >
      <Link
        href={`/projects/${proj.id}`}
        className="block cursor-none"
        onMouseEnter={() => { setHovered(true); onHover(proj.id); }}
        onMouseLeave={() => { setHovered(false); onHover(null); }}
      >
        {/* Dimming wrapper — non-hovered rows fade out */}
        <motion.div
          className="w-full border-b border-black/10"
          animate={{ opacity: anyHovered && !hovered ? 0.15 : 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >

          {/* ── Always-visible row header ──────────────────────────── */}
          <div className="flex items-center py-5 md:py-8 gap-5 md:gap-10 w-full">

            {/* Index number */}
            <span className="font-mono text-[9px] tracking-[0.35em] text-black/25 w-5 shrink-0 select-none">
              {String(index + 1).padStart(2, '0')}
            </span>

            {/* Project title — slides right on hover */}
            <motion.span
              className="font-bold tracking-tighter uppercase leading-none"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }}
              animate={{ x: hovered ? 12 : 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {proj.title}
            </motion.span>

            {/* Bold Arrow — same style as MORE button, appears on hover */}
            <motion.div
              className="shrink-0"
              animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -14 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <BoldArrow className="w-5 h-5 md:w-6 md:h-6" />
            </motion.div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Category */}
            <span className="hidden md:block font-mono text-[9px] tracking-[0.25em] uppercase text-black/30 w-44 xl:w-52 text-right shrink-0">
              {proj.type}
            </span>

            {/* Year */}
            <span className="font-mono text-[9px] tracking-[0.3em] text-black/22 w-8 text-right shrink-0">
              {proj.year}
            </span>
          </div>

          {/* ── Expandable panel ─────────────────────────────────────── */}
          {/* height: 'auto' lets the panel grow to fit description; minHeight ensures image is fully visible */}
          <motion.div
            className="w-full overflow-hidden"
            initial={false}
            animate={{ height: hovered ? 'auto' : 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Container is exactly IMG_H tall — image fills it flush, no dead space */}
            <div className="relative" style={{ minHeight: `${IMG_H}px` }}>

              {/* Description — internal padding keeps text off the edges */}
              <motion.div
                style={{
                  paddingLeft: 'calc(1.25rem + 2rem)',
                  paddingTop: '8px',
                  paddingBottom: '32px',
                  maxWidth: '38%',
                }}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: hovered ? 0.18 : 0 }}
              >
                <p
                  className="font-sans text-black/50 leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.78rem, 1.2vw, 0.96rem)',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                  }}
                >
                  {proj.description}
                </p>
              </motion.div>

              {/* Image — clip-reveal from the bottom border.
                  Container sits flush with the bottom bar (bottom:0, overflow:hidden).
                  Image starts at y=IMG_H (below the clip → invisible) then slides up
                  to y=0 only AFTER the panel has finished expanding (delay = 0.62s). */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: '55%',
                transform: 'translateX(-50%)',
                height: `${IMG_H}px`,
                overflow: 'hidden',
              }}>
                <motion.div
                  animate={{ y: hovered ? 0 : IMG_H }}
                  transition={{
                    duration: hovered ? 0.75 : 0.35,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0,
                  }}
                >
                  <img
                    src={proj.cover}
                    alt={proj.title}
                    style={{ height: `${IMG_H}px`, width: 'auto', display: 'block' }}
                  />
                </motion.div>
              </div>

            </div>
          </motion.div>

        </motion.div>
      </Link>
    </motion.div>
  );
}

export default function WorkIndex() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-white text-black pt-28 md:pt-36 pb-96 px-6 md:px-12 cursor-none">
      {/* overflow-x wrapper kept separate so it never clips vertical content */}
      <div className="w-full" style={{ overflowX: 'clip' }}>

      {/* ── Page header ─────────────────────────────────────────── */}
      <motion.div
        className="w-full flex justify-between items-end border-b border-black/15 pb-4 mb-0 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <h1 className="text-2xl md:text-4xl font-bold tracking-tighter uppercase leading-none">
          INDEX
        </h1>
        <p className="font-mono text-[10px] opacity-40 uppercase tracking-[0.3em] hidden md:block self-end pb-1">
          Pietro Nascimben · Selected Works
        </p>
      </motion.div>

      {/* ── Vertical project list ──────────────────────────────── */}
      <div className="w-full flex flex-col">
        {PROJECTS.map((proj, i) => (
          <ProjectRow
            key={proj.id}
            proj={proj}
            index={i}
            anyHovered={activeId !== null}
            onHover={setActiveId}
          />
        ))}
      </div>

      {/* ── Footer count ─────────────────────────────────────── */}
      <motion.div
        className="mt-10 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <span className="font-mono text-[9px] tracking-[0.35em] text-black/20 uppercase">
          {PROJECTS.length} projects total
        </span>
      </motion.div>

      </div>{/* end overflow-x:clip wrapper */}
    </div>
  );
}

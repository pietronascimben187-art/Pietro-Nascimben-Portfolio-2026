'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
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

/* ── Image-cursor that follows the mouse on the desktop list ── */
function ImageCursor({ activeCover }: { activeCover: string | null }) {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const raf = useRef<number | null>(null);
  const target = useRef({ x: -999, y: -999 });
  const current = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    const loop = () => {
      // Smooth lerp following
      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      setPos({ x: current.current.x, y: current.current.y });
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9998]"
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      <AnimatePresence mode="wait">
        {activeCover && (
          <motion.img
            key={activeCover}
            src={activeCover}
            alt=""
            initial={{ opacity: 0, scale: 0.75, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-[280px] h-auto block"
            style={{ x: '-50%', y: '-50%' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}



/* ── Desktop project row — no expanding panel ── */
function ProjectRow({
  proj,
  index,
  anyHovered,
  onHover,
}: {
  proj: typeof PROJECTS[0];
  index: number;
  anyHovered: boolean;
  onHover: (proj: typeof PROJECTS[0] | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.07 }}
    >
      <Link
        href={`/projects/${proj.id}`}
        className="block cursor-none"
        data-cursor="image"
        onMouseEnter={() => { setHovered(true); onHover(proj); }}
        onMouseLeave={() => { setHovered(false); onHover(null); }}
      >
        {/* Dimming wrapper */}
        <motion.div
          className="w-full border-b border-black/10"
          animate={{ opacity: anyHovered && !hovered ? 0.15 : 1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
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
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ── Mobile project row (unchanged) ── */
function MobileProjectRow({
  proj,
  index,
}: {
  proj: typeof PROJECTS[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: index * 0.05 }}
      className="flex flex-col gap-5 w-full mb-16"
    >
      <Link href={`/projects/${proj.id}`} className="block w-full">
        <div className="w-full aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
          <img
            src={proj.cover}
            alt={proj.title}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/projects/${proj.id}`}>
            <h2 className="font-bold tracking-tighter uppercase leading-none text-4xl sm:text-5xl">
              {proj.title}
            </h2>
          </Link>
          <span className="font-mono text-[10px] tracking-[0.25em] text-black/30 mt-1 shrink-0">
            {proj.year}
          </span>
        </div>

        <div className="flex justify-between items-center border-b border-black/10 pb-4">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-black/50">
            {proj.type}
          </span>
          <span className="font-mono text-[9px] tracking-[0.35em] text-black/20 select-none">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <p className="font-sans text-black/60 leading-relaxed text-sm pt-2">
          {proj.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Page ── */
export default function WorkIndex() {
  const [activeProj, setActiveProj] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-white text-black pt-28 md:pt-36 pb-96 px-6 md:px-12 cursor-none">

      {/* Image-cursor — desktop only (hidden on mobile via pointer media) */}
      <div className="hidden md:block">
        <ImageCursor activeCover={activeProj?.cover ?? null} />
      </div>

      <div className="w-full" style={{ overflowX: 'clip' }}>

        {/* ── Page header ── */}
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

        {/* ── Desktop list ── */}
        <div className="hidden md:flex w-full flex-col">
          {PROJECTS.map((proj, i) => (
            <ProjectRow
              key={proj.id}
              proj={proj}
              index={i}
              anyHovered={activeProj !== null}
              onHover={setActiveProj}
            />
          ))}
        </div>

        {/* ── Mobile list ── */}
        <div className="flex md:hidden w-full flex-col mt-8">
          {PROJECTS.map((proj, i) => (
            <MobileProjectRow
              key={proj.id}
              proj={proj}
              index={i}
            />
          ))}
        </div>

        {/* ── Footer count ── */}
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

      </div>
    </div>
  );
}

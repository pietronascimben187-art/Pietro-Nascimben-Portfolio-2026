'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

import Link from 'next/link';

const PROJECTS = [
// ... we will splice properly below

  {
    id: 1,
    title: 'THE BLISTER',
    type: 'SPORTS AND PRODUCT DESIGN',
    year: '2025',
    client: 'DARPHIN',
    src: '/images/projects/TOTALE CHIUSO NO HDRI.png',
    bg: 'white',
    color: 'black',
    isReduced: true
  },
  {
    id: 2,
    title: 'SERVE.FLOW',
    type: 'TECHNO BODIES',
    year: '2026',
    src: '/images/projects/colored_2.png',
    bg: 'black',
    color: 'white'
  },
  {
    id: 3,
    title: 'HASU',
    type: 'Product and Systemic Design',
    year: '2026',
    src: '/images/projects/hasu/1.png?v=3',
    bg: 'white',
    color: 'black',
    isReduced: true
  },
  {
    id: 4,
    title: 'TAKE A BREATH',
    type: 'Product and UX Design',
    year: '2025',
    src: '/images/projects/take-a-breath/copertina.png',
    bg: 'black',
    color: 'white'
  },
  {
    id: 5,
    title: 'MOLD.E',
    type: 'R&D',
    year: '2026',
    src: '/images/projects/Mold.e/1.png?v=2',
    bg: 'white',
    color: 'black',
    isReduced: true,
    scale: 1.35
  }
];

const SCRAMBLE_CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

function SlideTitle({ text, className }: { text: string, className?: string }) {
  return (
    <motion.h2 
      className={className}
      initial={{ x: -20, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.h2>
  );
}

function ParallaxSlide({ proj }: { proj: typeof PROJECTS[0] }) {
  const ref = useRef(null);
  
  // Track this section's progress as it enters the viewport from the bottom
  // Start: when the top of this section hits the bottom of the viewport
  // End: when the top of this section hits the top of the viewport (and sticks)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  // The image translates down slightly while revealing to create an opposing 
  // parallax depth effect, exactly like Bisous does when sliding up.
  // Restored full-bleed parallax
  // Define transforms at the top level of the component to follow Rules of Hooks
  const yNormal = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const yReduced = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const scaleNormal = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section 
      ref={ref}
      className={`sticky top-0 h-[100svh] w-full flex flex-col md:justify-center overflow-hidden ${proj.bg === 'black' ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      {/* ── Title Container (Top on mobile, Centered on desktop) ── */}
      <div className="relative z-30 w-full px-6 md:px-16 pt-32 md:pt-0 flex flex-col uppercase pointer-events-none">
         <div className={`flex items-center gap-4 ${proj.color === 'white' ? 'text-white' : 'text-black'} font-sans mb-2 pointer-events-none`}>
            <span className="font-mono text-sm tracking-widest font-bold uppercase">PROJECT {proj.id}</span>
            <span className="opacity-30">/</span>
            <span className="font-mono text-[10px] tracking-widest uppercase">{(proj as any).year}</span>
            <span className="opacity-30">/</span>
            <span className="font-mono text-[10px] tracking-widest uppercase">{(proj as any).type}</span>
         </div>
         <Link href={`/projects/${proj.id}`} className="relative w-fit cursor-none group py-4 px-8 -ml-8 -mt-4 pointer-events-auto">
           {/* Animated Drawing Box */}
           <span className={`absolute top-2 left-4 right-4 h-[1px] ${proj.color === 'white' ? 'bg-white/40' : 'bg-black/40'} origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]`} />
           <span className={`absolute bottom-2 left-4 right-4 h-[1px] ${proj.color === 'white' ? 'bg-white/40' : 'bg-black/40'} origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]`} />
           <span className={`absolute top-2 bottom-2 left-4 w-[1px] ${proj.color === 'white' ? 'bg-white/40' : 'bg-black/40'} origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]`} />
           <span className={`absolute top-2 bottom-2 right-4 w-[1px] ${proj.color === 'white' ? 'bg-white/40' : 'bg-black/40'} origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)]`} />
           
           {/* Title Text (Massively enlarged on mobile) */}
           <SlideTitle 
             text={proj.title} 
             className={`text-6xl sm:text-7xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-none ${proj.color === 'white' ? 'text-white' : 'text-black'} mix-blend-normal opacity-100 transition-all duration-500`}
           />
         </Link>
      </div>

      {/* ── Image Container (Bottom flex-1 on mobile, absolute inset-0 on desktop) ── */}
      <div className={`relative flex-1 mt-8 mb-12 md:m-0 md:absolute md:inset-0 w-full md:h-full flex ${proj.isReduced ? (proj.id === 1 ? 'items-end justify-center md:justify-end' : proj.id === 5 ? 'items-center md:items-start justify-center md:justify-end' : 'items-center justify-center md:justify-end') : 'items-center justify-center md:items-center md:justify-center'} overflow-hidden pointer-events-none`}>
         <div className={`relative ${proj.isReduced ? 'w-[90vw] md:w-[80vw] h-[100%] md:h-[80vh] z-20' : 'w-[90vw] md:w-full h-full md:overflow-hidden'} pointer-events-none`}>
            <motion.div 
              className={`absolute inset-0 w-full ${proj.isReduced ? 'h-[110%] top-0' : 'h-[100%] md:h-[120%] top-0 md:top-[-10%]'} pointer-events-none`}
              style={{ 
                y: proj.isReduced ? yReduced : yNormal, 
                scale: (proj as any).scale ? (proj as any).scale : (proj.isReduced ? 1.05 : scaleNormal)
              }}
            >
               <Image 
                 src={proj.src} 
                 alt={proj.title}
                 fill
                 unoptimized
                 className={`${proj.isReduced ? (proj.id === 3 ? 'object-contain object-top' : 'object-contain md:object-cover object-center md:object-bottom md:object-right') : 'object-cover md:object-cover rounded-xl md:rounded-none'} brightness-[1.0] pointer-events-none`}
               />
            </motion.div>
         </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Throbbing splash counter typical of premium agencies
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 4;
      if (current >= 100) {
        setCounter(100);
        clearInterval(interval);
        setTimeout(() => setLoading(false), 500); 
      } else {
        setCounter(current);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-white">
      
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%' }} // Slides up cleanly like a curtain
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#e5e5e5] flex flex-col items-center justify-center text-black"
          >
             <div className="font-mono text-[10rem] md:text-[15rem] font-black tracking-tighter mix-blend-difference opacity-80">
                {counter.toString().padStart(3, '0')}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full pb-0">
         {PROJECTS.map((proj) => (
            <ParallaxSlide key={proj.id} proj={proj} />
         ))}
      </main>

    </div>
  );
}

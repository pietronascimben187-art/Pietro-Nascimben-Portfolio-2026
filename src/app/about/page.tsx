'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { useLenis } from '@studio-freight/react-lenis';

// ─── Shared animation preset (matches work index + project pages) ────────────
const ease = [0.215, 0.61, 0.355, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Thin separator line matching the work index ─────────────────────────────
function Rule({ className = '' }: { className?: string }) {
  return <div className={`w-full border-b border-black/10 ${className}`} />;
}

// ─── Mono micro-label (identical to work index metadata labels) ───────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-black/30 select-none">
      {children}
    </span>
  );
}

// ─── Fields of practice ──────────────────────────────────────────────────────
const FIELDS = [
  {
    index: '01',
    title: 'PRODUCT DESIGN',
    desc: 'Physical objects designed for endurance — from ergonomic tools to adaptive sporting equipment.',
  },
  {
    index: '02',
    title: 'UX / UI DESIGN',
    desc: 'Interfaces built around human behaviour, clarity of information, and interaction precision.',
  },
  {
    index: '03',
    title: 'EXTENSION DESIGN',
    desc: 'Modular accessories and complementary systems that extend the function and life of primary products.',
  },
  {
    index: '04',
    title: 'R & D',
    desc: 'Experimental explorations at the boundary of organic growth and synthetic fabrication.',
  },
  {
    index: '05',
    title: '3D ARTIST',
    desc: 'Digital sculpting, photorealistic rendering, and 3D visualization as integral tools for design communication.',
  },
];

// ─── Tools / Software — with proficiency levels ───────────────────────────────
const TOOLS = [
  { name: 'Rhinoceros 3D',         level: 90 },
  { name: 'Cinema 4D',              level: 86 },
  { name: 'KeyShot',               level: 86 },
  { name: 'Blender',               level: 78 },
  { name: 'Figma',                 level: 70 },
  { name: 'Adobe Creative Suite',  level: 92 },
  { name: 'Fusion 360',            level: 82 },
  { name: 'Next.js',               level: 65 },
  { name: 'Framer',                level: 70 },
];

// ─── Languages ───────────────────────────────────────────────────────────────
const LANGUAGES = [
  { name: 'Italian',  level: 'C2' },
  { name: 'English',  level: 'B2', numericLevel: 3.5 }, // Metà tra B2 e C1
  { name: 'Spanish',  level: 'A2' },
];

const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

// ─── Experience ──────────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    role: 'External Collaborator',
    company: 'IED Milano · MI',
    period: 'Jan 2026 — Jun 2026 (expected)',
    current: true,
    desc: "Development of a database and classification system for projects produced by the IED Milano Master's degrees, in collaboration with the Head of MA Degrees.",
  },
  {
    role: 'Tutor',
    company: 'IED Milano · MI',
    period: 'Oct 2024 — Now',
    current: true,
    desc: 'Coordinate the classroom environment with the student office, providing regular and formal feedback to teachers and students.',
  },
  {
    role: '3D Interior Artist',
    company: 'Studio Piazzogna · TV',
    period: 'Mar 2024 — Apr 2024',
    current: false,
    desc: 'Creation of renders for clients with chosen disposition. Preparation of definitive technical drawings.',
  },
  {
    role: 'Printer Specialist',
    company: 'Logos 2005 · TV',
    period: 'Mar 2019 — Apr 2019',
    current: false,
    desc: 'Working closely with the manager to develop orders, choose the papers and prepare the files.',
  },
];

// ─── Education ───────────────────────────────────────────────────────────────
const EDUCATION = [
  {
    role: 'IED Milano',
    company: 'Milano · MI',
    period: 'Sep 2024 — Jul 2026 (expected)',
    current: true,
    desc: "Master's Degree in Product Design — Techno Bodies for Equal Futures",
    language: "English",
  },
  {
    role: 'ISIA Roma Design',
    company: 'sede Pordenone · PN',
    period: 'Oct 2021 — Oct 2024',
    current: false,
    desc: 'Academic Degree in Industrial Design — 1° Level',
    language: "Italian",
  },
  {
    role: 'ITG Andrea Palladio',
    company: 'Treviso · IT',
    period: 'Sep 2016 — Jun 2021',
    current: false,
    desc: 'High School Diploma in Graphic and Communication',
  },
];

// ─── Animated skill bar ───────────────────────────────────────────────────────
function SkillBar({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });

  return (
    <div
      ref={ref}
      className="flex items-center gap-5 md:gap-8 py-4 border-b border-black/8"
    >
      {/* Tool name */}
      <span
        className="font-mono uppercase text-black/70 shrink-0 w-44"
        style={{ fontSize: '11px', letterSpacing: '0.12em' }}
      >
        {tool.name}
      </span>

      {/* Track + fill */}
      <div className="flex-1 relative h-px bg-black/10 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-black"
          style={{ originX: 0, width: '100%' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: tool.level / 100 } : { scaleX: 0 }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.06,
          }}
        />
      </div>

      {/* Percentage */}
      <span
        className="font-mono text-black/22 shrink-0 w-7 text-right"
        style={{ fontSize: '9px', letterSpacing: '0.15em' }}
      >
        {tool.level}
      </span>
    </div>
  );
}

// ─── Timeline entry ───────────────────────────────────────────────────────────
function TimelineEntry({
  period, role, company, desc, language, current, index,
}: {
  period: string;
  role: string;
  company: string;
  desc?: string;
  language?: string;
  current?: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-4%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease, delay: index * 0.09 }}
      className="relative pl-5 pb-8 last:pb-0"
    >
      {/* Dot */}
      <div className="absolute -left-[4.5px] top-[4px]">
        {current ? (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-25" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
          </span>
        ) : (
          <div className="w-2 h-2 rounded-full border border-black/25 bg-white" />
        )}
      </div>

      {/* Period */}
      <span className="block font-mono text-[9px] tracking-[0.28em] uppercase text-black/30 mb-1">
        {period}
      </span>

      {/* Role */}
      <p
        className="font-bold tracking-tight text-black/85 leading-snug mb-0.5"
        style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.92rem)' }}
      >
        {role}
      </p>

      {/* Company */}
      <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-black/35 mb-2">
        {company}
      </p>

      {/* Description */}
      {desc && (
        <p
          className="font-sans text-black/40 leading-relaxed"
          style={{ fontSize: 'clamp(0.72rem, 0.95vw, 0.82rem)' }}
        >
          {desc}
        </p>
      )}

      {/* Language */}
      {language && (
        <p
          className="font-mono text-[9px] tracking-[0.18em] uppercase text-black/35 mt-1"
        >
          Language: <span className="font-bold text-black/60">{language}</span>
        </p>
      )}
    </motion.div>
  );
}

function LanguageBar({ lang, index }: { lang: typeof LANGUAGES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-6%' });
  const activeIndex = (lang as any).numericLevel !== undefined 
    ? (lang as any).numericLevel 
    : CEFR_LEVELS.indexOf(lang.level);

  return (
    <div
      ref={ref}
      className="flex items-center gap-5 md:gap-8 py-5 border-b border-black/8"
    >
      {/* Lang name */}
      <span
        className="font-mono uppercase text-black/70 shrink-0 w-24 md:w-44"
        style={{ fontSize: '11px', letterSpacing: '0.12em' }}
      >
        {lang.name}
      </span>

      {/* Nodes */}
      <div className="flex-1 flex justify-between relative px-1">
        {/* Connection Line (Track) */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-black/10 -translate-y-1/2" />
        
        {/* Active Fill Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-px bg-black -translate-y-1/2"
          style={{ originX: 0, width: '100%' }}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: activeIndex / (CEFR_LEVELS.length - 1) } : { scaleX: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
        />
        
        {CEFR_LEVELS.map((lvl, i) => {
          const isActive = i <= activeIndex;
          return (
            <div key={lvl} className="relative flex flex-col items-center">
              <motion.div 
                className={`w-1.5 h-1.5 rounded-full z-10 ${isActive ? 'bg-black' : 'bg-white border border-black/15'}`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              />
              <span 
                className={`absolute top-4 font-mono select-none ${isActive ? 'text-black/50 font-bold' : 'text-black/15'}`}
                style={{ fontSize: '7px', letterSpacing: '0.05em' }}
              >
                {lvl}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Field row ────────────────────────────────────────────────────────────────
function FieldRow({ field, index }: { field: typeof FIELDS[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-4%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay: index * 0.06 }}
    >
      <div className="group flex items-start gap-6 md:gap-10 py-6 md:py-8 border-b border-black/10 cursor-none">
        {/* Index */}
        <span className="font-mono text-[9px] tracking-[0.35em] text-black/20 w-5 shrink-0 pt-1">
          {field.index}
        </span>

        {/* Title */}
        <span
          className="font-bold tracking-tighter uppercase leading-none"
          style={{ fontSize: 'clamp(1.4rem, 3.5vw, 3rem)' }}
        >
          {field.title}
        </span>

        {/* Description */}
        <motion.span
          className="font-sans text-black/45 leading-relaxed ml-auto text-right hidden md:block shrink-0"
          style={{
            fontSize: 'clamp(0.7rem, 1vw, 0.82rem)',
            maxWidth: '32ch',
            fontWeight: 400,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.06 + 0.2 }}
        >
          {field.desc}
        </motion.span>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis && window.location.hash) {
      setTimeout(() => {
        lenis.scrollTo(window.location.hash, { offset: -50 });
      }, 300);
    }
  }, [lenis]);

  return (
    <div className="relative w-full min-h-screen bg-white text-black cursor-none" style={{ overflowX: 'clip' }}>

      {/* ══════════════════════════════════════════════════════════
          HERO — above the fold
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 md:pb-16 min-h-[80vh] md:min-h-[50vw]">

        {/* Role label */}
        <FadeUp delay={0.05}>
          <Label>Multidisciplinary Designer · Based in Italy</Label>
        </FadeUp>

        {/* Large name */}
        <FadeUp delay={0.12} className="mt-4 md:mt-6 relative">
          <h1
            className="font-bold tracking-tighter uppercase leading-[0.88] text-black"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 11rem)' }}
          >
            Pietro<br />Nascimben
          </h1>

          {/* Portrait photo — mirrored, sits on last letter 'N' of NASCIMBEN */}
          <motion.div
            className="absolute pointer-events-none"
            style={{ left: 'calc(45% - 20px)', bottom: '-125px', zIndex: 10 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            <img
              src="/images/posa.png"
              alt="Pietro Nascimben"
              className="h-[59.5vh] md:h-[37.4vw]"
              style={{
                width: 'auto',
                display: 'block',
                transform: 'scaleX(-1)',
              }}
            />
          </motion.div>
        </FadeUp>

        <Rule className="mt-10 md:mt-14" />

        {/* Short intro statement */}
        <FadeUp delay={0.22} className="mt-7 flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-0">
          <p
            className="font-sans text-black/55 leading-relaxed flex-1"
            style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', maxWidth: '56ch' }}
          >
            My life has always been guided by planning, with the awareness that unexpected events
            are always just around the corner. I am a highly active person and continue to train
            competitively in canoeing. Sharing and passing on my passion is an essential part of
            who I am, which is why I also work as an instructor and coach. I carefully choose where
            to invest my time, organizing and managing my commitments with intention and consistency.
            I consider myself both rational and driven by emotion — an approach that often proves
            to be both my greatest strength and, at times, a challenge.
          </p>

          {/* Available status */}
          <div className="md:ml-auto flex items-center gap-2 shrink-0 md:self-end md:mb-1">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-20" />
              <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-black" />
            </span>
            <Label>Available for projects · 2025</Label>
          </div>
        </FadeUp>



      </section>

      {/* ══════════════════════════════════════════════════════════
          BIO
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-10 md:gap-20">

          {/* Left label column */}
          <FadeUp className="md:w-32 shrink-0">
            <Label>Background</Label>
          </FadeUp>

          {/* Right text column */}
          <div className="flex-1 max-w-2xl space-y-6">
            <FadeUp delay={0.08}>
              <p
                className="font-sans text-black/70 leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
              >
                I am Pietro Nascimben, a product and industrial designer with a cross-disciplinary
                practice spanning physical products, architectural surfaces, and digital interfaces.
                My work is rooted in rigorous research and a clear material sensibility — objects
                that earn their presence through function, not decoration.
              </p>
            </FadeUp>
            <FadeUp delay={0.14}>
              <p
                className="font-sans text-black/55 leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
              >
                I approach each project as a system — understanding constraints, user behaviour,
                and manufacturing logic before reaching for form. This allows me to produce work
                that is not only visually coherent but genuinely resolved at every scale,
                from a hinge detail to a spatial installation.
              </p>
            </FadeUp>
            <FadeUp delay={0.20}>
              <p
                className="font-sans text-black/55 leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
              >
                Recent work includes adaptive equipment for Paralympic sport in collaboration with
                BVA Academy, passive air-conditioning systems using bio-based materials, and
                wearable exoskeletal support for ergonomic healthcare environments.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* ── Timeline: Experience + Education ──────────────────── */}
        <div className="w-full mt-14 md:mt-16">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">

            {/* Experience */}
            <div className="flex-1">
              <FadeUp delay={0.04}>
                <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-black/30 pb-4 border-b border-black/10 mb-6">
                  Experience
                </p>
              </FadeUp>
              <div className="border-l border-black/10 ml-[3.5px]">
                {EXPERIENCE.map((item, i) => (
                  <TimelineEntry key={item.role} {...item} index={i} />
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="flex-1">
              <FadeUp delay={0.1}>
                <p className="font-mono text-[9px] tracking-[0.32em] uppercase text-black/30 pb-4 border-b border-black/10 mb-6">
                  Education
                </p>
              </FadeUp>
              <div className="border-l border-black/10 ml-[3.5px]">
                {EDUCATION.map((item, i) => (
                  <TimelineEntry key={item.role} {...item} index={i} />
                ))}
              </div>
            </div>

          </div>
        </div>

      </section>

      <Rule className="mx-6 md:mx-12" />

      {/* ══════════════════════════════════════════════════════════
          FIELDS OF PRACTICE
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 md:px-12 pt-12 md:pt-16">

        {/* Section header — mirrors the INDEX header in work/page.tsx */}
        <FadeUp>
          <div className="flex justify-between items-end pb-4 border-b border-black/15">
            <h2
              className="font-bold tracking-tighter uppercase leading-none"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
            >
              What can I do?
            </h2>
            <Label>Areas of practice</Label>
          </div>
        </FadeUp>

        {/* Rows */}
        <div>
          {FIELDS.map((f, i) => (
            <FieldRow key={f.index} field={f} index={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TOOLS & SOFTWARE — animated skill bars
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 md:px-12 pt-12 md:pt-16 pb-16 md:pb-20">

        {/* Section header — mirrors Fields */}
        <FadeUp>
          <div className="flex justify-between items-end pb-4 border-b border-black/15">
            <h2
              className="font-bold tracking-tighter uppercase leading-none"
              style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.8rem)' }}
            >
              Tools &amp; Software
            </h2>
            <Label>Software proficiency</Label>
          </div>
        </FadeUp>

        <FadeUp delay={0.08} className="mt-8 flex flex-col md:flex-row gap-16 md:gap-32">
          {/* LEFT: Tools & Software */}
          <div className="flex-1">
            <div className="flex items-center gap-5 md:gap-8 pb-3 mb-1 border-b border-black/10">
              <span
                className="font-mono uppercase text-black/20 shrink-0 w-32 md:w-44"
                style={{ fontSize: '8px', letterSpacing: '0.3em' }}
              >
                Software
              </span>
              <span
                className="flex-1 font-mono uppercase text-black/20 text-right"
                style={{ fontSize: '8px', letterSpacing: '0.3em' }}
              >
                Proficiency
              </span>
            </div>
            {TOOLS.map((tool, i) => (
              <SkillBar key={tool.name} tool={tool} index={i} />
            ))}
          </div>

          {/* RIGHT: Languages */}
          <div className="flex-1">
            <div className="flex items-center gap-5 md:gap-8 pb-3 mb-1 border-b border-black/10">
              <span
                className="font-mono uppercase text-black/20 shrink-0 w-32 md:w-44"
                style={{ fontSize: '8px', letterSpacing: '0.3em' }}
              >
                Languages
              </span>
              <span
                className="flex-1 font-mono uppercase text-black/20 text-right"
                style={{ fontSize: '8px', letterSpacing: '0.3em' }}
              >
                Proficiency
              </span>
            </div>
            {LANGUAGES.map((lang, i) => (
              <LanguageBar key={lang.name} lang={lang} index={i} />
            ))}
          </div>
        </FadeUp>
      </section>

      <Rule className="mx-6 md:mx-12" />

      {/* ══════════════════════════════════════════════════════════
          PHILOSOPHY — large typographic statement
      ══════════════════════════════════════════════════════════ */}
      <section className="w-full px-6 md:px-12 py-20 md:py-32">
        <FadeUp delay={0.05}>
          <Label>Design philosophy</Label>
        </FadeUp>

        <FadeUp delay={0.15} className="mt-6 md:mt-8">
          <blockquote
            className="font-bold tracking-tighter uppercase leading-[0.92] text-black"
            style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', maxWidth: '16ch' }}
          >
            Form follows understanding,<br />not convention.
          </blockquote>
        </FadeUp>

        <FadeUp delay={0.25} className="mt-10 md:mt-12">
          <p
            className="font-sans text-black/45 leading-relaxed"
            style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', maxWidth: '48ch' }}
          >
            Every design decision should be earned. I reject decoration that doesn&apos;t serve
            structure, and structure that doesn&apos;t serve the person using it.
            The best design is the one you stop noticing because it simply works.
          </p>
        </FadeUp>
      </section>

      <Rule className="mx-6 md:mx-12" />

      {/* ══════════════════════════════════════════════════════════
          CONTACT CTA
      ══════════════════════════════════════════════════════════ */}
      <section id="contact" className="w-full px-6 md:px-12 py-20 md:py-28 pb-40">
        <FadeUp delay={0.05}>
          <h2
            className="font-bold tracking-tighter uppercase leading-none"
            style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
          >
            Get in Touch!
          </h2>
        </FadeUp>


        {/* ── Contact Form ── */}
        <ContactForm />

        {/* Email + LinkedIn — below the form */}
        <FadeUp delay={0.12} className="mt-16">
          <Rule />
        </FadeUp>
        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Email */}
          <FadeUp delay={0.14}>
            <a
              href="mailto:pienasci@gmail.com"
              className="group inline-flex items-center gap-4 cursor-none"
            >
              <span
                className="font-bold tracking-tighter uppercase leading-none text-black group-hover:opacity-60 transition-opacity duration-300"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 4rem)' }}
              >
                pienasci@gmail.com
              </span>
            </a>
          </FadeUp>

          {/* LinkedIn */}
          <FadeUp delay={0.2}>
            <a
              href="https://www.linkedin.com/in/pietronascimben"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-4 cursor-none"
            >
              <span
                className="font-bold tracking-tighter uppercase leading-none text-black group-hover:opacity-60 transition-opacity duration-300"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 4rem)' }}
              >
                LinkedIn ↗
              </span>
            </a>
          </FadeUp>
        </div>

        {/* Footer meta row */}
        <FadeUp delay={0.24} className="mt-20">
          <Label>Pietro Nascimben · Portfolio 2026</Label>
        </FadeUp>
      </section>

    </div>
  );
}

'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  slug: string;
  imageSrc: string;
  tags: string[];
}

export function ProjectCard({ title, slug, imageSrc, tags }: ProjectCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-gray-100 mb-8 block cursor-pointer"
    >
      <Link href={`/projects/${slug}`} className="block w-full h-full">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src={imageSrc} 
            alt={title} 
            fill 
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105" 
          />
        </div>
        
        {/* Hover overlay dimming effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 ease-out" />

        <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col md:flex-row md:items-end justify-between gap-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="text-white">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-2">{title}</h3>
            <div className="flex flex-wrap gap-2 text-sm font-bold tracking-widest uppercase text-white/80">
              {tags.map((tag, i) => (
                <span key={i} className="after:content-['/'] after:mx-2 last:after:content-none">{tag}</span>
              ))}
            </div>
          </div>
          <div className="hidden md:flex w-12 h-12 bg-white rounded-full items-center justify-center text-black font-bold -rotate-45 group-hover:rotate-0 transition-transform duration-500">
            →
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

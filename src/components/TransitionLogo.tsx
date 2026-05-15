'use client';
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { LogoSVG } from "./LogoSVG";

const scatterOffsets = [
  { x: -3500, y: -1500, rotate: -45 }, 
  { x: 3500, y: 3500, rotate: 90 },   
  { x: 0,    y: -3000, rotate: -180 },   
  { x: 4000, y: -500, rotate: 45 },      
];

export default function TransitionLogo({ onComplete }: { onComplete: () => void }) {
  const controls = useAnimation();
  const containerControls = useAnimation();

  useEffect(() => {
    let active = true;

    async function sequence() {
      // 1. DECOMPOSITION: Start from navbar (top-center) as a solid small logo
      
      // Calculate target values dynamically based on real Navbar position
      const navLogo = document.getElementById('navbar-logo-container');
      const container = document.querySelector('.global-transition-container'); // Need to add this class to Template or just use window
      
      let targetY = "-46.4vh";
      let targetScale = 0.182;

      if (navLogo) {
        const navRect = navLogo.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // The container is centered in the viewport
        const centerY = viewportHeight / 2;
        const navCenterY = navRect.top + (navRect.height / 2);
        
        // Calculate Y offset from center
        targetY = `${navCenterY - centerY}px`;
        
        // Calculate scale: target width / current width
        const currentWidth = viewportWidth < 768 ? 120 : 220;
        targetScale = navRect.width / currentWidth;
      }

      await controls.set({
        x: 0,
        y: 0, 
        scale: 1,
        opacity: 1,
        pathLength: 1,
        fill: "#000000",
        stroke: "transparent",
        strokeWidth: 0,
        rotate: 0
      });
      containerControls.set({ y: targetY, scale: targetScale });

      // Move container to center and pieces to scatter (already filled)
      containerControls.start({ y: 0, scale: 1, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } });
      await controls.start(i => ({
        ...scatterOffsets[i],
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
      }));
      
      if (!active) return;
      // 2. Pause briefly at scattered state
      await new Promise(r => setTimeout(r, 300));

      if (!active) return;
      // 3. Converge into center
      await controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: "spring", damping: 20, stiffness: 150, mass: 1 }
      });

      if (!active) return;
      // 4. Hold briefly
      await new Promise(r => setTimeout(r, 250));

      // 5. SETTLE BACK TO NAVBAR: Move the WHOLE container
      await containerControls.start({
        y: targetY,
        scale: targetScale,
        transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
      });
      
      if (!active) return;
      // Final micro-delay to ensure settling
      await new Promise(r => setTimeout(r, 100));
      
      if (active) onComplete();
    }
    
    sequence();
    
    return () => { active = false; };
  }, [controls, containerControls, onComplete]);

  return (
    <motion.div 
      animate={containerControls}
      className="w-[120px] md:w-[220px] max-w-full aspect-square relative flex items-center justify-center"
    >
      <LogoSVG 
        controls={controls}
        className="w-full h-full overflow-visible"
      />
    </motion.div>
  );
}

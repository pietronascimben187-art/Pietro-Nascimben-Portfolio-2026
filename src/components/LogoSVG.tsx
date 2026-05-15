'use client';
import { motion, useAnimationControls } from "framer-motion";

export const LOGO_VIEWBOX = "0 0 2834.65 2834.65";

interface LogoSVGProps {
  controls?: any;
  initial?: any;
  custom?: (i: number) => any;
  className?: string;
  strokeWidth?: number;
}

export function LogoSVG({ controls, initial, custom, className, strokeWidth = 40 }: LogoSVGProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox={LOGO_VIEWBOX} 
      className={className}
      strokeLinejoin="round" 
      strokeLinecap="round"
    >
       <motion.polygon 
          initial={initial ? (typeof initial === 'function' ? initial(0) : initial) : undefined}
          animate={controls}
          custom={0}
          points="663.17 2172.81 663.17 661.84 1418.66 1417.32 1418.66 1920.98 1040.91 1543.24 1040.91 2172.81 663.17 2172.81"
       />
       <motion.polygon 
          initial={initial ? (typeof initial === 'function' ? initial(1) : initial) : undefined}
          animate={controls}
          custom={1}
          points="1922.31 1920.98 1544.57 1543.24 1544.57 2172.81 1922.31 2172.81 1922.31 1920.98"
       />
       <motion.polygon 
          initial={initial ? (typeof initial === 'function' ? initial(2) : initial) : undefined}
          animate={controls}
          custom={2}
          points="1418.66 1291.41 1418.66 661.84 1040.91 661.84 1040.91 913.67 1418.66 1291.41"
       />
       <motion.path 
          initial={initial ? (typeof initial === 'function' ? initial(3) : initial) : undefined}
          animate={controls}
          custom={3}
          d="M1921.34,1793.83c151.95-114.94,250.13-297.21,250.13-502.42,0-347.7-279.2-629.57-626.9-629.57v755.48l376.77,376.51Z"
       />
    </svg>
  );
}

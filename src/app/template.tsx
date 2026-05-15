'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import TransitionLogo from '@/components/TransitionLogo';

export default function Template({ children }: { children: React.ReactNode }) {
  // Triggers globally on every layout/page mount within Next.js root
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Prevent scroll during the transition to ensure they see the pristine white screen
  useEffect(() => {
    if (isTransitioning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isTransitioning]);

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
           <motion.div
              key="global-transition"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 z-[1000] bg-white flex items-center justify-center pointer-events-auto"
           >
              <TransitionLogo onComplete={() => setIsTransitioning(false)} />
           </motion.div>
        )}
      </AnimatePresence>

      <div className={isTransitioning ? "opacity-0" : "opacity-100 transition-opacity duration-1000"}>
        {children}
      </div>
    </>
  );
}

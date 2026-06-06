import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface HeroLoaderProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export default function HeroLoader({ onComplete }: HeroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [hideElements, setHideElements] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2500; // 2.5 seconds

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const calcProgress = Math.min(100, (elapsed / duration) * 100);
      
      setProgress(calcProgress);

      if (calcProgress < 33) {
        setWordIndex(0);
      } else if (calcProgress < 66) {
        setWordIndex(1);
      } else {
        setWordIndex(2);
      }

      if (calcProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setHideElements(true);
          setTimeout(onComplete, 800); // Let text fade out completely before unmounting bg
        }, 600); // Give 'Inspire' and '100' a moment to be read
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  // Format progress to always be 3 digits
  const formattedProgress = Math.floor(progress).toString().padStart(3, "0");

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000] text-white overflow-hidden"
    >
      <AnimatePresence>
        {!hideElements && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Top Left Header */}
            <div className="absolute top-6 left-6 md:top-10 md:left-10 text-[10px] md:text-sm tracking-[0.3em] text-neutral-400 uppercase font-mono">
              Portfolio
            </div>

            {/* Center Words */}
            <div className="relative h-20 md:h-32 w-full flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={wordIndex}
                  initial={{ y: 20, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute text-5xl md:text-8xl font-serif italic tracking-wide text-neutral-200"
                >
                  {words[wordIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Right Counter */}
            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 overflow-hidden flex items-baseline">
              <span className="text-5xl md:text-8xl font-light font-serif italic tracking-tighter text-neutral-300 transform translate-y-1">
                {formattedProgress}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

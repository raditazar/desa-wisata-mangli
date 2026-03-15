"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 → 100 over ~1.6s
    const startTime = Date.now();
    const duration = 1600;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };
    const raf = requestAnimationFrame(tick);

    // Hide after progress completes + brief hold
    const timer = setTimeout(() => setIsVisible(false), 2000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#1a2517]"
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16 text-center"
          >
            <span className="text-[#acc8a2] text-5xl font-bold tracking-tight">mangli</span>
            <p className="text-white/30 text-sm mt-2 tracking-widest uppercase">Desa Wisata</p>
          </motion.div>

          {/* Progress bar track */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#acc8a2] rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Percentage */}
          <motion.span
            className="text-white/30 text-xs mt-4 font-mono tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

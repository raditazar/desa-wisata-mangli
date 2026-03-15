"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-background px-1 lg:px-2 pb-1 lg:pb-1">
      {/* Video container with large border-radius */}
      <div className="relative min-h-[75vh] md:min-h-[80vh] lg:min-h-[88vh] rounded-2xl md:rounded-3xl lg:rounded-4xl overflow-hidden">
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/25" />

        {/* Content — bottom aligned, split left-right */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="w-full px-6 md:px-10 lg:px-14 pb-10 md:pb-14 lg:pb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Left: Headline + Subheadline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-xl"
            >
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Rasakan Keindahan
                <br />
                Desa Mangli
              </h1>
              <p className="mt-4 text-sm md:text-base lg:text-lg text-white/75 max-w-lg leading-relaxed">
                Jelajahi alam, budaya, dan kehangatan warga di lereng perbukitan Magelang. Tempat di mana setiap momen menjadi kenangan.
              </p>
            </motion.div>

            {/* Right: CTA Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
              className="flex-shrink-0"
            >
              <Link
                href="/booking"
                className="group relative inline-flex items-center justify-center h-14 px-10 rounded-full bg-[#acc8a2] text-[#1a2517] font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(172,200,162,0.6)] hover:scale-105"
              >
                <span className="relative z-10">Dapatkan Tiket</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

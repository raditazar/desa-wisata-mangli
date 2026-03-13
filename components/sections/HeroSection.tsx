"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient placeholder - replace with real image */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary-dark" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
        >
          Desa Wisata Mangli
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mt-6 text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
        >
          Jelajahi keindahan alam dan budaya desa yang autentik. Tinggal bersama
          warga, belajar berkebun, dan ciptakan kenangan tak terlupakan.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button href="/booking" size="lg">
            Pesan Sekarang
          </Button>
          <Button
            href="#about"
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Jelajahi
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#about" aria-label="Scroll ke bawah">
          <ChevronDown size={32} className="text-white/70 animate-bounce" />
        </a>
      </div>
    </section>
  );
}

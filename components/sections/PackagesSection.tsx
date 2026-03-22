"use client";

import { Check, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { TOUR_PACKAGES } from "@/lib/constants";

export default function PackagesSection({ initialPackages = [] }: { initialPackages?: any[] }) {
  const getMergedPackage = (id: string) => {
    const staticPkg = TOUR_PACKAGES.find((p) => p.id === id)!;
    const backendPkg = initialPackages.find((p: any) => p.slug === id);
    if (!backendPkg) return staticPkg;
    return {
      ...staticPkg,
      name: backendPkg.name || staticPkg.name,
      description: backendPkg.description || staticPkg.description,
      price: backendPkg.price ?? staticPkg.price,
      image: backendPkg.image_url || staticPkg.image,
      isAvailable: backendPkg.is_active ?? staticPkg.isAvailable,
      maxTickets: backendPkg.max_participants ?? staticPkg.maxTickets,
    };
  };

  const liveIn = getMergedPackage("live-in");
  const edukasi = getMergedPackage("edukasi-berkebun");
  const comingSoon = getMergedPackage("coming-soon");

  return (
    <section id="packages" className="py-16 lg:py-20">
      {/* Heading inside the constrained container */}
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-11/12">
        <AnimatedSection className="mb-16">
          <div className="flex flex-col text-4xl md:text-5xl lg:text-6xl font-light text-[#1a2517] leading-tight">
            <p>Temukan <span className="font-bold">Paket Wisata</span> yang Menakjubkan</p>
            <p>di <span className="font-bold">Desa Mangli</span></p>
          </div>
        </AnimatedSection>

        {/* Package 1 — Live In: image left, content right */}
        <AnimatedSection delay={0.1} className="mb-6 lg:mb-8">
          <div className="grid md:grid-cols-2 gap-5 rounded-3xl overflow-hidden min-h-[480px]">
            {/* Left: portrait photo */}
            <div className="relative min-h-[300px] md:min-h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={liveIn.image}
                alt={liveIn.name}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
            </div>

            {/* Right: info panel */}
            <div className="bg-[#f0f5ee] pt-8 pb-20 px-8 md:px-14 lg:px-20 flex flex-col justify-between gap-6 rounded-3xl">
              <div>
                <h3 className="mt-2 text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1a2517] leading-tight">
                  {liveIn.name}
                </h3>
                <p className="mt-2 text-2xl text-[#4a5e45] font-medium">{liveIn.tagline}</p>
                <p className="mt-5 text-[#4a5e45] text-2xl font-normal leading-relaxed">{liveIn.description}</p>

                {liveIn.features.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {liveIn.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-lg text-[#1a2517]/80">
                        <Check size={15} className="text-[#acc8a2] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-[#1a2517]/10 pt-6 flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-[#1a2517] text-white font-medium text-2xl transition-all duration-300 hover:bg-[#acc8a2] hover:text-[#1a2517]"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Package 2 — Edukasi Berkebun: zigzag (content left, image right) — same style as Live-In */}
        <AnimatedSection delay={0.1} className="mb-6 lg:mb-8">
          <div className="grid md:grid-cols-2 gap-5 rounded-3xl overflow-hidden min-h-[480px]">
            {/* Left: info panel */}
            <div className="bg-[#f0f5ee] pt-8 pb-20 px-8 md:px-14 lg:px-20 flex flex-col justify-between gap-6 rounded-3xl order-2 md:order-1">
              <div>
                <h3 className="mt-2 text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1a2517] leading-tight">
                  {edukasi.name}
                </h3>
                <p className="mt-2 text-2xl text-[#4a5e45] font-medium">{edukasi.tagline}</p>
                <p className="mt-5 text-[#4a5e45] text-2xl font-normal leading-relaxed">{edukasi.description}</p>

                {edukasi.features.length > 0 && (
                  <ul className="mt-6 space-y-2">
                    {edukasi.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-lg text-[#1a2517]/80">
                        <Check size={15} className="text-[#acc8a2] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="border-t border-[#1a2517]/10 pt-6 flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/get-tickets"
                  className="inline-flex items-center justify-center h-16 px-12 rounded-full bg-[#1a2517] text-white font-medium text-2xl transition-all duration-300 hover:bg-[#acc8a2] hover:text-[#1a2517]"
                >
                  Pesan Sekarang
                </Link>
              </div>
            </div>

            {/* Right: portrait photo */}
            <div className="relative min-h-[300px] md:min-h-full order-1 md:order-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={edukasi.image}
                alt={edukasi.name}
                className="absolute inset-0 w-full h-full object-cover rounded-3xl"
              />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Package 3 — Coming Soon: FULL WIDTH, dark green */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full bg-[#1a2517] px-8 md:px-16 lg:px-24 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 mt-6 lg:mt-8"
      >
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#acc8a2]/20 flex items-center justify-center shrink-0">
            <Clock size={28} className="text-[#acc8a2]" />
          </div>
          <div>
            <span className="text-[#acc8a2]/60 text-xs font-bold uppercase tracking-widest">Coming Soon</span>
            <h3 className="text-3xl md:text-4xl font-bold text-white mt-1">{comingSoon.name}</h3>
          </div>
        </div>
        <p className="text-white/60 text-lg md:max-w-lg leading-relaxed">
          {comingSoon.description}
        </p>
        <span className="inline-flex items-center justify-center h-13 px-9 rounded-full border-2 border-white/20 text-white/50 font-semibold text-base cursor-not-allowed shrink-0">
          Segera Hadir
        </span>
      </motion.div>
    </section>
  );
}

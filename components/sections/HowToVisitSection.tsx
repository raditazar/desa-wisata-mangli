"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const VISIT_STEPS = [
  {
    number: "01",
    title: "Dapatkan Tiket",
    description: "Pilih paket wisata dan beli tiket secara online kapan saja dan di mana saja.",
    image: "/images/gallery/gallery-1.svg",
  },
  {
    number: "02",
    title: "Find Desa Wisata Mangli",
    description: "Navigasikan perjalanan Anda ke Desa Mangli, Magelang. Tersedia panduan rute lengkap.",
    image: "/images/gallery/gallery-2.svg",
  },
  {
    number: "03",
    title: "Check-In & Tukar Tiket",
    description: "Tunjukkan tiket digital Anda kepada petugas dan selesaikan registrasi kedatangan.",
    image: "/images/gallery/gallery-3.svg",
  },
  {
    number: "04",
    title: "Pengalaman Luar Biasa Menunggu",
    description: "Nikmati seluruh aktivitas, alam, dan keramahan warga Desa Wisata Mangli.",
    image: "/images/gallery/gallery-4.svg",
  },
];

const DISTANCES = [
  { place: "Pusat Kota Magelang", minutes: "30 menit" },
  { place: "Candi Borobudur", minutes: "45 menit" },
  { place: "Stasiun Magelang", minutes: "35 menit" },
  { place: "Bandara YIA Yogyakarta", minutes: "75 menit" },
];

export default function HowToVisitSection() {
  return (
    <section id="visit" className="py-16 lg:py-24">
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="rounded-3xl bg-[#1a2517] overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[600px]">

            {/* Left column — Location info */}
            <AnimatedSection className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
              <span className="text-[#acc8a2]/60 text-sm font-semibold uppercase tracking-widest mb-4">
                Lokasi
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Located in<br />Magelang
              </h2>
              <p className="mt-5 text-base lg:text-lg text-white/65 leading-relaxed max-w-md">
                Desa Wisata Mangli berada di lereng perbukitan Magelang, Jawa Tengah. Dikelilingi sawah terasering dan kebun hijau dengan udara segar pegunungan.
              </p>

              {/* Distance list */}
              <div className="mt-8 space-y-3">
                {DISTANCES.map((item, i) => (
                  <motion.div
                    key={item.place}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0"
                  >
                    <span className="text-white/70 text-sm">{item.place}</span>
                    <span className="text-[#acc8a2] font-semibold text-sm">{item.minutes}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right column — Visit steps */}
            <div className="bg-black/20 p-8 md:p-10 lg:p-12 flex flex-col gap-4">
              {VISIT_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 bg-white/[0.06] rounded-2xl p-4 hover:bg-white/[0.1] transition-colors duration-300"
                >
                  {/* Step image — rounded rectangle */}
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 bg-[#acc8a2]/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-base leading-snug">{step.title}</p>
                    <p className="text-white/50 text-sm mt-1 leading-relaxed line-clamp-2">{step.description}</p>
                  </div>

                  {/* Step number — rightmost */}
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.08] flex items-center justify-center">
                    <span className="text-[#acc8a2] font-bold text-sm">{step.number}</span>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

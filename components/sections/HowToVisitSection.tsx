"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";

const VISIT_STEPS = [
  {
    number: "01",
    title: "Dapatkan Tiket",
    description: "Pilih paket wisata dan beli tiket secara online kapan saja dan di mana saja.",
    image: "/images/gallery/gallery-1.jpg",
  },
  {
    number: "02",
    title: "Find Desa Wisata Mangli",
    description: "Navigasikan perjalanan Anda ke Desa Mangli, Magelang. Tersedia panduan rute lengkap.",
    image: "/images/gallery/gallery-2.jpg",
  },
  {
    number: "03",
    title: "Check-In & Tukar Tiket",
    description: "Tunjukkan tiket digital Anda kepada petugas dan selesaikan registrasi kedatangan.",
    image: "/images/gallery/gallery-3.jpg",
  },
  {
    number: "04",
    title: "Pengalaman Luar Biasa Menunggu",
    description: "Nikmati seluruh aktivitas, alam, dan keramahan warga Desa Wisata Mangli.",
    image: "/images/gallery/gallery-4.jpg",
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
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-11/12">
        <AnimatedSection className="mb-16">
          <div className=" text-4xl md:text-5xl lg:text-6xl font-light flex justify-center text-[#1a2517] leading-tight">
            <p><span className="font-bold">How to </span> Visit Us</p>
          </div>
        </AnimatedSection>
        <div className="rounded-3xl overflow-hidden" style={{ background: "#eef4ec" }}>
          <div className="grid lg:grid-cols-2">

            {/* Left column — Location info */}
            <AnimatedSection className="p-10 md:p-14 lg:p-18 flex flex-col justify-center">
              <span className="text-[#acc8a2] text-sm font-bold uppercase tracking-widest mb-5">
                Lokasi
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#1a2517] leading-tight">
                Located in Magelang, Indonesia
              </h2>
              <p className="mt-6 text-xl lg:text-2xl text-[#4a5e45] leading-relaxed">
                Desa Wisata Mangli berada di lereng perbukitan Magelang, Jawa Tengah. Dikelilingi sawah terasering dan kebun hijau dengan udara segar pegunungan.
              </p>

              {/* Distance list */}
              <div className="mt-10 space-y-1">
                {DISTANCES.map((item, i) => (
                  <motion.div
                    key={item.place}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center justify-between py-4 border-b border-[#1a2517]/10 last:border-b-0"
                  >
                    <span className="text-[#4a5e45] text-xl">{item.place}</span>
                    <span className="text-[#1a2517] font-bold text-xl">{item.minutes}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right column — Visit steps; slightly darker */}
            <div className="p-10 md:p-14 lg:p-18 flex flex-col gap-4">
              {VISIT_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center gap-6 bg-[#1a2517]/[0.06] rounded-full px-6 py-4 hover:bg-[#1a2517]/[0.1] transition-colors duration-300"
                >
                  {/* Step image — large circle */}
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 bg-[#acc8a2]/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1a2517] font-semibold text-2xl md:text-3xl leading-snug">{step.title}</p>
                  </div>

                  {/* Step number — rightmost, large circle */}
                  <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1a2517]/10 flex items-center justify-center">
                    <span className="text-[#1a2517] font-bold text-2xl md:text-3xl">{step.number}</span>
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

"use client";

import { motion } from "framer-motion";
import { GALLERY_ITEMS } from "@/lib/constants";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";

const bentoLayout = [
  "col-span-2 row-span-3", // large square
  "col-span-1 row-span-2", // small
  "col-span-1 row-span-1", // tall
  "col-span-1 row-span-1", // small
   "col-span-2 row-span-1", // wide
];

export default function AboutSection() {
  const items = GALLERY_ITEMS.slice(0, bentoLayout.length);

  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-11/12">
        {/* Header row: headline left, subheadline right */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 mb-8 lg:mb-10">
          {/* Left: headline */}
          <div className="md:w-1/2">
            <div className="flex flex-col text-4xl md:text-5xl lg:text-6xl font-light text-[#1a2517] leading-tight">
              <p>
                Kenal Lebih Dekat dengan
              </p>
              <p className="font-bold leading-relaxed">
                Desa Mangli
              </p>
            </div>
            {/* WhatsApp CTA */}
            <Link
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 h-20 px-12 rounded-full text-white bg-[#1a2517] text-2xl font-semibold transition-all duration-300 hover:bg-[#acc8a2] hover:text-[#1a2517]"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Right: subheadline */}
          <div className="md:w-1/2 md:pt-2 lg:py-16">
            <p className="text-lg md:text-xl lg:text-2xl font-normal text-[#4a5e45] leading-relaxed">
              Eksplorasi keindahan Desa Mangli — dimana alam, budaya, dan kehangatan warga berpadu menyambut Anda.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[210px] lg:auto-rows-[240px] gap-2 md:gap-2.5">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className={`group relative rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer ${bentoLayout[index]}`}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Default subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 group-hover:opacity-0" />

              {/* Hover overlay + caption */}
              <div className="absolute inset-0 bg-[#1a2517]/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm md:text-base tracking-wide translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </div>

              {/* Corner accent brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#acc8a2] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 scale-50 group-hover:scale-100" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#acc8a2] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 scale-50 group-hover:scale-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

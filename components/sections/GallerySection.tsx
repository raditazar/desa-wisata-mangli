"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { GALLERY_ITEMS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryImage from "@/components/ui/GalleryImage";

export default function GallerySection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            title="Galeri"
            subtitle="Intip keindahan dan kegiatan di Desa Mangli"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-6">
                {GALLERY_ITEMS.map((item) => (
                  <div
                    key={item.id}
                    className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%]"
                  >
                    <GalleryImage
                      src={item.src}
                      alt={item.alt}
                      caption={item.caption}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Nav buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-surface transition-colors hidden md:flex"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-surface transition-colors hidden md:flex"
              aria-label="Selanjutnya"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

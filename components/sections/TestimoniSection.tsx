"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { TESTIMONIALS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function TestimoniSection() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  return (
    <section id="testimoni" className="py-24 lg:py-32 bg-surface/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            title="Apa Kata Mereka"
            subtitle="Pengalaman nyata dari para wisatawan yang telah berkunjung"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_48%] lg:flex-[0_0_32%]"
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

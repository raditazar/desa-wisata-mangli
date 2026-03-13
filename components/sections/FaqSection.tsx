"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import AccordionItem from "@/components/ui/AccordionItem";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-surface/50">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            title="Pertanyaan Umum"
            subtitle="Jawaban untuk pertanyaan yang sering diajukan"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item) => (
              <AccordionItem
                key={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={openId === item.id}
                onToggle={() =>
                  setOpenId(openId === item.id ? null : item.id)
                }
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

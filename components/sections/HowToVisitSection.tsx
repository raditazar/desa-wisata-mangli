import { VISIT_STEPS } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import StepperItem from "@/components/ui/StepperItem";

export default function HowToVisitSection() {
  return (
    <section id="how-to-visit" className="py-24 lg:py-32">
      <div className="section-container">
        <AnimatedSection>
          <SectionHeading
            title="Cara Berkunjung"
            subtitle="Empat langkah mudah untuk memulai petualangan Anda di Desa Mangli"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Mobile: vertical */}
            <div className="lg:hidden">
              {VISIT_STEPS.map((step, index) => (
                <StepperItem
                  key={step.stepNumber}
                  stepNumber={step.stepNumber}
                  title={step.title}
                  description={step.description}
                  isLast={index === VISIT_STEPS.length - 1}
                />
              ))}
            </div>

            {/* Desktop: horizontal */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-8 relative">
              {/* Connector line */}
              <div className="absolute top-6 left-[12.5%] w-[75%] h-0.5 bg-surface-dark" />

              {VISIT_STEPS.map((step) => (
                <div key={step.stepNumber} className="relative flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-serif text-lg font-bold z-10">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mt-4">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

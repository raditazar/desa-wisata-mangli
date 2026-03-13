import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-primary">
      <div className="section-container text-center">
        <AnimatedSection>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Siap Menjelajahi Desa Mangli?
          </h2>
          <p className="mt-4 text-white/80 text-base lg:text-lg max-w-2xl mx-auto">
            Pesan sekarang dan rasakan pengalaman wisata desa yang autentik.
            Kami siap menyambut kedatangan Anda!
          </p>
          <div className="mt-10">
            <Button
              href="/booking"
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-surface"
            >
              Pesan Sekarang
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

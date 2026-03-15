import { TOUR_PACKAGES } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import PackageCard from "@/components/ui/PackageCard";

export default function PackagesSection() {
  return (
    <section id="packages" className="py-16 lg:py-24">
      <div className="px-4 md:px-6 lg:px-8 mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading
            title="Paket Wisata Kami"
            subtitle="Pilih pengalaman wisata desa yang sesuai dengan keinginan Anda"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg, index) => (
            <AnimatedSection key={pkg.id} delay={index * 0.15}>
              <PackageCard pkg={pkg} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

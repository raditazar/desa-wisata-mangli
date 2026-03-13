import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackagesSection from "@/components/sections/PackagesSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimoniSection from "@/components/sections/TestimoniSection";
import HowToVisitSection from "@/components/sections/HowToVisitSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PackagesSection />
      <GallerySection />
      <TestimoniSection />
      <HowToVisitSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

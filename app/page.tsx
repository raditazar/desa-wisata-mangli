import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackagesSection from "@/components/sections/PackagesSection";
import HowToVisitSection from "@/components/sections/HowToVisitSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PackagesSection />
      <HowToVisitSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackagesSection from "@/components/sections/PackagesSection";
import HowToVisitSection from "@/components/sections/HowToVisitSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <HeroSection />
      <AboutSection />
      <PackagesSection />
      <HowToVisitSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

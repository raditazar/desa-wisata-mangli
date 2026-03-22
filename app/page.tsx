import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import PackagesSection from "@/components/sections/PackagesSection";
import HowToVisitSection from "@/components/sections/HowToVisitSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaSection from "@/components/sections/CtaSection";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { apiClient } from "@/lib/api-client";

export default async function Home() {
  let initialPackages = [];
  try {
    // Backend API response is { success: boolean, data: Array, meta: object }
    const res = await apiClient.get<{ success: boolean; data: any[] }>('/tour-packages?is_active=true');
    if (res.success) {
      initialPackages = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch tour packages:", err);
  }

  return (
    <>
      <LoadingScreen />
      <HeroSection />
      <AboutSection />
      <PackagesSection initialPackages={initialPackages} />
      <HowToVisitSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

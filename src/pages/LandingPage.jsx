import Features from "@/components/user/FeaturesSection";
import HeroSection from "@/components/user/HeroSection.";
import WhyWalletWiz from "@/components/user/WhyUsSection";

export default function LandingPage() {

  return (
     <main className="relative min-h-screen bg-background mx-2">
      <HeroSection />
      <Features />
      <WhyWalletWiz/>
    </main>
  )
}
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSlider } from "@/components/home/HeroSlider";
import { CompanyFeatures } from "@/components/home/CompanyFeatures";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GrowthChart } from "@/components/home/GrowthChart";
import { PartnersSection } from "@/components/home/PartnersSection";
import { TransmissionCTA } from "@/components/home/TransmissionCTA";
import { QuoteForm } from "@/components/home/QuoteForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <CompanyFeatures />
        <AboutSection />
        <ServicesSection />
        <GrowthChart />
        <TransmissionCTA />
        <PartnersSection />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

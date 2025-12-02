import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/home/AboutSection";
import { CompanyFeatures } from "@/components/home/CompanyFeatures";
import { GrowthChart } from "@/components/home/GrowthChart";
import { PartnersSection } from "@/components/home/PartnersSection";
import { CheckCircle, Award, Shield, Clock } from "lucide-react";

import hero2 from "@/assets/hero-2.jpg";

const timeline = [
  { year: "1990", title: "Company Founded", description: "Started as a small electrical contractor in Tamil Nadu" },
  { year: "2005", title: "TNEB Certification", description: "Achieved Class I contractor status with State Power Utility" },
  { year: "2010", title: "ESA License", description: "Obtained ESA Grade License (ESA:530) from Tamil Nadu Electrical Board" },
  { year: "2015", title: "Solar Expansion", description: "Expanded into solar power plant operations and maintenance" },
  { year: "2020", title: "International Reach", description: "Opened Saudi Arabia office, expanding global footprint" },
  { year: "2024", title: "Industry Leader", description: "Managing 600MW solar plants and 150+ substations" },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero2})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                About Us
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Building India's Power Infrastructure Since 1990
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                Three decades of excellence in electrical infrastructure development
              </p>
            </div>
          </div>
        </section>

        <AboutSection />

        {/* Timeline Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Company <span className="text-secondary">Timeline</span>
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 mb-8 md:mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"} pl-12 md:pl-0`}>
                    <div className="bg-background p-6 rounded-xl shadow-custom animate-fade-up">
                      <span className="font-heading text-2xl md:text-3xl font-bold text-primary">{item.year}</span>
                      <h3 className="font-heading text-xl font-bold text-foreground mt-2">{item.title}</h3>
                      <p className="text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 bg-primary rounded-full md:-translate-x-1/2 ring-4 ring-background" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Our Core <span className="text-primary">Values</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, title: "Quality", desc: "ISO certified quality management" },
                { icon: Award, title: "Excellence", desc: "30+ years of industry expertise" },
                { icon: Shield, title: "Safety", desc: "Zero compromise on safety standards" },
                { icon: Clock, title: "Timeliness", desc: "On-time project delivery" },
              ].map((value, i) => (
                <div key={i} className="text-center p-6 bg-muted rounded-xl">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CompanyFeatures />
        <GrowthChart />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;

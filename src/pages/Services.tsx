import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TransmissionCTA } from "@/components/home/TransmissionCTA";
import { ArrowRight, Zap, Building, Sun, Wind, Wrench, Shield, Settings, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const services = [
  {
    id: 1,
    icon: Zap,
    title: "EHV Substations",
    description: "Design, construction and commissioning of Extra High Voltage substations up to 230kV capacity with state-of-the-art equipment.",
    image: hero1,
    features: ["Up to 230kV capacity", "GIS & AIS Substations", "Control & Relay Panels", "SCADA Integration"],
  },
  {
    id: 2,
    icon: Building,
    title: "Transmission Lines",
    description: "Complete transmission line solutions including survey, design, tower erection, stringing and maintenance services.",
    image: hero3,
    features: ["Tower Erection", "Line Stringing", "Route Survey", "Foundation Work"],
  },
  {
    id: 3,
    icon: Sun,
    title: "Solar Power Plants",
    description: "End-to-end solar power solutions from feasibility study to installation, grid integration and comprehensive O&M services.",
    image: hero4,
    features: ["600MW+ Under Management", "Grid Integration", "Performance Monitoring", "Preventive Maintenance"],
  },
  {
    id: 4,
    icon: Wind,
    title: "Wind Power Systems",
    description: "Wind power station installation, pooling substation construction, grid integration and maintenance services.",
    image: hero2,
    features: ["20+ Wind PSS Sites", "Pooling Substations", "Grid Connectivity", "24/7 Monitoring"],
  },
  {
    id: 5,
    icon: Wrench,
    title: "Operation & Maintenance",
    description: "24/7 operation and maintenance services ensuring optimal performance and reliability of power infrastructure.",
    image: hero5,
    features: ["Round-the-clock Support", "Preventive Maintenance", "Emergency Response", "Performance Analytics"],
  },
  {
    id: 6,
    icon: Shield,
    title: "Testing & Commissioning",
    description: "Comprehensive testing, inspection and commissioning services for all electrical systems and equipment.",
    image: hero1,
    features: ["Pre-commissioning Tests", "Protection Testing", "Insulation Testing", "Performance Verification"],
  },
  {
    id: 7,
    icon: Settings,
    title: "Civil Works",
    description: "Civil construction works for substations, control rooms, cable trenches and allied infrastructure.",
    image: hero2,
    features: ["Control Room Buildings", "Equipment Foundations", "Cable Trenches", "Boundary Walls"],
  },
  {
    id: 8,
    icon: FileCheck,
    title: "Consultancy Services",
    description: "Expert consultancy for power infrastructure projects including feasibility studies and detailed engineering.",
    image: hero3,
    features: ["Feasibility Studies", "DPR Preparation", "Technical Audits", "Project Management"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero1})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                Our Services
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Comprehensive Power Infrastructure Solutions
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                From substations to solar plants, we deliver end-to-end electrical infrastructure services
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            <div className="grid gap-8 md:gap-12">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isReversed = index % 2 !== 0;
                return (
                  <div
                    key={service.id}
                    className={`grid lg:grid-cols-2 gap-8 items-center ${isReversed ? "lg:grid-flow-dense" : ""}`}
                  >
                    <div className={isReversed ? "lg:col-start-2" : ""}>
                      <div className="relative rounded-2xl overflow-hidden shadow-custom-lg group">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                        <div className="absolute bottom-6 left-6">
                          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                            <Icon className="w-7 h-7" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={isReversed ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {service.description}
                      </p>
                      <ul className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link to={`/services/${service.id}`}>
                        <Button variant="outline">
                          Learn More <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <TransmissionCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Services;

import { useState } from "react";
import { Target, Crosshair, Settings, Eye, FileText, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const features = [
  {
    id: "missions",
    icon: Target,
    title: "Company Missions",
    image: hero1,
    points: [
      "Energizing tomorrow with expert management",
      "Delivering quality engineering with 30+ years' experience",
      "Excellence in Substations, O&M",
      "Timely project completion focus",
      "Competitive pricing with high quality",
      "Skilled professionals matching international benchmarks",
      "Continuous improvement in quality systems",
    ],
  },
  {
    id: "objectives",
    icon: Crosshair,
    title: "Company Objectives",
    image: hero2,
    points: [
      "Deliver quality service on time, every time",
      "Enhance customer satisfaction through teamwork",
      "Implement innovative engineering solutions",
      "Prioritize customer feedback",
      "Promote continuous improvement",
      "Consistently meet project deadlines",
    ],
  },
  {
    id: "process",
    icon: Settings,
    title: "Work Process",
    image: hero3,
    points: [
      "Optimizing processes for quality, efficiency & safety",
      "Health & safety = first priority",
      "Research & development",
      "Design & planning by certified engineers",
      "Monitoring & support for optimal performance",
      '"Safety is always the priority"',
    ],
  },
  {
    id: "vision",
    icon: Eye,
    title: "Company Vision",
    image: hero4,
    points: [
      "Vision for excellence in integrated power infrastructure",
      "Global leadership in substation & transmission line solutions",
      "Innovation with sustainable practices",
      "End-to-end portfolio from construction to O&M",
    ],
  },
  {
    id: "terms",
    icon: FileText,
    title: "Terms & Conditions",
    image: hero5,
    points: [
      "All projects governed by standard industry terms",
      "Quality assurance as per ISO standards",
      "Safety compliance mandatory for all operations",
      "Transparent pricing and billing procedures",
      "Professional liability and insurance coverage",
      "Warranty and maintenance support included",
    ],
  },
];

export function CompanyFeatures() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="section-padding bg-muted">
      <div className="container-custom px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Building <span className="text-primary">Excellence</span> in Power Infrastructure
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            With over 30 years of experience, we've established ourselves as leaders in electrical infrastructure development.
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeature(feature)}
                className={cn(
                  "flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm md:text-base",
                  activeFeature.id === feature.id
                    ? "bg-primary text-primary-foreground shadow-glow-red"
                    : "bg-background text-foreground hover:bg-primary/10 border border-border"
                )}
              >
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">{feature.title}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Content */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-custom-lg">
              <img
                src={activeFeature.image}
                alt={activeFeature.title}
                className="w-full aspect-[4/3] object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 text-primary-foreground">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    {(() => {
                      const Icon = activeFeature.icon;
                      return <Icon className="w-6 h-6" />;
                    })()}
                  </div>
                  <span className="font-heading text-xl md:text-2xl font-bold">{activeFeature.title}</span>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="bg-background rounded-2xl p-6 md:p-8 shadow-custom">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
                {activeFeature.title}
              </h3>
              <ul className="space-y-4">
                {activeFeature.points.map((point, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground text-sm md:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

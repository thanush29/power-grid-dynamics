import { Link } from "react-router-dom";
import { ArrowRight, Users, Zap, Sun, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";

const stats = [
  { icon: Users, value: "300+", label: "Expert Workforce" },
  { icon: Zap, value: "1500km+", label: "EHV Lines up to 230kV" },
  { icon: Sun, value: "600MW", label: "O&M Solar Plants" },
  { icon: Award, value: "150+", label: "EHV Substations" },
];

export function AboutSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Images */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={hero1}
                alt="Power Infrastructure"
                className="rounded-2xl shadow-custom-lg w-full md:w-4/5"
              />
            </div>
            <div className="absolute bottom-0 right-0 z-20 hidden md:block">
              <img
                src={hero2}
                alt="Engineering Team"
                className="rounded-2xl shadow-custom-lg w-3/5 border-4 border-background"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute top-4 right-4 md:top-8 md:right-auto md:-left-8 z-30 bg-primary text-primary-foreground p-4 md:p-6 rounded-2xl shadow-glow-red">
              <div className="text-center">
                <span className="font-heading text-3xl md:text-4xl font-bold block">30+</span>
                <span className="text-xs md:text-sm">Years Experience</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
              About Company
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Pioneering Power Infrastructure Since{" "}
              <span className="text-primary">1990</span>
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed text-sm md:text-base">
              MASS Techno Power Infrastructure – Ayyappan & Co is a certified Class I contractor with State Power Utility TNEB. We have been executing Electrical, Civil, Substations & Transmission Line Works with excellence and precision.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm md:text-base">
              We obtained ESA Grade License (ESA:530) issued by Electrical Licensing Board, Tamil Nadu, demonstrating our commitment to the highest standards in electrical infrastructure development.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-muted p-4 md:p-6 rounded-xl group hover:bg-primary hover:shadow-glow-red transition-all duration-300"
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-primary-foreground mb-2 md:mb-3 transition-colors" />
                    <span className="font-heading text-xl md:text-2xl font-bold text-foreground group-hover:text-primary-foreground block transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <Link to="/about">
              <Button variant="default" size="lg">
                Learn More <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

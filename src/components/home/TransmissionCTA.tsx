import { Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import hero3 from "@/assets/hero-3.jpg";

export function TransmissionCTA() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero3})` }}
      />
      <div className="absolute inset-0 bg-hero-gradient opacity-95" />

      {/* Content */}
      <div className="container-custom px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
            Transmission Line Projects
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Comprehensive Solutions for <br />
            <span className="text-secondary">Transmission Line</span> Projects
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            From design to commissioning, we provide end-to-end solutions for transmission line projects. Download our brochure to learn more about our capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/ayyappan.pdf" download>
              <Button variant="hero" className="w-full sm:w-auto">
                <Download className="w-5 h-5 mr-2" /> Download Brochure
              </Button>
            </a>
            <Link to="/services">
              <Button variant="hero-outline" className="w-full sm:w-auto">
                Our Services <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border-2 border-secondary/30 rounded-full animate-float" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-primary-foreground/20 rounded-full animate-float" style={{ animationDelay: "1s" }} />
    </section>
  );
}

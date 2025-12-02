import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const slides = [
  {
    image: hero1,
    title: "Powering Tomorrow's Infrastructure",
    subtitle: "Certified Class I Contractor with State Power Utility TNEB",
    description: "Executing Electrical, Civil, Substations & Transmission Line Works since 1990.",
  },
  {
    image: hero2,
    title: "EHV Substation Excellence",
    subtitle: "Design, Construction & Commissioning",
    description: "We specialize in Operation & Maintenance, Testing & Commissioning of EHV substations and transmission line projects.",
  },
  {
    image: hero3,
    title: "Licensed & Certified",
    subtitle: "ESA Grade License (ESA:530)",
    description: "Issued by Electrical Licensing Board, Tamil Nadu. Also licensed Class I (A&B) CMWSSB contractor.",
  },
  {
    image: hero4,
    title: "Renewable Energy Solutions",
    subtitle: "600 MW Solar Plants Under O&M",
    description: "Leading the transition to sustainable power with comprehensive solar and wind energy management.",
  },
  {
    image: hero5,
    title: "Expert Operations & Management",
    subtitle: "24/7 Grid Monitoring",
    description: "State-of-the-art control systems ensuring optimal performance of power infrastructure.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
          )}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-hero-gradient opacity-90" />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4">
            <div className="container-custom text-center">
              <div
                className={cn(
                  "transition-all duration-700 delay-100",
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-4 md:mb-6 border border-secondary/30">
                  {slide.subtitle}
                </span>
              </div>
              <h1
                className={cn(
                  "font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4 md:mb-6 leading-tight transition-all duration-700 delay-200",
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  "text-base md:text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed transition-all duration-700 delay-300 px-4",
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                {slide.description}
              </p>
              <div
                className={cn(
                  "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400",
                  index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                )}
              >
                <Link to="/services">
                  <Button variant="hero" className="w-full sm:w-auto">
                    Our Services <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="hero-outline" className="w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center text-primary-foreground hover:bg-primary/50 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full glass flex items-center justify-center text-primary-foreground hover:bg-primary/50 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 700);
              }
            }}
            className={cn(
              "h-2 md:h-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "w-8 md:w-12 bg-primary"
                : "w-2 md:w-3 bg-primary-foreground/50 hover:bg-primary-foreground/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 md:bottom-28 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-primary-foreground/60">
        <span className="text-xs uppercase tracking-widest">Scroll Down</span>
        <div className="w-5 h-8 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-primary-foreground/60 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

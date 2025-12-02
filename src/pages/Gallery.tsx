import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const categories = ["All", "Chennai Metro Works", "Substation Projects", "Operation & Maintenance", "Transmission Lines"];

const galleryItems = [
  { id: 1, image: hero1, category: "Substation Projects", title: "230kV Substation" },
  { id: 2, image: hero2, category: "Chennai Metro Works", title: "Metro Rail Infrastructure" },
  { id: 3, image: hero3, category: "Transmission Lines", title: "EHV Transmission Line" },
  { id: 4, image: hero4, category: "Operation & Maintenance", title: "Solar Plant O&M" },
  { id: 5, image: hero5, category: "Substation Projects", title: "Control Room" },
  { id: 6, image: hero1, category: "Transmission Lines", title: "Tower Erection" },
  { id: 7, image: hero2, category: "Chennai Metro Works", title: "Power Supply System" },
  { id: 8, image: hero3, category: "Substation Projects", title: "GIS Substation" },
  { id: 9, image: hero4, category: "Operation & Maintenance", title: "Wind Farm Maintenance" },
  { id: 10, image: hero5, category: "Substation Projects", title: "SCADA Systems" },
  { id: 11, image: hero1, category: "Transmission Lines", title: "Line Stringing" },
  { id: 12, image: hero2, category: "Chennai Metro Works", title: "Traction Substation" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero3})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                Project Gallery
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Our Work in Pictures
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                Explore our portfolio of completed projects across India
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 md:px-6 py-2 md:py-3 rounded-full font-medium transition-all duration-300 text-sm",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-glow-red"
                      : "bg-background text-foreground hover:bg-primary/10 border border-border"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group cursor-pointer rounded-xl overflow-hidden shadow-custom animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <span className="text-xs text-secondary-foreground bg-secondary/80 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <h3 className="text-primary-foreground font-semibold mt-2">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/30 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <h3 className="text-background text-xl font-semibold">{selectedImage.title}</h3>
                <p className="text-background/60">{selectedImage.category}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;

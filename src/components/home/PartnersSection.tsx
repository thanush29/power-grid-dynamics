import { useEffect, useRef } from "react";

const partners = [
  { name: "TNEB", logo: "https://upload.wikimedia.org/wikipedia/en/6/6f/Tamil_Nadu_Generation_and_Distribution_Corporation_Logo.png" },
  { name: "TANGEDCO", logo: "https://upload.wikimedia.org/wikipedia/en/6/6f/Tamil_Nadu_Generation_and_Distribution_Corporation_Logo.png" },
  { name: "CMWSSB", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/42/Chennai_Metro_Water_Logo.png/200px-Chennai_Metro_Water_Logo.png" },
  { name: "Chennai Metro", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d7/Chennai_Metro_Rail_Limited_Logo.svg/200px-Chennai_Metro_Rail_Limited_Logo.svg.png" },
  { name: "BHEL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/BHEL.svg/200px-BHEL.svg.png" },
  { name: "L&T", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/LarsenToubro.svg/200px-LarsenToubro.svg.png" },
];

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-muted overflow-hidden">
      <div className="container-custom px-4 mb-8 md:mb-12">
        <div className="text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Trusted By
          </span>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Our Valued <span className="text-primary">Partners</span>
          </h2>
        </div>
      </div>

      {/* Auto-scrolling logos */}
      <div
        ref={scrollRef}
        className="flex overflow-hidden whitespace-nowrap"
        style={{ scrollBehavior: "auto" }}
      >
        <div className="flex gap-8 md:gap-16 px-4">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-28 h-20 md:w-40 md:h-28 bg-background rounded-xl flex items-center justify-center p-4 shadow-custom hover:shadow-custom-lg transition-shadow duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${partner.name}&background=random&size=128`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

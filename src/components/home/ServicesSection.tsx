import { Link } from "react-router-dom";
import { ArrowRight, Zap, Building, Sun, Wind, Wrench, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    icon: Zap,
    title: "EHV Substations",
    description: "Design, construction and commissioning of Extra High Voltage substations up to 230kV capacity.",
    color: "primary",
  },
  {
    id: 2,
    icon: Building,
    title: "Transmission Lines",
    description: "Complete transmission line solutions including tower erection, stringing and maintenance.",
    color: "secondary",
  },
  {
    id: 3,
    icon: Sun,
    title: "Solar Power Plants",
    description: "End-to-end solar power solutions from design to installation and O&M services.",
    color: "primary",
  },
  {
    id: 4,
    icon: Wind,
    title: "Wind Power Systems",
    description: "Wind power station installation, grid integration and maintenance services.",
    color: "secondary",
  },
  {
    id: 5,
    icon: Wrench,
    title: "Operation & Maintenance",
    description: "24/7 operation and maintenance services for power infrastructure ensuring optimal performance.",
    color: "primary",
  },
  {
    id: 6,
    icon: Shield,
    title: "Testing & Commissioning",
    description: "Comprehensive testing and commissioning services for all electrical systems.",
    color: "secondary",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-muted relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container-custom px-4 relative">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Comprehensive Power <br />
              <span className="text-primary">Infrastructure</span> Solutions
            </h2>
          </div>
          <Link to="/services" className="flex-shrink-0">
            <Button variant="outline" size="lg">
              View All Services <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isPrimary = service.color === "primary";
            return (
              <div
                key={service.id}
                className="group bg-background rounded-2xl p-6 md:p-8 shadow-custom card-hover animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 ${
                    isPrimary
                      ? "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-glow-red"
                      : "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:shadow-glow-blue"
                  }`}
                >
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm md:text-base leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={`/services/${service.id}`}
                  className={`inline-flex items-center gap-2 font-medium transition-all duration-300 ${
                    isPrimary ? "text-primary" : "text-secondary"
                  } group-hover:gap-3`}
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

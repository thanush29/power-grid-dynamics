import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Career", path: "/career" },
  { label: "Contact Us", path: "/contact" },
];

const services = [
  "EHV Substations",
  "Transmission Lines",
  "Operation & Maintenance",
  "Solar Power Plants",
  "Civil Works",
  "Testing & Commissioning",
];

export function Footer() {
  return (
    <footer className="bg-dark-gradient text-background">
      {/* CTA Section */}
      <div className="bg-red-gradient py-10 md:py-16">
        <div className="container-custom px-4 text-center">
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            Any Enquiries? Let's Talk
          </h2>
          <p className="text-primary-foreground/80 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Ready to power your next project? Our team of experts is here to help you with all your electrical infrastructure needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero-outline" className="w-full sm:w-auto">
                Contact Us <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </Link>
            <a href="tel:+919840650939">
              <Button variant="hero" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90">
                <Phone className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Call Now
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 md:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-gradient flex items-center justify-center">
                  <span className="text-primary-foreground font-heading font-bold text-xl">M</span>
                </div>
                <div>
                  <span className="font-heading text-lg font-bold text-primary-foreground block">MASS Techno Power</span>
                  <span className="text-xs text-muted-foreground">Ayyappan & Co</span>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Certified Class I contractor executing Electrical, Civil, Substations & Transmission Line Works since 1990. Excellence in power infrastructure solutions.
              </p>
              <div className="flex gap-3">
                {[Facebook, Twitter, Linkedin, Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted/20 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-lg font-bold text-primary-foreground mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading text-lg font-bold text-primary-foreground mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <Link
                      to="/services"
                      className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group"
                    >
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-lg font-bold text-primary-foreground mb-6">Contact Us</h3>
              <div className="space-y-4">
                <a
                  href="tel:+919840650939"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>+91 98406 50939</span>
                </a>
                <a
                  href="mailto:info@masstechnopower.com"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>info@masstechnopower.com</span>
                </a>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-primary-foreground">Tamil Nadu Office</p>
                    <p>123 Main Street, Coimbatore, Tamil Nadu - 641001</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-secondary" />
                  <div>
                    <p className="font-medium text-primary-foreground">Chennai Office</p>
                    <p>456 Anna Salai, Chennai, Tamil Nadu - 600002</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-primary-foreground">Saudi Arabia Office</p>
                    <p>King Fahd Road, Riyadh, Saudi Arabia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-muted/20 py-6">
        <div className="container-custom px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 MASS Techno Power Infrastructure – Ayyappan & Co. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

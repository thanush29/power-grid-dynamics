import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
  { label: "Our Team", path: "/team" },
  { label: "Career", path: "/career" },
  { label: "Contact Us", path: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-foreground text-background py-2 px-4">
        <div className="container-custom flex flex-wrap justify-between items-center text-xs md:text-sm gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="mailto:info@masstechnopower.com" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Mail className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">info@masstechnopower.com</span>
            </a>
            <a href="tel:+919840650939" className="flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="w-3 h-3 md:w-4 md:h-4" />
              <span>+91 98406 50939</span>
            </a>
          </div>
          <div className="flex items-center gap-2 md:gap-4 text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden md:inline">Tamil Nadu</span>
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Chennai
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Saudi Arabia
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={cn(
          "transition-all duration-300 py-3 md:py-4",
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-custom"
            : "bg-background"
        )}
      >
        <div className="container-custom flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-red-gradient flex items-center justify-center">
                <span className="text-primary-foreground font-heading font-bold text-lg md:text-xl">M</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground text-[8px] md:text-[10px] font-bold">⚡</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-base md:text-xl font-bold text-primary leading-tight">MASS Techno Power</span>
              <span className="text-[10px] md:text-xs text-muted-foreground">Ayyappan & Co</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 relative group",
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300",
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/contact">
              <Button variant="default" size="lg">
                Get A Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 bg-background border-t border-border",
            isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="container-custom py-4 px-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-3 rounded-lg font-medium transition-all duration-300",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-2">
              <Button variant="default" className="w-full">
                Get A Quote
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

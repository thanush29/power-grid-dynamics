import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Quote, Linkedin, Mail } from "lucide-react";

import hero2 from "@/assets/hero-2.jpg";

const teamMembers = [
  {
    id: 1,
    name: "K. Ayyappan",
    designation: "Founder & Managing Director",
    description: "With over 40 years of experience in the power sector, Mr. Ayyappan founded the company in 1990 and has led it to become a leading infrastructure provider.",
    image: "https://ui-avatars.com/api/?name=K+Ayyappan&background=c41e3a&color=fff&size=400",
  },
  {
    id: 2,
    name: "S. Mohan Kumar",
    designation: "Chief Technical Officer",
    description: "A veteran engineer with expertise in EHV substations and transmission lines. Leads all technical operations and engineering teams.",
    image: "https://ui-avatars.com/api/?name=S+Mohan&background=1e4a8c&color=fff&size=400",
  },
  {
    id: 3,
    name: "R. Vijayakumar",
    designation: "Director - Operations",
    description: "Oversees day-to-day operations across all project sites. Ensures timely delivery and quality compliance.",
    image: "https://ui-avatars.com/api/?name=R+Vijay&background=c41e3a&color=fff&size=400",
  },
  {
    id: 4,
    name: "M. Lakshmi",
    designation: "Head - Finance & Admin",
    description: "Manages financial planning, budgeting and administrative functions. Ensures fiscal discipline and compliance.",
    image: "https://ui-avatars.com/api/?name=M+Lakshmi&background=1e4a8c&color=fff&size=400",
  },
  {
    id: 5,
    name: "P. Senthil Kumar",
    designation: "Project Manager - Solar",
    description: "Heads the solar power division with expertise in utility-scale solar plant development and O&M.",
    image: "https://ui-avatars.com/api/?name=P+Senthil&background=c41e3a&color=fff&size=400",
  },
  {
    id: 6,
    name: "N. Rajesh",
    designation: "Project Manager - Substations",
    description: "Leads substation construction projects. Expert in GIS and AIS substation design and execution.",
    image: "https://ui-avatars.com/api/?name=N+Rajesh&background=1e4a8c&color=fff&size=400",
  },
];

const testimonials = [
  {
    id: 1,
    quote: "I am very impressed with MASS Techno Power. They built solar panels for my home. Extremely skilled, cost-efficient, and professional. Highly recommended.",
    author: "Muthukumar Kannan",
    location: "Chennai",
  },
  {
    id: 2,
    quote: "Excellent work on our factory substation project. The team was professional, met all deadlines, and the quality of work is outstanding.",
    author: "Ramanathan S.",
    location: "Coimbatore",
  },
  {
    id: 3,
    quote: "We've been working with Ayyappan & Co for our O&M services. Their 24/7 support and quick response time is exceptional.",
    author: "Priya Sharma",
    location: "Tamil Nadu",
  },
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero2})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                Our Team
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Meet the Experts Behind Our Success
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                300+ skilled professionals driving excellence in power infrastructure
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
                Leadership Team
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Our <span className="text-primary">Leadership</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="bg-background rounded-2xl overflow-hidden shadow-custom card-hover animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{member.designation}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-background">
          <div className="container-custom px-4">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
                Testimonials
              </span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                What Our <span className="text-secondary">Clients</span> Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-muted rounded-2xl p-6 md:p-8 relative animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Quote className="w-12 h-12 text-primary/20 absolute top-6 right-6" />
                  <p className="text-foreground mb-6 leading-relaxed relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading font-bold text-primary">
                        {testimonial.author[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;

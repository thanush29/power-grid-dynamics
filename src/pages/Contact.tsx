import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

import hero4 from "@/assets/hero-4.jpg";

const services = [
  "EHV Substations",
  "Transmission Lines",
  "Solar Power Plants",
  "Wind Power Systems",
  "Operation & Maintenance",
  "Testing & Commissioning",
  "Civil Works",
  "Consultancy",
  "Other",
];

const offices = [
  {
    title: "Head Office",
    address: "No:5/107-D1, Meenakshi Nagar, 4th Street, A.Salaipudur, Kovilpatti, Tamil Nadu - 628502, India",
    phone: "+91 94421 52528",
    landline: "04632-242528",
    email: "info@masstechnopower.com",
  },
  {
    title: "Chennai Branch Office",
    address: "Old No.45, New No. 95, Ground Floor, Poes Main Road, Teynampet, Chennai - 600 018, India",
    phone: "+91 99620 56262",
    email: "info@masstechnopower.com",
  },
  {
    title: "Saudi Arabia Office",
    address: "Venus Energy, Noor Plaza (3rd Floor), 2770 Custodian of Two Holy Mosques Rd, Al Khobar - 34448, Saudi Arabia",
    phone: "+966 500164045",
    email: "info@masstechnopower.com",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero4})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                Contact Us
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Let's Discuss Your Project
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                Reach out to us for any inquiries about our services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-background rounded-2xl p-6 shadow-custom">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <a href="tel:04632-242528" className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Call Us</p>
                        <p className="font-semibold text-foreground">04632-242528</p>
                      </div>
                    </a>
                    <a href="mailto:info@masstechnopower.com" className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email Us</p>
                        <p className="font-semibold text-foreground">info@masstechnopower.com</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4 p-3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Working Hours</p>
                        <p className="font-semibold text-foreground">Mon - Sat: 9AM - 6PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Addresses */}
                {offices.map((office, i) => (
                  <div key={i} className="bg-background rounded-2xl p-6 shadow-custom">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">{office.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                        <p className="text-sm text-muted-foreground">{office.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-background rounded-2xl p-6 md:p-8 shadow-custom">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="bg-muted"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Service</label>
                        <select
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-10 px-3 rounded-md border border-input bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">Select a Service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help you?"
                        rows={5}
                        className="bg-muted resize-none"
                      />
                    </div>
                    <Button type="submit" variant="default" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>

                {/* Maps */}
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-background rounded-2xl p-4 shadow-custom">
                    <h4 className="font-semibold text-foreground mb-4">Kovilpatti Head Office</h4>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.9092942845846!2d77.84529751109164!3d9.162655090866188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06b3993a3f6e67%3A0x76c5001d524bff58!2sAyyappan%20%26%20Co!5e0!3m2!1sen!2sin!4v1764667423536!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: "0.5rem" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <div className="bg-background rounded-2xl p-4 shadow-custom">
                    <h4 className="font-semibold text-foreground mb-4">Chennai Office</h4>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.918370024644!2d80.24768671114234!3d13.040867787227862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700742fb955%3A0xe95d30601d229b5a!2sAyyappan%20%26%20Co%20Chennai%20Headquarters!5e0!3m2!1sen!2sin!4v1764667500119!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: "0.5rem" }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Users, TrendingUp, Shield, Send } from "lucide-react";

import hero5 from "@/assets/hero-5.jpg";

const positions = [
  "Electrical Engineer",
  "Project Manager",
  "Site Supervisor",
  "Safety Officer",
  "Civil Engineer",
  "Accounts Executive",
  "HR Manager",
  "Other",
];

const benefits = [
  { icon: Briefcase, title: "Career Growth", desc: "Clear advancement paths with regular promotions" },
  { icon: Users, title: "Great Team", desc: "Work with 300+ skilled professionals" },
  { icon: TrendingUp, title: "Learning", desc: "Continuous training and development programs" },
  { icon: Shield, title: "Benefits", desc: "Comprehensive health and insurance coverage" },
];

const Career = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  phone: "",
  currentRole: "",
  applyFor: "",
  experience: "",
  dob: "",
  gender: "",
  message: "",
  resume: null as File | null,
  termsAccepted: false,
});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Application Submitted!",
      description: "We'll review your application and get back to you soon.",
    });
    setFormData({
  fullName: "",
  email: "",
  phone: "",
  currentRole: "",
  applyFor: "",
  experience: "",
  dob: "",
  gender: "",
  message: "",
  resume: null,
  termsAccepted: false,
});
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
            style={{ backgroundImage: `url(${hero5})` }}
          />
          <div className="absolute inset-0 bg-hero-gradient opacity-95" />
          <div className="container-custom px-4 relative">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full text-secondary-foreground text-sm font-medium mb-6 border border-secondary/30">
                Join Our Team
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                Build Your Career With Us
              </h1>
              <p className="text-primary-foreground/80 text-lg md:text-xl">
                Join 300+ professionals powering India's infrastructure growth
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-muted">
          <div className="container-custom px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Why Work With <span className="text-primary">Us</span>?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center p-6 bg-background rounded-xl shadow-custom">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="section-padding bg-background">
  <div className="container-custom px-4">
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-medium mb-4">
          Apply Now
        </span>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Submit Your <span className="text-secondary">Application</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-muted rounded-2xl p-6 md:p-8 shadow-custom space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
            <Input
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Your Full Name"
              className="bg-background"
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
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
            <Input
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Role</label>
            <Input
              value={formData.currentRole}
              onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
              placeholder="Your Current Position"
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Apply For *</label>
            <select
              required
              value={formData.applyFor}
              onChange={(e) => setFormData({ ...formData, applyFor: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Years of Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 5 years"
              className="bg-background"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date of Birth</label>
            <Input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="bg-background"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Resume (PDF) *</label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf"
              required
              onChange={(e) => setFormData({ ...formData, resume: e.target.files?.[0] || null })}
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90 cursor-pointer"
            />
          </div>
          {formData.resume && (
            <p className="text-xs text-muted-foreground mt-2">
              Selected: {formData.resume.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Cover Letter / Message</label>
          <Textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Tell us about yourself and why you want to join us..."
            rows={4}
            className="bg-background resize-none"
          />
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I accept the terms and conditions and agree that my data will be processed for recruitment purposes.
          </label>
        </div>

        <Button type="submit" variant="default" size="xl" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Application <Send className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </form>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </div>
  );
};

export default Career;

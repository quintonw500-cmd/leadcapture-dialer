import { Phone, CheckCircle, Shield, Clock, Users } from "lucide-react";
import heroFamily from "../assets/hero-family-new.jpg";
import { useAnalyticsContext } from "./AnalyticsProvider";

const HeroSection = () => {
  const phoneNumber = "866-595-7540";
  const { trackPhoneCall, trackEngagement } = useAnalyticsContext();

  const handlePhoneClick = () => {
    trackPhoneCall(phoneNumber, 'hero_section');
  };

  const handleBenefitView = (benefit: string) => {
    trackEngagement('benefit', benefit, 'view');
  };
  
  return (
    <section className="hero-section py-16 lg:py-24 text-white">
      <div className="container mx-auto px-4 hero-content">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                <Shield className="w-4 h-4" />
                <span>Licensed Insurance Professional</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Life Insurance Policy
                <span className="block text-primary">Help & Support</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Licensed independent agents ready to assist with your coverage questions, policy reviews, and benefit claims.
              </p>
              
              <p className="text-lg text-white/80 max-w-md">
                Licensed independent agents specializing in life insurance policy support. Get help with policy reviews, coverage questions, billing issues, and benefit claims. No medical exam options available for policy upgrades.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: CheckCircle, text: "Instant Policy Review Available" },
                { icon: Shield, text: "Licensed Insurance Professionals" },
                { icon: Clock, text: "No Medical Exam Options Available" },
                { icon: Users, text: "All 50 States Coverage" }
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="benefit-check">
                    <benefit.icon className="w-3 h-3" />
                  </div>
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <a 
                href={`tel:${phoneNumber}`}
                className="btn-call w-full md:w-auto inline-flex items-center justify-center space-x-3 text-lg"
                onClick={handlePhoneClick}
              >
                <Phone className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-bold">Call Now: {phoneNumber}</div>
                  <div className="text-sm opacity-90">Speak With a Licensed Agent</div>
                </div>
              </a>
              
              <p className="text-white/70 text-sm">
                🔒 100% Secure & Confidential • No Obligation Required
              </p>
              
              <p className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-lg p-3">
                ⚠️ <strong>IMPORTANT:</strong> Review your current policy regularly. Many policyholders are overpaying or have coverage that doesn't meet their needs. Get a free policy review today.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-large)]">
              <img 
                src={heroFamily} 
                alt="Happy family protected by life insurance coverage"
                className="w-full h-auto object-cover object-[center_20%] md:object-center"
              />
              
              {/* Overlay Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { number: "50K+", label: "Families Protected" },
                    { number: "$2.8B", label: "Coverage Provided" },
                    { number: "15+", label: "Years Serving" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="stat-number text-2xl">{stat.number}</div>
                      <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
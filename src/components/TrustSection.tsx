import { Shield, Award, Users, CheckCircle2, Phone } from "lucide-react";

const TrustSection = () => {
  const phoneNumber = "866-595-7540";
  
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container mx-auto px-4">
        {/* Trust Badges */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary-dark rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Shield className="w-4 h-4" />
            <span>Official Trust & Compliance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Verified by Government Standards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our licensing, compliance, and customer satisfaction ratings are verified 
            by official government agencies and independent organizations.
          </p>
        </div>

        {/* Trust Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { 
              icon: Users, 
              number: "50,000+", 
              label: "Families Served",
              sublabel: "Since 2008" 
            },
            { 
              icon: Award, 
              number: "A+ Rating", 
              label: "Better Business Bureau",
              sublabel: "Accredited Business" 
            },
            { 
              icon: Shield, 
              number: "All 50 States", 
              label: "Licensed Coverage",
              sublabel: "Nationwide Service" 
            },
            { 
              icon: CheckCircle2, 
              number: "$2.8B", 
              label: "Coverage Provided",
              sublabel: "Total Policies" 
            }
          ].map((item, index) => (
            <div key={index} className="trust-badge text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="stat-number text-xl md:text-2xl mb-2">{item.number}</div>
              <div className="font-semibold text-foreground mb-1">{item.label}</div>
              <div className="text-sm text-muted-foreground">{item.sublabel}</div>
            </div>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-medium)]">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Official Benefits & Guarantees
            </h3>
            <p className="text-muted-foreground text-lg">
              Licensed independent agent providing personalized service and competitive rates
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Policy Reviews",
                description: "Comprehensive analysis of your coverage"
              },
              {
                title: "Claims Support",
                description: "Help with benefit claims process"
              },
              {
                title: "Licensed Agent",
                description: "State-certified professional guidance"
              },
              {
                title: "All 50 States",
                description: "Nationwide policy support available"
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="benefit-check mx-auto mb-3">
                  <CheckCircle2 className="w-3 h-3" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call mx-auto inline-flex items-center space-x-3 text-lg mb-4"
            >
              <Phone className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold">Speak with Licensed Agent</div>
                <div className="text-sm opacity-90">{phoneNumber}</div>
              </div>
            </a>
            <p className="text-muted-foreground text-sm">
              Call now for policy support • No pressure, no obligations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
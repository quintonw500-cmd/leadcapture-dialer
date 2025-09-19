import { Phone, Mail, Shield, Award } from "lucide-react";
import quintonHeadshot from "../assets/quinton-headshot.png";

const AgentSection = () => {
  const phoneNumber = "866-595-7540";
  
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Meet Your Licensed Agent
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work directly with a licensed professional who understands your family's unique needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Agent Photo */}
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8">
              <div className="relative">
                <img 
                  src={quintonHeadshot} 
                  alt="Quinton Williams - Licensed Life Insurance Agent"
                  className="w-64 h-64 object-cover rounded-xl shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-primary text-white p-3 rounded-full shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Agent Info */}
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-dark mb-2">
                  Quinton Williams
                </h3>
                <p className="text-lg text-primary font-semibold mb-4">
                  Licensed Life Insurance Agent
                </p>
                
                <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">NPN: 21258890</span>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Licensed in all 50 states with years of experience helping families 
                  secure their financial future through comprehensive life insurance solutions.
                </p>
              </div>

              <div className="space-y-4">
                <a 
                  href={`tel:${phoneNumber}`}
                  className="flex items-center space-x-3 bg-primary text-white py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">{phoneNumber}</div>
                    <div className="text-xs opacity-90">Call for Free Consultation</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:quintonw500@gmail.com"
                  className="flex items-center space-x-3 border border-primary text-primary py-3 px-6 rounded-xl hover:bg-primary/5 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">quintonw500@gmail.com</div>
                    <div className="text-xs opacity-70">Email for Questions</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-primary-dark mb-2">Fully Licensed</h4>
            <p className="text-sm text-muted-foreground">
              Licensed professional in all 50 states with proper credentials
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-primary-dark mb-2">Experienced</h4>
            <p className="text-sm text-muted-foreground">
              Years of experience helping families find the right coverage
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-bold text-primary-dark mb-2">Always Available</h4>
            <p className="text-sm text-muted-foreground">
              Direct access to your agent for questions and support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
import { Phone, Mail, Shield, Award } from "lucide-react";
import quintonHeadshot from "../assets/quinton-headshot-transparent.png";

const AgentSection = () => {
  const phoneNumber = "866-595-7540";
  
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
            Meet Your Licensed Agent
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work directly with a licensed professional who understands your family's unique needs
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          {/* Main Agent Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 mx-4 sm:mx-0">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Agent Photo - Takes up more space and better positioning */}
              <div className="lg:col-span-2 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-end justify-center relative overflow-hidden min-h-[300px] sm:min-h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
                <img 
                  src={quintonHeadshot} 
                  alt="Quinton Williams - Licensed Life Insurance Agent"
                  className="w-full h-full object-contain object-bottom transform scale-105 sm:scale-110 filter drop-shadow-2xl relative z-10"
                />
                {/* Floating credential badge */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-sm text-primary px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg z-20">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">Licensed</span>
                  </div>
                </div>
              </div>

              {/* Agent Info - Takes up remaining space */}
              <div className="lg:col-span-3 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-dark mb-2 sm:mb-3">
                    Quinton Williams
                  </h3>
                  <p className="text-lg sm:text-xl text-primary font-semibold mb-3 sm:mb-4">
                    Licensed Life Insurance Agent
                  </p>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground mb-4 sm:mb-6">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:font-medium">NPN: 21258890</span>
                  </div>
                  
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                    Licensed in all 50 states with years of experience helping families 
                    secure their financial future through comprehensive life insurance solutions.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <a 
                    href={`tel:${phoneNumber}`}
                    className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 bg-primary text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] group"
                  >
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-center lg:text-left">
                      <div className="font-bold text-base sm:text-lg">{phoneNumber}</div>
                      <div className="text-xs sm:text-sm opacity-90">Call for Free Consultation</div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:quintonw500@gmail.com"
                    className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 border-2 border-primary text-primary py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl hover:bg-primary/5 transition-all duration-300 hover:shadow-lg group"
                  >
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                    <div className="text-center lg:text-left">
                      <div className="font-bold text-sm sm:text-lg break-all sm:break-normal">quintonw500@gmail.com</div>
                      <div className="text-xs sm:text-sm opacity-70">Email for Questions</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center group">
              <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-primary-dark mb-2 sm:mb-3">Fully Licensed</h4>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Licensed professional in all 50 states with proper credentials and ongoing education
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center group">
              <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-primary-dark mb-2 sm:mb-3">Experienced</h4>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Years of experience helping families find the right coverage for their unique situations
              </p>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 text-center group">
              <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl text-primary-dark mb-2 sm:mb-3">Always Available</h4>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Direct access to your agent for questions, support, and ongoing policy management
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
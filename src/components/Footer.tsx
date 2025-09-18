import { Phone, Shield, Mail, MapPin } from "lucide-react";
import shieldIcon from "../assets/shield-icon.png";

const Footer = () => {
  const phoneNumber = "866-595-7540";
  
  return (
    <footer className="bg-primary-dark text-white">
      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-primary-dark to-primary py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Access Federal Life Insurance Benefits?
          </h2>
          <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Don't wait - federal program enrollment has limited availability. 
            Contact our benefits hotline to check your eligibility today.
          </p>
          
          <a 
            href={`tel:${phoneNumber}`}
            className="inline-flex items-center space-x-3 bg-white text-primary-dark font-bold py-4 px-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg"
          >
            <Phone className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold">Call Now: {phoneNumber}</div>
              <div className="text-sm opacity-80">Federal Benefits Hotline</div>
            </div>
          </a>
          
          <p className="text-white/70 text-sm mt-4">
            Available 7 days a week • Authorized in all 50 states
          </p>
        </div>
      </div>

      {/* Footer Content */}
      <div className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            {/* Company Info */}
            <div>
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <img 
                  src={shieldIcon} 
                  alt="US Life Help Federal Seal" 
                  className="w-8 h-8"
                />
                <div>
                  <h3 className="font-bold text-lg">US Life Help</h3>
                  <p className="text-sm text-white/70">Federal Life Insurance Program</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-4">
                Federal life insurance program providing government-backed 
                coverage solutions for American families across all 50 states.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href={`tel:${phoneNumber}`} className="hover:text-primary transition-colors">
                    {phoneNumber}
                  </a>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-white/80">Authorized in All 50 States</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-white/80">Federally Authorized & Insured</span>
                </div>
              </div>
            </div>

            {/* Legal Info */}
            <div>
              <h4 className="font-semibold mb-4">Important Information</h4>
              <div className="text-sm text-white/80 space-y-2">
                <p>Government authorized program</p>
                <p>Benefits vary by age, health, and coverage</p>
                <p>No obligation enrollment information</p>
                <p>All inquiries are confidential</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/60">
            <p>&copy; 2024 US Life Help Federal Program. All rights reserved.</p>
            <p className="mt-2">
              This website is operated under federal oversight and authorization. 
              Official US government life insurance program.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
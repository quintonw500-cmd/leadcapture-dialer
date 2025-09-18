import { Phone } from "lucide-react";
import shieldIcon from "../assets/shield-icon.png";

const Header = () => {
  const phoneNumber = "866-595-7540";
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={shieldIcon} 
              alt="US Government Life Insurance Seal" 
              className="w-10 h-10"
            />
            <div>
              <h1 className="text-xl font-bold text-primary-dark">US Life Help</h1>
              <p className="text-xs text-muted-foreground">Federal Life Insurance Program</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Official Government Program</p>
              <p className="text-xs text-muted-foreground">Federal Benefits Hotline Available</p>
            </div>
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile call button */}
          <div className="md:hidden">
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call flex items-center space-x-2 text-sm px-4 py-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
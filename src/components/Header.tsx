import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import shieldIcon from "../assets/shield-icon.png";
import { useAnalyticsContext } from "./AnalyticsProvider";

const Header = () => {
  const phoneNumber = "866-595-7540";
  const { trackPhoneCall, trackNavigation } = useAnalyticsContext();

  const handlePhoneClick = () => {
    trackPhoneCall(phoneNumber, 'header');
  };

  const handleLogoClick = () => {
    trackNavigation('/', 'header_logo');
  };
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity" onClick={handleLogoClick}>
              <img 
                src={shieldIcon} 
                alt="Life Insurance Shield" 
                className="w-10 h-10 md:w-14 md:h-14"
              />
              <div>
                <h1 className="text-2xl font-bold text-primary-dark">US Life Help</h1>
                <p className="text-sm text-muted-foreground">Licensed Insurance Agent</p>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-4">
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Call for Policy Help</p>
              <p className="text-xs text-muted-foreground">Licensed Professional Available</p>
            </div>
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call flex flex-col items-center gap-1 py-3 px-6"
              onClick={handlePhoneClick}
            >
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="font-bold text-sm">Speak to an Agent Now</span>
              </div>
              <span className="font-bold text-xs">{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile call button */}
          <div className="md:hidden">
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call flex flex-col items-center gap-0.5 py-1.5 px-3 text-xs"
              onClick={handlePhoneClick}
            >
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                <span className="font-semibold">Call Now</span>
              </div>
              <span className="font-semibold">{phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
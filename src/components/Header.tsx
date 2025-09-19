import { Phone, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import shieldIcon from "../assets/shield-icon.png";

const Header = () => {
  const phoneNumber = "866-595-7540";
  const { user, signOut, isAdmin } = useAuth();
  
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <img 
                src={shieldIcon} 
                alt="Life Insurance Shield" 
                className="w-10 h-10"
              />
              <div>
                <h1 className="text-xl font-bold text-primary-dark">US Life Help</h1>
                <p className="text-xs text-muted-foreground">Licensed Insurance Agent</p>
              </div>
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-4">
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/blog-admin">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Blog Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Call Now for Instant Quote</p>
              <p className="text-xs text-muted-foreground">Licensed Professional Available</p>
            </div>
            <a 
              href={`tel:${phoneNumber}`}
              className="btn-call flex items-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>{phoneNumber}</span>
            </a>
          </div>

          {/* Mobile call button and auth */}
          <div className="md:hidden flex items-center space-x-2">
            {user ? (
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
              </Link>
            )}
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
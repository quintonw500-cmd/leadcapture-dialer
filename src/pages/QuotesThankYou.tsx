import { CheckCircle2, Phone, Shield, Award, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import shieldIcon from "@/assets/shield-icon.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RateCalculator from "@/components/RateCalculator";

const QuotesThankYou = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Google Ads conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17556221631/j_gPCJeb8qcbEL_durNB',
        'value': 50.0,
        'currency': 'USD'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shieldIcon} alt="Life Insure Help Services" className="w-10 h-10" />
            <span className="font-semibold text-lg hidden sm:inline">Life Insure Help Services</span>
          </div>
          <a 
            href="tel:8665957540" 
            className="flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">(866) 595-7540</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* Thank You Content */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto shadow-2xl text-center">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <CheckCircle2 className="w-16 h-16 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl text-primary">Thank You!</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Your quote request has been received.
            </p>
            <p className="text-lg font-semibold text-foreground">
              A licensed agent will contact you within 5 minutes at the phone number you provided.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>A licensed agent will call you to discuss your coverage needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>We'll compare rates from 40+ top-rated insurance carriers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>You'll receive personalized recommendations based on your needs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Same-day approval is available for qualified applicants</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Need immediate assistance? Call us now:
              </p>
              <a href="tel:8665957540">
                <Button size="lg" className="w-full md:w-auto">
                  <Phone className="w-5 h-5 mr-2" />
                  (866) 595-7540
                </Button>
              </a>
            </div>

            <div className="pt-6 border-t">
              <Button variant="outline" onClick={() => navigate("/")}>
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rate Calculator */}
        <div className="mt-12">
          <RateCalculator />
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center p-6 border-primary/20">
            <Shield className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Licensed & Insured</h3>
            <p className="text-sm text-muted-foreground">Fully licensed agents in all 50 states</p>
          </Card>
          <Card className="text-center p-6 border-primary/20">
            <Award className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">40+ Carriers</h3>
            <p className="text-sm text-muted-foreground">We compare rates to find you the best deal</p>
          </Card>
          <Card className="text-center p-6 border-primary/20">
            <Lock className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-2">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">Your information is always protected</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default QuotesThankYou;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Shield, Lock, Phone, CheckCircle, Users, DollarSign, Clock, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import shieldIcon from "@/assets/shield-icon.png";
import heroImage from "@/assets/hero-family-new.jpg";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  coverage: string;
  tobacco: string;
}

const Quotes = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    coverage: "",
    tobacco: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Form submitted:", formData);
      navigate("/quotes/thank-you");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b shadow-md">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src={shieldIcon} alt="Life Insure Help Services" className="w-8 h-8 md:w-12 md:h-12" />
            <span className="font-semibold text-sm md:text-xl">Life Insure Help Services</span>
          </div>
          <a 
            href="tel:8665957540" 
            className="btn-call btn-call-pulse flex items-center gap-2 py-2 px-4 md:py-3 md:px-5"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-bold text-sm md:text-base">(866) 595-7540</span>
          </a>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary/80 to-primary">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 animate-pulse"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L3N2Zz4=')] opacity-40" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shimmer" />
        
        <div className="relative container mx-auto px-4 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 md:mb-8 text-white drop-shadow-2xl leading-tight animate-fade-in">
            Get Your Free Life Insurance Quote in 60 Seconds
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/95 max-w-3xl mx-auto font-semibold mb-8 drop-shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Compare rates from 40+ carriers. No medical exam options available.
          </p>
          
          {/* Social Proof Stats Badge */}
          <div className="inline-flex flex-wrap justify-center items-center gap-4 md:gap-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 md:px-10 py-4 md:py-5 text-white shadow-2xl hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 md:w-7 md:h-7 animate-float" />
              <span className="text-sm md:text-lg font-bold">50,000+ Families Protected</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 md:w-7 md:h-7 animate-float" style={{ animationDelay: '0.3s' }} />
              <span className="text-sm md:text-lg font-bold">$2.8B Coverage</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30" />
            <div className="flex items-center gap-2">
              <Award className="w-6 h-6 md:w-7 md:h-7 animate-float" style={{ animationDelay: '0.6s' }} />
              <span className="text-sm md:text-lg font-bold">A+ Rated Carriers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Card */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-2xl mx-auto shadow-2xl border-2 border-border/50 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-shadow duration-300">
          <CardHeader className="text-center space-y-4 pb-6">
            <div>
              <CardTitle className="text-2xl md:text-3xl text-primary mb-2">Your Free Quote</CardTitle>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Step {step} of {totalSteps}</p>
            </div>
            <Progress value={progress} className="w-full h-3" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="(555) 555-5555"
                    required
                    className="h-12 text-base"
                  />
                </div>

                <Button 
                  onClick={nextStep} 
                  disabled={!formData.firstName || !formData.lastName || !formData.phone}
                  className="w-full h-16 text-xl font-extrabold bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                  size="lg"
                >
                  Continue <ArrowRight className="w-6 h-6 ml-2" />
                </Button>
                
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground mt-3">
                  <Lock className="w-4 h-4" />
                  <span>256-bit SSL Encrypted | Your info is never sold</span>
                </div>
              </div>
            )}

            {/* Step 2: Coverage Details */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-base">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage" className="text-base">Coverage Amount Needed *</Label>
                  <Select value={formData.coverage} onValueChange={(value) => updateFormData("coverage", value)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select coverage amount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5000">$5,000</SelectItem>
                      <SelectItem value="10000">$10,000</SelectItem>
                      <SelectItem value="25000">$25,000</SelectItem>
                      <SelectItem value="50000">$50,000</SelectItem>
                      <SelectItem value="100000">$100,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-14 text-base" size="lg">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.dateOfBirth || !formData.coverage}
                    className="flex-1 h-14 text-lg font-extrabold bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground mt-3">
                  <Lock className="w-4 h-4" />
                  <span>256-bit SSL Encrypted | Your info is never sold</span>
                </div>
              </div>
            )}

            {/* Step 3: Tobacco Status */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="tobacco" className="text-base">Do you use tobacco or nicotine? *</Label>
                  <Select value={formData.tobacco} onValueChange={(value) => updateFormData("tobacco", value)}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select tobacco/nicotine use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-14 text-base" size="lg">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.tobacco}
                    className="flex-1 h-16 text-xl font-extrabold bg-success hover:bg-success/90 text-success-foreground shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    size="lg"
                  >
                    Get My Free Quote
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground mt-3">
                  <Lock className="w-4 h-4" />
                  <span>256-bit SSL Encrypted | Your info is never sold</span>
                </div>

                <div className="bg-success/10 border border-success/30 p-4 md:p-5 rounded-lg space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-sm md:text-base font-semibold text-success">
                    <Lock className="w-5 h-5" />
                    Your information is secure
                  </div>
                  <div className="text-xs md:text-sm text-foreground/80">
                    We never sell your data. Licensed agents only. TCPA compliant.
                  </div>
                </div>
              </div>
            )}

            {/* Compliance Disclaimer */}
            <div className="text-xs md:text-sm text-muted-foreground text-center pt-4 border-t">
              By submitting this form, you agree to be contacted by licensed insurance agents regarding life insurance options. 
              Message and data rates may apply.
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next Section */}
        <div className="max-w-2xl mx-auto mt-8 md:mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">What Happens Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h4 className="font-semibold text-base mb-2">Submit Your Info</h4>
              <p className="text-sm text-muted-foreground">Quick 60-second form</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h4 className="font-semibold text-base mb-2">Agent Calls You</h4>
              <p className="text-sm text-muted-foreground">Within 5 minutes</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h4 className="font-semibold text-base mb-2">Get Your Quote</h4>
              <p className="text-sm text-muted-foreground">Compare rates instantly</p>
            </div>
          </div>
        </div>

        {/* Social Proof Reviews Section */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-10">
          <h3 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">Join Thousands of Protected Families</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-card border border-border rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-base">⭐</span>
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-3">
                "Applied for $500K in coverage and got approved the same day. The whole process took less than 15 minutes."
              </p>
              <p className="text-xs text-muted-foreground font-medium">– Marcus T., FL</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-base">⭐</span>
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-3">
                "Finally got my family protected. $250K coverage for less than $40/month—way more affordable than I thought."
              </p>
              <p className="text-xs text-muted-foreground font-medium">– Jennifer R., OH</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-base">⭐</span>
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-3">
                "Got approved instantly with no medical exam. Couldn't believe how simple it was at my age."
              </p>
              <p className="text-xs text-muted-foreground font-medium">– Patricia K., MI</p>
            </div>
          </div>
        </div>

        {/* Trust Badges Section */}
        <div className="max-w-4xl mx-auto mt-8 md:mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="trust-badge text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Clock className="w-10 h-10 md:w-12 md:h-12 text-success group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Licensed Agents</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Available 7 days/week</p>
            </div>
            
            <div className="trust-badge text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-success group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">No Obligation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">100% free quotes</p>
            </div>
            
            <div className="trust-badge text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-success group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Fast Approval</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Same-day available</p>
            </div>
            
            <div className="trust-badge text-center group hover:scale-105 transition-transform duration-300">
              <div className="flex justify-center mb-3">
                <Award className="w-10 h-10 md:w-12 md:h-12 text-success group-hover:animate-pulse" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Top Carriers</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Compare 40+ options</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quotes;
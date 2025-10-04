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
      <header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={shieldIcon} alt="Life Insure Help Services" className="w-10 h-10 md:w-12 md:h-12" />
            <span className="font-semibold text-base md:text-lg hidden sm:inline">Life Insure Help Services</span>
          </div>
          <a 
            href="tel:8665957540" 
            className="btn-call text-sm md:text-base py-2 md:py-3 px-4 md:px-6"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">(866) 595-7540</span>
            <span className="sm:hidden">Call Now</span>
          </a>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary/80 to-primary">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L3N2Zz4=')] opacity-40" />
        
        <div className="relative container mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
            Get Your Free Life Insurance Quote in 60 Seconds
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto font-medium">
            Compare rates from 40+ carriers. No medical exam options available.
          </p>
          
          {/* Social Proof Stats */}
          <div className="mt-8 md:mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-12 text-white">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base font-semibold">50,000+ Families Protected</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base font-semibold">$2.8B in Coverage Provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Card */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <Card className="max-w-2xl mx-auto shadow-[var(--shadow-large)] border-2">
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
                  className="w-full h-14 text-lg font-bold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-large)] transition-all"
                  size="lg"
                >
                  Continue <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
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
                    className="flex-1 h-14 text-base font-bold shadow-[var(--shadow-button)]"
                    size="lg"
                  >
                    Continue <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
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

                <div className="bg-muted/50 p-4 md:p-5 rounded-lg space-y-2 border border-border">
                  <div className="flex items-center gap-2 text-sm md:text-base font-medium">
                    <Lock className="w-5 h-5 text-primary" />
                    Your information is secure
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">
                    We never sell your data. Licensed agents only. TCPA compliant.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1 h-14 text-base" size="lg">
                    <ArrowLeft className="w-5 h-5 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.tobacco}
                    className="flex-1 h-14 text-base md:text-lg font-bold shadow-[var(--shadow-button)] hover:shadow-[var(--shadow-large)] transition-all"
                    size="lg"
                  >
                    Get My Free Quote
                  </Button>
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

        {/* Trust Badges Section */}
        <div className="max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="trust-badge text-center">
              <div className="flex justify-center mb-3">
                <Clock className="w-10 h-10 md:w-12 md:h-12 text-success" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Licensed Agents</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Available 7 days/week</p>
            </div>
            
            <div className="trust-badge text-center">
              <div className="flex justify-center mb-3">
                <Shield className="w-10 h-10 md:w-12 md:h-12 text-success" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">No Obligation</h3>
              <p className="text-xs md:text-sm text-muted-foreground">100% free quotes</p>
            </div>
            
            <div className="trust-badge text-center">
              <div className="flex justify-center mb-3">
                <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-success" />
              </div>
              <h3 className="font-semibold text-sm md:text-base mb-1">Fast Approval</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Same-day available</p>
            </div>
            
            <div className="trust-badge text-center">
              <div className="flex justify-center mb-3">
                <Award className="w-10 h-10 md:w-12 md:h-12 text-success" />
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
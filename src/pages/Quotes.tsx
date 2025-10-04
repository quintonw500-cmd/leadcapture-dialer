import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Shield, Lock, Phone, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import shieldIcon from "@/assets/shield-icon.png";

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
      // Here you would normally send data to your backend
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary">
          Get Your Free Life Insurance Quote in 60 Seconds
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Compare rates from 40+ carriers. No medical exam options available.
        </p>
      </section>

      {/* Form Card */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="max-w-2xl mx-auto shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <div>
              <CardTitle className="text-2xl text-primary">Your Free Quote</CardTitle>
              <p className="text-muted-foreground">Step {step} of {totalSteps}</p>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData("firstName", e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData("lastName", e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="(555) 555-5555"
                    required
                  />
                </div>

                <Button 
                  onClick={nextStep} 
                  disabled={!formData.firstName || !formData.lastName || !formData.phone}
                  className="w-full"
                  size="lg"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Step 2: Coverage Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage">Coverage Amount Needed *</Label>
                  <Select value={formData.coverage} onValueChange={(value) => updateFormData("coverage", value)}>
                    <SelectTrigger>
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
                  <Button variant="outline" onClick={prevStep} className="flex-1" size="lg">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={nextStep} 
                    disabled={!formData.dateOfBirth || !formData.coverage}
                    className="flex-1"
                    size="lg"
                  >
                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Tobacco Status */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tobacco">Do you use tobacco or nicotine? *</Label>
                  <Select value={formData.tobacco} onValueChange={(value) => updateFormData("tobacco", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tobacco/nicotine use" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    Your information is secure
                  </div>
                  <div className="text-xs text-muted-foreground">
                    We never sell your data. Licensed agents only. TCPA compliant.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={prevStep} className="flex-1" size="lg">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.tobacco}
                    className="flex-1"
                    size="lg"
                  >
                    Get My Free Quote
                  </Button>
                </div>
              </div>
            )}

            {/* Compliance Disclaimer */}
            <div className="text-xs text-muted-foreground text-center pt-4 border-t">
              By submitting this form, you agree to be contacted by licensed insurance agents regarding life insurance options. 
              Message and data rates may apply.
            </div>
          </CardContent>
        </Card>

        {/* Trust Badges */}
        <div className="max-w-2xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Licensed agents available 7 days/week</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>No obligation, 100% free quotes</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Same-day approval available</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            <span>Compare 40+ top-rated carriers</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quotes;

import { useState } from "react";
import { Phone, Shield, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    smoker: "",
    coverageAmount: "",
    state: "",
    preferredContact: "",
    bestTimeToCall: "",
    agreeToContact: false,
  });

  const phoneNumber = "866-595-7540";

  const handleInputChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just redirect to phone call since this is a call-only campaign
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Get Your Free Life Insurance Quote
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Protect your family's financial future starting at just $1 per day
        </p>
        
        {/* Primary CTA */}
        <div className="mb-8">
          <a 
            href={`tel:${phoneNumber}`}
            className="btn-call inline-flex items-center justify-center space-x-3 text-lg px-8 py-4"
          >
            <Phone className="w-6 h-6" />
            <div className="text-left">
              <div className="font-bold">Call Now: {phoneNumber}</div>
              <div className="text-sm opacity-90">Speak with a Licensed Agent</div>
            </div>
          </a>
          <p className="text-sm text-muted-foreground mt-2">
            🔒 Free consultation • No pressure • Expert guidance
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: CheckCircle, title: "Instant Approval", desc: "Most applications in 60 seconds" },
            { icon: Clock, title: "No Medical Exam", desc: "For coverage up to $500,000" },
            { icon: Shield, title: "Licensed Agents", desc: "State-certified professionals" }
          ].map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <benefit.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Quick Quote Information</span>
          </CardTitle>
          <CardDescription>
            Fill out this form and our licensed agent will call you with your personalized quote
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className="mt-1"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex space-x-6 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">Height</Label>
                <Select onValueChange={(value) => handleInputChange("height", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select height" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 24 }, (_, i) => {
                      const feet = Math.floor((i + 60) / 12);
                      const inches = (i + 60) % 12;
                      return (
                        <SelectItem key={i} value={`${feet}'${inches}"`}>
                          {feet}'{inches}"
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => handleInputChange("weight", e.target.value)}
                  className="mt-1"
                  placeholder="150"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Do you smoke or use tobacco? *</Label>
                <RadioGroup
                  value={formData.smoker}
                  onValueChange={(value) => handleInputChange("smoker", value)}
                  className="flex space-x-6 mt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="non-smoker" />
                    <Label htmlFor="non-smoker">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="smoker" />
                    <Label htmlFor="smoker">Yes</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="coverageAmount">Desired Coverage Amount *</Label>
                <Select onValueChange={(value) => handleInputChange("coverageAmount", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100000">$100,000</SelectItem>
                    <SelectItem value="250000">$250,000</SelectItem>
                    <SelectItem value="500000">$500,000</SelectItem>
                    <SelectItem value="750000">$750,000</SelectItem>
                    <SelectItem value="1000000">$1,000,000</SelectItem>
                    <SelectItem value="1500000">$1,500,000</SelectItem>
                    <SelectItem value="2000000">$2,000,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="state">State of Residence *</Label>
                <Select onValueChange={(value) => handleInputChange("state", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AL">Alabama</SelectItem>
                    <SelectItem value="AK">Alaska</SelectItem>
                    <SelectItem value="AZ">Arizona</SelectItem>
                    <SelectItem value="AR">Arkansas</SelectItem>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="CO">Colorado</SelectItem>
                    <SelectItem value="CT">Connecticut</SelectItem>
                    <SelectItem value="DE">Delaware</SelectItem>
                    <SelectItem value="FL">Florida</SelectItem>
                    <SelectItem value="GA">Georgia</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bestTimeToCall">Best Time to Call</Label>
                <Select onValueChange={(value) => handleInputChange("bestTimeToCall", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                    <SelectItem value="anytime">Anytime</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToContact"
                checked={formData.agreeToContact}
                onCheckedChange={(checked) => handleInputChange("agreeToContact", checked)}
              />
              <Label htmlFor="agreeToContact" className="text-sm">
                I agree to be contacted by a licensed insurance agent regarding life insurance products. 
                I understand this is not a guarantee of coverage and rates may vary.
              </Label>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 pt-6 border-t">
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto px-8 py-4 text-lg font-semibold"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Me Now With My Quote
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Our licensed agent will contact you within minutes
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Or call directly:</p>
                <a 
                  href={`tel:${phoneNumber}`}
                  className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  {phoneNumber}
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          🔒 Your information is secure and confidential • A+ BBB Rating • Licensed in all 50 states
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>250K+ Families Protected</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>$2.8B Coverage Provided</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>15+ Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
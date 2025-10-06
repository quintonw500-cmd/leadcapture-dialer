import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Calculator, Phone } from "lucide-react";

const RateCalculator = () => {
  const [age, setAge] = useState<string>("");
  const [coverage, setCoverage] = useState<string>("");
  const [smoking, setSmoking] = useState<string>("");
  const [result, setResult] = useState<number | null>(null);

  const calculateRate = () => {
    if (!age || !coverage || !smoking) return;

    // Rate per $100K by age bracket
    const nonSmokerRates: { [key: string]: number } = {
      "18-30": 10,
      "31-40": 12,
      "41-50": 18,
      "51-60": 35,
      "61-70": 75,
    };

    // Get base rate for age bracket
    let baseRate = nonSmokerRates[age] || 10;

    // Apply smoking multiplier (50% increase for smokers)
    if (smoking === "yes") {
      baseRate = baseRate * 1.5;
    }

    // Calculate total monthly premium
    const coverageAmount = parseInt(coverage);
    const monthlyPremium = (coverageAmount / 100000) * baseRate;

    setResult(monthlyPremium);
  };

  const dailyCost = result ? (result / 30).toFixed(2) : "0";

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-2">
          <div className="rounded-full bg-primary/10 p-3">
            <Calculator className="w-8 h-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">While You Wait - See Your Estimated Rate</CardTitle>
        <p className="text-muted-foreground">Get an instant estimate based on your age and coverage needs</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="age">Your Age</Label>
            <Select value={age} onValueChange={setAge}>
              <SelectTrigger id="age">
                <SelectValue placeholder="Select your age range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="18-30">18-30</SelectItem>
                <SelectItem value="31-40">31-40</SelectItem>
                <SelectItem value="41-50">41-50</SelectItem>
                <SelectItem value="51-60">51-60</SelectItem>
                <SelectItem value="61-70">61-70</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverage">Coverage Amount</Label>
            <Select value={coverage} onValueChange={setCoverage}>
              <SelectTrigger id="coverage">
                <SelectValue placeholder="Select coverage amount" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50000">$50,000</SelectItem>
                <SelectItem value="100000">$100,000</SelectItem>
                <SelectItem value="250000">$250,000</SelectItem>
                <SelectItem value="500000">$500,000</SelectItem>
                <SelectItem value="1000000">$1,000,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="smoking">Do you smoke?</Label>
            <Select value={smoking} onValueChange={setSmoking}>
              <SelectTrigger id="smoking">
                <SelectValue placeholder="Select smoking status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="quit">I quit smoking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={calculateRate} 
            className="w-full"
            size="lg"
            disabled={!age || !coverage || !smoking}
          >
            Calculate My Rate
          </Button>
        </div>

        {result !== null && (
          <div className="bg-muted/50 p-6 rounded-lg space-y-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Estimated Monthly Premium</p>
              <p className="text-4xl font-bold text-primary">${result.toFixed(0)}</p>
              <p className="text-lg text-muted-foreground mt-2">That's just ${dailyCost}/day!</p>
            </div>

            <div className="pt-4 border-t">
              <a href="tel:8665957540">
                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Speak with Agent Now - (866) 595-7540
                </Button>
              </a>
            </div>

            <p className="text-xs text-muted-foreground italic pt-2">
              *Estimated rates for healthy individuals. Actual quotes may vary significantly based on health, lifestyle, and carrier. 
              This is for illustration only - not a quote.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RateCalculator;

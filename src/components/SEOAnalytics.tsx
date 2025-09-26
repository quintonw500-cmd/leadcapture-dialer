import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Search, TrendingUp, Phone, Clock, Globe } from 'lucide-react';

interface SEOMetrics {
  pageViews: number;
  phoneClicks: number;
  avgSessionDuration: string;
  bounceRate: string;
  topKeywords: string[];
  conversionRate: string;
}

const SEOAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<SEOMetrics>({
    pageViews: 0,
    phoneClicks: 0,
    avgSessionDuration: '0:00',
    bounceRate: '0%',
    topKeywords: [],
    conversionRate: '0%'
  });

  const [setupComplete, setSetupComplete] = useState(false);

  useEffect(() => {
    // Check if Google Analytics is loaded
    const checkGASetup = () => {
      return typeof window !== 'undefined' && window.gtag !== undefined;
    };

    setSetupComplete(checkGASetup());

    // Simulate fetching metrics (in real implementation, this would come from GA4 Reporting API)
    if (checkGASetup()) {
      setMetrics({
        pageViews: 1247,
        phoneClicks: 89,
        avgSessionDuration: '2:34',
        bounceRate: '45%',
        topKeywords: ['life insurance quotes', 'term life insurance', 'whole life insurance'],
        conversionRate: '7.1%'
      });
    }
  }, []);

  const setupInstructions = [
    {
      title: "Google Analytics 4 Setup",
      description: "Replace 'GA_MEASUREMENT_ID' with your actual GA4 Measurement ID",
      status: setupComplete ? "completed" : "pending"
    },
    {
      title: "Google Search Console",
      description: "Verify your domain at search.google.com/search-console",
      status: "pending"
    },
    {
      title: "Conversion Tracking",
      description: "Set up phone call and form submission goals in GA4",
      status: "pending"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">SEO & Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor your site's search performance and user engagement</p>
      </div>

      {/* Setup Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Analytics Setup Status</span>
          </CardTitle>
          <CardDescription>Complete these steps to start tracking your site's performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {setupInstructions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Phone Clicks</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.phoneClicks}</div>
            <p className="text-xs text-muted-foreground">Conversion actions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgSessionDuration}</div>
            <p className="text-xs text-muted-foreground">Time on site</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.conversionRate}</div>
            <p className="text-xs text-muted-foreground">Phone calls / visits</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5" />
            <span>Top Search Keywords</span>
          </CardTitle>
          <CardDescription>Keywords driving traffic to your site</CardDescription>
        </CardHeader>
        <CardContent>
          {metrics.topKeywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {metrics.topKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline">{keyword}</Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Connect Google Search Console to see keyword data</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Setup Actions</CardTitle>
          <CardDescription>Essential tools for tracking your site's performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://analytics.google.com/', '_blank')}
            >
              Open Google Analytics
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://search.google.com/search-console', '_blank')}
            >
              Open Search Console
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://pagespeed.web.dev/', '_blank')}
            >
              Test Page Speed
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
              <li>Create a Google Analytics 4 account and get your Measurement ID</li>
              <li>Replace 'GA_MEASUREMENT_ID' in the HTML with your actual ID</li>
              <li>Verify your domain in Google Search Console</li>
              <li>Set up conversion goals for phone calls and form submissions</li>
              <li>Configure enhanced ecommerce tracking if selling policies online</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOAnalytics;
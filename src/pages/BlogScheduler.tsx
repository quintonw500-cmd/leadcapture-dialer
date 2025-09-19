import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Play, Settings, Eye } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const BlogScheduler = () => {
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  const [nextBlogTitle, setNextBlogTitle] = useState<string>('');
  const [dayOfYear, setDayOfYear] = useState<number>(0);

  useEffect(() => {
    getNextBlogTitle();
  }, []);

  const getNextBlogTitle = () => {
    // Calculate today's blog title
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const currentDayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    setDayOfYear(currentDayOfYear);
    
    // Fallback titles based on the CSV pattern
    const fallbackTitles = [
      "What Is Life Insurance? Complete Beginner's Guide",
      "Term vs Whole Life Insurance: Which Policy Is Best for You?",
      "How Much Does Life Insurance Really Cost in 2025?",
      "Life Insurance for New Parents: Protecting Your Family",
      "Best Life Insurance Options for Seniors Over 60",
      "How to File a Life Insurance Claim Step-by-Step",
      "Using Life Insurance in Your Retirement Strategy",
      "Best Cheap Life Insurance Plans Compared",
      "The Future of Life Insurance: 2025 Market Outlook",
      "How to Choose the Right Life Insurance Policy in 2025"
    ];
    
    const titleIndex = (currentDayOfYear - 1) % fallbackTitles.length;
    setNextBlogTitle(fallbackTitles[titleIndex]);
  };

  const testScheduledFunction = async () => {
    setIsTesting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('scheduled-blog-post', {
        body: { test: true }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Success",
          description: `Test blog post generated: "${data.title}"`,
        });
      } else {
        throw new Error(data.error || 'Failed to generate test blog post');
      }
    } catch (error) {
      console.error('Error testing scheduled function:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to test scheduled function",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const uploadCSVToStorage = async () => {
    try {
      // Read the CSV file from public directory
      const response = await fetch('/life_insurance_blog_titles.csv');
      const csvBlob = await response.blob();
      
      const { data, error } = await supabase.storage
        .from('blog-titles')
        .upload('life_insurance_blog_titles.csv', csvBlob, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "CSV file uploaded to storage successfully",
      });
    } catch (error) {
      console.error('Error uploading CSV:', error);
      toast({
        title: "Error",
        description: "Failed to upload CSV file to storage",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Blog Scheduler
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Automated daily blog posting system. Generates and publishes life insurance blog posts every day at 9:00 AM.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Schedule Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Schedule Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Daily Blog Generation</span>
                  <Badge variant="default" className="bg-green-500">
                    <Play className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Schedule:</strong> Every day at 9:00 AM
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Day of Year:</strong> {dayOfYear}/365
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Next Blog Title:</strong> {nextBlogTitle}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Content Source:</strong> 365 pre-defined blog titles from CSV
                  </p>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={testScheduledFunction} 
                    disabled={isTesting}
                    className="w-full"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Test Generate Blog Now
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={uploadCSVToStorage} 
                    variant="outline"
                    className="w-full"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Upload CSV to Storage
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  System Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Blog Titles Available:</span>
                    <Badge variant="outline">365 Days</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Content Generation:</span>
                    <Badge variant="outline">AI-Powered</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Auto-Publishing:</span>
                    <Badge variant="default" className="bg-green-500">Enabled</Badge>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">Image Generation:</span>
                    <Badge variant="default" className="bg-blue-500">DALL-E 3</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Determines day of year (1-365)</li>
                    <li>Gets corresponding blog title from CSV</li>
                    <li>Researches topic using web search</li>
                    <li>Generates SEO-optimized article with AI</li>
                    <li>Creates relevant images with DALL-E</li>
                    <li>Publishes to blog automatically</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Blog Generation History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Check the <a href="/blog" className="text-primary hover:underline">Blog section</a> to see all published posts, 
                or visit the <a href="/blog-admin" className="text-primary hover:underline">Blog Admin</a> to manage posts.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogScheduler;
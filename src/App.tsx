import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BlogAdmin from "./pages/BlogAdmin";
import BlogScheduler from "./pages/BlogScheduler";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import SEOAnalytics from "./components/SEOAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/blog-admin" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <BlogAdmin />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/blog-scheduler" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <BlogScheduler />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/seo-analytics" 
              element={
                <ProtectedRoute requireAdmin={true}>
                  <SEOAnalytics />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </AnalyticsProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

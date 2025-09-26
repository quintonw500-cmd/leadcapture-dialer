import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

interface AnalyticsContextType {
  trackEvent: ReturnType<typeof useAnalytics>['trackEvent'];
  trackPageView: ReturnType<typeof useAnalytics>['trackPageView'];
  trackPhoneCall: ReturnType<typeof useAnalytics>['trackPhoneCall'];
  trackFormSubmission: ReturnType<typeof useAnalytics>['trackFormSubmission'];
  trackNavigation: ReturnType<typeof useAnalytics>['trackNavigation'];
  trackEngagement: ReturnType<typeof useAnalytics>['trackEngagement'];
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const location = useLocation();
  const analytics = useAnalytics();

  // Track page views automatically
  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case '/':
          return 'Home - Life Insurance Quotes';
        case '/blog':
          return 'Blog - Life Insurance Articles';
        case '/privacy-policy':
          return 'Privacy Policy';
        case '/terms-of-service':
          return 'Terms of Service';
        case '/auth':
          return 'Admin Login';
        case '/blog-admin':
          return 'Blog Admin';
        case '/blog-scheduler':
          return 'Blog Scheduler';
        default:
          return document.title;
      }
    };

    analytics.trackPageView(getPageTitle(), window.location.href);
  }, [location.pathname, analytics]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};

export default AnalyticsProvider;
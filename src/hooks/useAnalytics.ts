import { useCallback } from 'react';

// Analytics event types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Common event categories
export const ANALYTICS_CATEGORIES = {
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  NAVIGATION: 'navigation',
  FORM: 'form',
  PHONE: 'phone_call',
  PAGE_VIEW: 'page_view'
} as const;

// Common event actions
export const ANALYTICS_ACTIONS = {
  CLICK: 'click',
  CALL: 'phone_call',
  SUBMIT: 'submit',
  VIEW: 'view',
  SCROLL: 'scroll',
  DOWNLOAD: 'download'
} as const;

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  // Track custom events
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.custom_parameters
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
    }
  }, []);

  // Track page views
  const trackPageView = useCallback((page_title: string, page_location?: string) => {
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_title,
        page_location: page_location || window.location.href
      });
    }
  }, []);

  // Track phone call clicks
  const trackPhoneCall = useCallback((phoneNumber: string, location: string) => {
    trackEvent({
      action: ANALYTICS_ACTIONS.CALL,
      category: ANALYTICS_CATEGORIES.PHONE,
      label: `${phoneNumber} from ${location}`,
      custom_parameters: {
        phone_number: phoneNumber,
        call_location: location
      }
    });
  }, [trackEvent]);

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, success: boolean = true) => {
    trackEvent({
      action: ANALYTICS_ACTIONS.SUBMIT,
      category: ANALYTICS_CATEGORIES.FORM,
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: {
        form_name: formName,
        submission_success: success
      }
    });
  }, [trackEvent]);

  // Track navigation clicks
  const trackNavigation = useCallback((destination: string, source: string) => {
    trackEvent({
      action: ANALYTICS_ACTIONS.CLICK,
      category: ANALYTICS_CATEGORIES.NAVIGATION,
      label: `${source} to ${destination}`,
      custom_parameters: {
        link_destination: destination,
        link_source: source
      }
    });
  }, [trackEvent]);

  // Track content engagement
  const trackEngagement = useCallback((contentType: string, contentId: string, action: string) => {
    trackEvent({
      action,
      category: ANALYTICS_CATEGORIES.ENGAGEMENT,
      label: `${contentType}: ${contentId}`,
      custom_parameters: {
        content_type: contentType,
        content_id: contentId
      }
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackPageView,
    trackPhoneCall,
    trackFormSubmission,
    trackNavigation,
    trackEngagement
  };
};

export default useAnalytics;
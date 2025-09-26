import { useEffect } from 'react';
import { useAnalyticsContext } from '../components/AnalyticsProvider';

export const useScrollTracking = () => {
  const { trackEngagement } = useAnalyticsContext();

  useEffect(() => {
    let scrollDepth = 0;
    let maxScrollDepth = 0;
    
    const trackScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      scrollDepth = Math.round((scrollTop / documentHeight) * 100);
      
      // Track milestone scroll depths
      const milestones = [25, 50, 75, 90, 100];
      
      milestones.forEach(milestone => {
        if (scrollDepth >= milestone && maxScrollDepth < milestone) {
          maxScrollDepth = milestone;
          trackEngagement('scroll_depth', `${milestone}%`, 'scroll');
        }
      });
    };

    // Throttle scroll events
    let throttleTimer: NodeJS.Timeout | null = null;
    
    const throttledScrollHandler = () => {
      if (throttleTimer) return;
      
      throttleTimer = setTimeout(() => {
        trackScrollDepth();
        throttleTimer = null;
      }, 300);
    };

    window.addEventListener('scroll', throttledScrollHandler);

    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      if (throttleTimer) {
        clearTimeout(throttleTimer);
      }
    };
  }, [trackEngagement]);
};

export default useScrollTracking;
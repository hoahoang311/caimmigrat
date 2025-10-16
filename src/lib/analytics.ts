/**
 * Google Analytics 4 Web Vitals Tracking
 *
 * Sends Core Web Vitals metrics to Google Analytics 4
 */

export interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Send Web Vitals metric to Google Analytics 4
 * @param metric - The Web Vital metric to send
 */
export function sendToGoogleAnalytics(metric: Metric) {
  // Check if gtag is available
  if (typeof window === 'undefined' || !(window as any).gtag) {
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('[Web Vitals]', {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
      });
    }
    return;
  }

  // Send to Google Analytics 4
  (window as any).gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.value),
    metric_rating: metric.rating,
    metric_delta: Math.round(metric.delta),
    non_interaction: true, // Don't affect bounce rate
  });

  // Also log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals → GA4]', {
      name: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }
}

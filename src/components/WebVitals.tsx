'use client';

import { useEffect } from 'react';
import { sendToGoogleAnalytics } from '@/lib/analytics';

/**
 * WebVitals Component
 *
 * Tracks Core Web Vitals and sends them to Google Analytics 4
 * - LCP: Largest Contentful Paint
 * - INP: Interaction to Next Paint (replaces FID in web-vitals v3+)
 * - CLS: Cumulative Layout Shift
 * - FCP: First Contentful Paint
 * - TTFB: Time to First Byte
 */
export function WebVitals() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    // Dynamic import to reduce bundle size
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      // Track all Core Web Vitals
      onCLS(sendToGoogleAnalytics);
      onINP(sendToGoogleAnalytics); // INP replaces FID in web-vitals v3+
      onFCP(sendToGoogleAnalytics);
      onLCP(sendToGoogleAnalytics);
      onTTFB(sendToGoogleAnalytics);
    });
  }, []);

  // This component doesn't render anything
  return null;
}

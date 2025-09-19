// AnkiCoin Analytics & Tracking Setup
// Advanced analytics implementation for comprehensive website tracking

class AnkiCoinAnalytics {
  constructor() {
    this.events = [];
    this.sessionStart = Date.now();
    this.init();
  }

  init() {
    this.setupGoogleAnalytics();
    this.setupCustomTracking();
    this.setupPerformanceTracking();
    this.setupUserBehaviorTracking();
    this.setupConversionTracking();
  }

  // Google Analytics 4 Setup
  setupGoogleAnalytics() {
    // Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics 4 Measurement ID
    const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';
    
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_title: 'AnkiCoin - The Return of the Gods',
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'crypto_project',
        'custom_parameter_2': 'meme_coin'
      }
    });

    // Enhanced ecommerce tracking setup
    gtag('config', GA_MEASUREMENT_ID, {
      custom_map: {
        'token_interactions': 'custom_parameter_3',
        'whitepaper_downloads': 'custom_parameter_4'
      }
    });
  }

  // Custom Event Tracking
  trackEvent(eventName, parameters = {}) {
    // Google Analytics tracking
    if (window.gtag) {
      gtag('event', eventName, {
        event_category: parameters.category || 'engagement',
        event_label: parameters.label || '',
        value: parameters.value || 0,
        custom_parameter_1: 'ankicoin',
        ...parameters
      });
    }

    // Custom analytics storage
    this.events.push({
      event: eventName,
      timestamp: Date.now(),
      parameters: parameters,
      url: window.location.href,
      userAgent: navigator.userAgent
    });

    // Console logging for development
    if (this.isDevelopment()) {
      console.log('Analytics Event:', eventName, parameters);
    }
  }

  // Custom Tracking Setup
  setupCustomTracking() {
    // Set up custom tracking configurations
    this.customEvents = new Map();
    this.sessionId = this.generateSessionId();
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('page_visibility_change', {
        category: 'engagement',
        visibility_state: document.visibilityState,
        session_id: this.sessionId
      });
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent('page_unload', {
        category: 'engagement',
        session_duration: Date.now() - this.sessionStart,
        session_id: this.sessionId
      });
    });
  }

  // Generate unique session ID
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Performance Tracking
  setupPerformanceTracking() {
    // Page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          this.trackEvent('page_performance', {
            category: 'performance',
            load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
            dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
            first_paint: this.getFirstPaint(),
            page_type: 'landing'
          });
        }
      }, 1000);
    });

    // Core Web Vitals tracking
    this.trackCoreWebVitals();
  }

  // Core Web Vitals
  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackEvent('core_web_vital_lcp', {
        category: 'performance',
        value: Math.round(lastEntry.startTime),
        metric_type: 'LCP'
      });
    }).observe({entryTypes: ['largest-contentful-paint']});

    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        this.trackEvent('core_web_vital_fid', {
          category: 'performance',
          value: Math.round(entry.processingStart - entry.startTime),
          metric_type: 'FID'
        });
      });
    }).observe({entryTypes: ['first-input']});

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.trackEvent('core_web_vital_cls', {
        category: 'performance',
        value: Math.round(clsValue * 1000) / 1000,
        metric_type: 'CLS'
      });
    }).observe({entryTypes: ['layout-shift']});
  }

  // User Behavior Tracking
  setupUserBehaviorTracking() {
    // Scroll depth tracking
    this.trackScrollDepth();
    
    // Time on page tracking
    this.trackTimeOnPage();
    
    // Click tracking
    this.trackClicks();
    
    // Form interactions (if any)
    this.trackFormInteractions();
  }

  // Scroll Depth Tracking
  trackScrollDepth() {
    const scrollDepths = [25, 50, 75, 90, 100];
    const trackedDepths = new Set();

    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          this.trackEvent('scroll_depth', {
            category: 'engagement',
            label: `${depth}%`,
            value: depth
          });
        }
      });
    });
  }

  // Time on Page Tracking
  trackTimeOnPage() {
    const intervals = [30, 60, 120, 300, 600]; // seconds
    const trackedIntervals = new Set();

    setInterval(() => {
      const timeOnPage = Math.round((Date.now() - this.sessionStart) / 1000);
      
      intervals.forEach(interval => {
        if (timeOnPage >= interval && !trackedIntervals.has(interval)) {
          trackedIntervals.add(interval);
          this.trackEvent('time_on_page', {
            category: 'engagement',
            label: `${interval}s`,
            value: interval
          });
        }
      });
    }, 10000); // Check every 10 seconds
  }

  // Click Tracking
  trackClicks() {
    document.addEventListener('click', (event) => {
      const element = event.target;
      
      // Track button clicks
      if (element.classList.contains('btn')) {
        this.trackEvent('button_click', {
          category: 'interaction',
          label: element.textContent.trim(),
          button_type: element.classList.contains('btn-primary') ? 'primary' : 'secondary'
        });
      }

      // Track navigation clicks
      if (element.classList.contains('nav-link')) {
        this.trackEvent('navigation_click', {
          category: 'navigation',
          label: element.textContent.trim(),
          destination: element.getAttribute('href')
        });
      }

      // Track social link clicks
      if (element.closest('.social-link') || element.closest('.community-link')) {
        this.trackEvent('social_click', {
          category: 'social',
          label: element.textContent.trim() || 'Social Link',
          platform: this.getSocialPlatform(element.getAttribute('href'))
        });
      }

      // Track contract address clicks
      if (element.id === 'contract-address') {
        this.trackEvent('contract_address_click', {
          category: 'crypto_interaction',
          label: 'copy_contract_address'
        });
      }
    });
  }

  // Form Interaction Tracking
  trackFormInteractions() {
    // Track form submissions (if any forms are added)
    document.addEventListener('submit', (event) => {
      const form = event.target;
      this.trackEvent('form_submission', {
        category: 'conversion',
        label: form.id || form.className || 'unknown_form'
      });
    });

    // Track input focus (engagement with forms)
    document.addEventListener('focus', (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        this.trackEvent('form_field_focus', {
          category: 'engagement',
          label: event.target.name || event.target.id || 'unknown_field'
        });
      }
    }, true);
  }

  // Conversion Tracking
  setupConversionTracking() {
    // Track external link clicks as conversions
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && link.hostname !== window.location.hostname) {
        this.trackEvent('external_link_click', {
          category: 'conversion',
          label: link.href,
          destination: link.hostname
        });

        // Specific tracking for important conversions
        if (link.href.includes('uniswap')) {
          this.trackEvent('uniswap_click', {
            category: 'conversion',
            label: 'trade_button',
            value: 1
          });
        }

        if (link.href.includes('etherscan')) {
          this.trackEvent('etherscan_click', {
            category: 'conversion',
            label: 'contract_verification',
            value: 1
          });
        }

        if (link.href.includes('t.me')) {
          this.trackEvent('telegram_join', {
            category: 'conversion',
            label: 'community_join',
            value: 1
          });
        }
      }
    });
  }

  // Utility Functions
  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : 0;
  }

  getSocialPlatform(url) {
    if (!url) return 'unknown';
    if (url.includes('t.me')) return 'telegram';
    if (url.includes('twitter.com')) return 'twitter';
    if (url.includes('discord')) return 'discord';
    if (url.includes('reddit')) return 'reddit';
    return 'other';
  }

  isDevelopment() {
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.includes('dev');
  }

  // Export analytics data (for debugging or custom reporting)
  exportData() {
    return {
      events: this.events,
      sessionDuration: Date.now() - this.sessionStart,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };
  }

  // Privacy-compliant data collection
  respectPrivacy() {
    // Check for Do Not Track
    if (navigator.doNotTrack === '1') {
      console.log('Analytics: Respecting Do Not Track preference');
      return false;
    }

    // Check for consent (implement based on your privacy policy)
    const consent = localStorage.getItem('analytics_consent');
    if (consent === 'false') {
      console.log('Analytics: User has opted out');
      return false;
    }

    return true;
  }
}

// Initialize analytics when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.ankiCoinAnalytics) return; // Prevent double initialization
  
  window.ankiCoinAnalytics = new AnkiCoinAnalytics();
  
  // Track page view
  window.ankiCoinAnalytics.trackEvent('page_view', {
    category: 'engagement',
    page_title: document.title,
    page_location: window.location.href
  });
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnkiCoinAnalytics;
}

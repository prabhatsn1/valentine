// Minimal GA4 helper for client-side event tracking
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// Record a pageview (optional)
export const pageview = (url) => {
  if (!window.gtag) return;
  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

// Send an event to GA4
// action: event name, category/label/value are optional
export const event = ({ action, category, label, value }) => {
  if (!window.gtag) return;
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export default {
  GA_ID,
  pageview,
  event,
};

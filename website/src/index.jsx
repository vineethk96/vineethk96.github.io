import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Only initialise analytics if the user has already given consent.
// CookieConsent component calls posthog.init() on opt-in, or opt_out_capturing() on opt-out.
const hasConsent = localStorage.getItem('ph-dismissed') === 'true' &&
  localStorage.getItem('ph-opted-out') !== 'true';
if (hasConsent) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    autocapture: false,
    session_recording: false,
    capture_exceptions: true,
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);

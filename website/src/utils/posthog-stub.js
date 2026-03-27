// No-op PostHog stub used in development to avoid loading the 36MB posthog-js bundle.
// Aliased via craco.config.js when NODE_ENV !== 'production'.
import React from 'react';

const stub = {
  init: () => {},
  capture: () => {},
  captureException: () => {},
  opt_out_capturing: () => {},
  opt_in_capturing: () => {},
  has_opted_out_capturing: () => false,
};

export function PostHogProvider({ children }) {
  return React.createElement(React.Fragment, null, children);
}

export function usePostHog() {
  return stub;
}

export default stub;

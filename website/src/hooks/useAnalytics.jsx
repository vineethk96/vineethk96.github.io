import { usePostHog } from 'posthog-js/react';

export function useAnalytics() {
  const posthog = usePostHog();
  return {
    track: (event, props = {}) => posthog?.capture(event, props),
  };
}

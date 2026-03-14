import { useState, useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';

const STORAGE_KEY = 'ph-dismissed';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const posthog = usePostHog();

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  }

  function optOut() {
    if (posthog) posthog.opt_out_capturing();
    dismiss();
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300"
    >
      <p className="flex-1">
        This site uses analytics to improve the experience. No personal data is sold.{' '}
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={optOut}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          Opt out
        </button>
        <button
          onClick={dismiss}
          className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

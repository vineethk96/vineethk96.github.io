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
      className="fixed bottom-16 left-4 right-4 z-50 flex items-center justify-between gap-4 px-5 py-3 bg-background border-2 border-primary rounded-2xl text-sm text-primary"
      style={{ boxShadow: '4px 4px 0px 0px #031632' }}
    >
      <p className="flex-1 font-body text-xs text-primary/60">
        This site uses analytics to improve the experience. No personal data is sold.
      </p>
      <div className="flex gap-2 shrink-0">
        <button
          onClick={optOut}
          className="px-3 py-1.5 border-2 border-primary/30 rounded-xl font-mono text-xs uppercase tracking-wider hover:border-primary transition-colors duration-200"
        >
          Opt out
        </button>
        <button
          onClick={dismiss}
          className="px-3 py-1.5 border-2 border-primary bg-primary text-background rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-primary/80 transition-colors duration-200"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

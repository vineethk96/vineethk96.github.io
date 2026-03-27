import React from 'react';
import posthog from 'posthog-js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info.componentStack);
    posthog.captureException(error, { extra: { componentStack: info.componentStack } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="technic-module p-8 text-center max-w-md">
            <div className="font-mono text-xs uppercase tracking-widest text-primary/40 mb-2">
              System Error
            </div>
            <h1 className="font-heading font-bold text-primary text-2xl mb-4">
              Something went wrong
            </h1>
            <p className="font-body text-primary/60 mb-6">
              An unexpected error occurred. Please refresh the page to try again.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 border-2 border-primary bg-primary text-background rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-primary/80 transition-colors duration-200"
              style={{ boxShadow: '3px 3px 0px 0px #FFBF00' }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

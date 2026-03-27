import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  useEffect(() => {
    track('page_not_found', { path: location.pathname });
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="technic-module p-8 text-center max-w-sm">
        <div className="font-mono text-xs uppercase tracking-widest text-primary/30 mb-2">
          Error 404
        </div>
        <h1 className="font-heading font-bold text-primary text-5xl mb-3">404</h1>
        <p className="font-body text-primary/50 mb-8">
          Module not found
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 border-2 border-primary bg-primary text-background rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-primary/80 transition-colors duration-200"
          style={{ boxShadow: '3px 3px 0px 0px #FFBF00' }}
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

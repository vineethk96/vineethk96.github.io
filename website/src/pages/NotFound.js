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
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Page not found
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;

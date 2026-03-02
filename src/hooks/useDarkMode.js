import { useState, useEffect } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('darkMode') !== 'false'
  );

  // Apply the class on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      document.documentElement.classList.toggle('dark', next);
      return next;
    });
  };

  return [isDark, toggle];
}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { track } = useAnalytics();

  const handleMobileMenuToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    track('mobile_menu_toggled', { action: next ? 'open' : 'close' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-3 pb-1">
      <div className="max-w-7xl mx-auto">
        {/* Pill bar */}
        <div className="bg-white rounded-full border-[3px] border-lego-navy flex justify-between items-center px-5 py-2 shadow-chunky">
          <Link
            to="/"
            className="font-mono font-bold text-sm tracking-widest text-lego-navy uppercase hover:text-lego-navy/70 transition-colors"
          >
            VINEETH_KIRANDUMKARA
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-mono text-xs tracking-widest uppercase rounded-full px-3 py-1 transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-lego-yellow text-lego-navy font-bold'
                    : 'text-lego-navy/60 hover:text-lego-navy hover:bg-surface-container'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-full bg-surface-container hover:bg-lego-navy/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-lego-navy" />
            ) : (
              <Menu className="w-5 h-5 text-lego-navy" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mt-2 bg-white border-[3px] border-lego-navy rounded-2xl shadow-chunky overflow-hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-xl font-mono text-xs tracking-widest uppercase transition-colors ${
                      isActive(item.path)
                        ? 'bg-lego-yellow text-lego-navy font-bold'
                        : 'text-lego-navy/60 hover:text-lego-navy hover:bg-surface-container'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;

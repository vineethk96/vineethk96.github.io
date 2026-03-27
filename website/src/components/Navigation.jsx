import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { EXTERNAL_LINKS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const navItems = [
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation();
  const { track } = useAnalytics();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl"
      aria-label="Main navigation"
    >
      {/* Pill Container */}
      <div className="bg-background/90 backdrop-blur-md border-2 border-primary rounded-full px-4 py-2 flex items-center justify-between"
        style={{ boxShadow: '4px 4px 0px 0px #031632' }}
      >
        {/* Logo */}
        <Link
          to="/"
          className="font-heading font-bold text-primary text-sm tracking-tight whitespace-nowrap hover:text-accent transition-colors duration-200"
        >
          VK<span className="text-accent">.</span>
        </Link>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative"
              onClick={() => track('nav_clicked', { page: item.name })}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {isActive(item.path) && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-accent rounded-full ring-2 ring-primary"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              {hoveredItem === item.name && !isActive(item.path) && (
                <motion.div
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 bg-secondary rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <span
                className={`relative z-10 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-colors duration-200 block ${
                  isActive(item.path)
                    ? 'text-primary font-bold'
                    : 'text-primary-sub hover:text-primary'
                }`}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right CTA — Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {EXTERNAL_LINKS?.resume && (
            <a
              href={EXTERNAL_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('external_link_clicked', { type: 'resume', page: 'nav' })}
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider px-3 py-1.5 border-2 border-primary bg-background hover:bg-primary hover:text-background transition-colors duration-200 rounded-full"
            >
              <Download className="w-3 h-3" aria-hidden="true" />
              CV
            </a>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-full border-2 border-primary hover:bg-primary hover:text-background transition-colors duration-200"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="mt-2 bg-background border-2 border-primary rounded-2xl overflow-hidden"
          style={{ boxShadow: '4px 4px 0px 0px #031632' }}
        >
          <div className="p-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-accent text-primary font-bold ring-4 ring-primary'
                    : 'text-primary-sub hover:bg-faint hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {EXTERNAL_LINKS?.resume && (
              <a
                href={EXTERNAL_LINKS.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider border-2 border-primary text-primary hover:bg-primary hover:text-background transition-colors duration-200 mt-2"
              >
                <Download className="w-3 h-3" aria-hidden="true" />
                Download CV
              </a>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navigation;

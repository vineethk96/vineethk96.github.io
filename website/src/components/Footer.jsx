import React from 'react';
import { SOCIAL_LINKS, EXTERNAL_LINKS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const Footer = () => {
  const { track } = useAnalytics();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-background/95 backdrop-blur-md border-t-2 border-primary flex items-center px-4 sm:px-8">
      {/* Left — Branding */}
      <div className="flex-1 min-w-0">
        <span className="font-heading font-bold text-primary text-sm tracking-tight">
          VK<span className="text-accent">.</span>
        </span>
        <span className="hidden sm:inline font-mono text-xs text-primary-muted ml-2 uppercase tracking-wider">
          Vineeth Kirandumkara
        </span>
      </div>

      {/* Center — Links */}
      <div className="flex items-center gap-4 sm:gap-6">
        {SOCIAL_LINKS?.github?.url && (
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('external_link_clicked', { type: 'github', page: 'footer' })}
            className="font-mono text-xs uppercase tracking-widest text-primary-muted hover:text-primary transition-colors duration-200"
          >
            GitHub
          </a>
        )}
        {SOCIAL_LINKS?.linkedin?.url && (
          <a
            href={SOCIAL_LINKS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('external_link_clicked', { type: 'linkedin', page: 'footer' })}
            className="font-mono text-xs uppercase tracking-widest text-primary-muted hover:text-primary transition-colors duration-200"
          >
            LinkedIn
          </a>
        )}
        {EXTERNAL_LINKS?.resume && (
          <a
            href={EXTERNAL_LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('external_link_clicked', { type: 'resume', page: 'footer' })}
            className="font-mono text-xs uppercase tracking-widest text-primary-muted hover:text-primary transition-colors duration-200"
          >
            Resume
          </a>
        )}
      </div>

      {/* Right — System status */}
      <div className="flex-1 min-w-0 flex justify-end">
        <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-success/40 bg-success/10 rounded-full">
          <span className="led-indicator" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-success-text font-bold hidden sm:inline">
            System: Optimal
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-success-text font-bold sm:hidden">
            OK
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

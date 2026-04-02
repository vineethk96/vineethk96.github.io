import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, EXTERNAL_LINKS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const CALENDLY_URL = 'https://calendly.com/vineethkirandumkara/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=fbf9f4&text_color=031632&primary_color=ffbf00';

const Contact = () => {
  const { track } = useAnalytics();
  const widgetRef = useRef(null);

  useEffect(() => {
    const initWidget = () => {
      if (!widgetRef.current || !window.Calendly) return;
      widgetRef.current.innerHTML = '';
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: widgetRef.current,
      });
    };

    const existingScript = document.getElementById('calendly-script');
    if (existingScript) {
      if (window.Calendly) {
        initWidget();
      } else {
        existingScript.addEventListener('load', initWidget);
      }
    } else {
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    }

    return () => {
      if (widgetRef.current) widgetRef.current.innerHTML = '';
    };
  }, []);

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <motion.header variants={fadeUp} custom={0} className="mb-8 border-l-8 border-accent pl-6">
          <p className="font-mono text-xs font-bold text-accent tracking-widest mb-2 uppercase">
            System_Documentation // Vol_01
          </p>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-7xl text-primary tracking-tighter uppercase leading-none">
            Contact:<br />
            <span
              className="italic text-accent"
              style={{ textShadow: '4px 4px 0px rgba(50, 50, 50, 0.7)' }}
            >
              Uplink_Protocol
            </span>
          </h1>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left — Contact Info */}
          <div className="space-y-4">
            <motion.div variants={fadeUp} custom={1}>
              <div className="section-label mb-3">Access Points</div>
              <div className="space-y-3">
                {(CONTACT_INFO || []).map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} className="technic-module p-4 flex items-center gap-4">
                      <div className="p-2 border-2 border-primary/20 bg-faint rounded-lg flex-shrink-0">
                        {Icon && <Icon className="w-4 h-4 text-primary-sub" aria-hidden="true" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="section-label">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 font-body text-sm text-primary hover:text-accent transition-colors duration-200 truncate"
                          >
                            <span className="truncate">{info.value}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                          </a>
                        ) : (
                          <span className="font-body text-sm text-primary-sub">{info.value}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="section-label mb-3">Quick Actions</div>
              <div className="grid grid-cols-2 gap-3">
                {EXTERNAL_LINKS?.calendly && (
                  <a
                    href={EXTERNAL_LINKS.calendly}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('external_link_clicked', { type: 'calendly' })}
                    className="flex items-center gap-2 px-4 py-3 border-2 border-primary bg-background rounded-xl hover:bg-primary hover:text-background font-mono text-xs uppercase tracking-wider transition-all duration-200"
                    style={{ boxShadow: '3px 3px 0px 0px #031632' }}
                  >
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    Schedule Call
                  </a>
                )}
                {EXTERNAL_LINKS?.resume && (
                  <a
                    href={EXTERNAL_LINKS.resume}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('external_link_clicked', { type: 'resume' })}
                    className="flex items-center gap-2 px-4 py-3 border-2 border-accent bg-accent text-primary rounded-xl hover:bg-accent/80 font-mono text-xs uppercase tracking-wider transition-all duration-200"
                    style={{ boxShadow: '3px 3px 0px 0px #031632' }}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Download CV
                  </a>
                )}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={fadeUp} custom={3} className="technic-module p-4 border-success bg-success/5">
              <div className="flex items-start gap-3">
                <span className="led-indicator mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-success-text font-bold mb-1">
                    Currently Available
                  </div>
                  <p className="font-body text-sm text-primary-sub leading-relaxed">
                    Open to IoT architecture roles, product design positions, and consulting.
                    Expected graduation: 2025.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Calendly Embed */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="section-label mb-3">Schedule a Meeting</div>
            <div className="technic-module overflow-hidden">
              <div
                ref={widgetRef}
                style={{ minWidth: '320px', height: '700px' }}
              />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;

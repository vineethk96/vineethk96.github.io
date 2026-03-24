import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Calendar, ExternalLink, MessageSquare } from 'lucide-react';
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

const Contact = () => {
  const { track } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    track('contact_form_submitted', { subject: formData.subject });
    console.log('Form submitted:', formData);
  };

  const inputClass =
    'w-full px-4 py-3 border-2 border-primary/20 bg-background text-primary font-body text-sm rounded-xl focus:border-primary focus:outline-none transition-colors duration-200 placeholder:text-primary/30';

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <div className="section-label">Communication Channel</div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary">
            Contact
          </h1>
        </motion.div>

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
                        {Icon && <Icon className="w-4 h-4 text-primary/60" aria-hidden="true" />}
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
                          <span className="font-body text-sm text-primary/70">{info.value}</span>
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
                  <div className="font-mono text-xs uppercase tracking-wider text-success font-bold mb-1">
                    Currently Available
                  </div>
                  <p className="font-body text-sm text-primary/60 leading-relaxed">
                    Open to IoT architecture roles, product design positions, and consulting.
                    Expected graduation: 2025.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Contact Form */}
          <motion.div variants={fadeUp} custom={2}>
            <div className="section-label mb-3">Send Message</div>
            <form onSubmit={handleSubmit} className="technic-module p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="section-label block mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="section-label block mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@email.com"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="section-label block mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What would you like to discuss?"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message" className="section-label block mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project or opportunity…"
                  className={`${inputClass} resize-vertical`}
                />
              </div>
              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary bg-primary text-background rounded-xl font-mono text-xs uppercase tracking-wider hover:bg-primary/80 transition-colors duration-200"
                style={{ boxShadow: '4px 4px 0px 0px #FFBF00' }}
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                Send Message
              </motion.button>
            </form>

            {/* Response time */}
            <div className="mt-4 flex items-start gap-3 px-1">
              <MessageSquare className="w-4 h-4 text-primary/30 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="font-body text-xs text-primary/40 leading-relaxed">
                I typically respond within 24 hours. For urgent matters, reach out via LinkedIn.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;

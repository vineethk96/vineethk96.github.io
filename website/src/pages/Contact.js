import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, Calendar, ExternalLink } from 'lucide-react';
import { CONTACT_INFO, EXTERNAL_LINKS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const Contact = () => {
  const { track } = useAnalytics();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    track('contact_form_submitted', { subject: formData.subject });
    console.log('Form submitted:', formData);
  };

  const contactInfo = CONTACT_INFO;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Ready to discuss IoT systems, connected product design, or potential collaborations? 
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            
            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gray-100 dark:bg-gray-700 ${info.color}`}>
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{info.label}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300 flex items-center space-x-2"
                        >
                          <span>{info.value}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="text-gray-600 dark:text-gray-300">{info.value}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href={EXTERNAL_LINKS.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('external_link_clicked', { type: 'calendly' })}
                  className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-300"
                >
                  <Calendar className="w-5 h-5" />
                  <span className="font-medium">Schedule a Call</span>
                </a>
                <a
                  href={EXTERNAL_LINKS.resume}
                  download="Vineeth_Kirandumkara_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('external_link_clicked', { type: 'resume' })}
                  className="flex items-center space-x-3 p-4 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 transition-colors duration-300"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium">Download Resume</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="mt-8">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6">
                <h3 className="font-semibold mb-2 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Currently Available</span>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Open to IoT architecture roles, product design positions, and consulting opportunities. 
                  Expected graduation: Summer 2025.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-300"
                  placeholder="What would you like to discuss?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-colors duration-300 resize-vertical"
                  placeholder="Tell me about your project, opportunity, or just say hello..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </motion.button>
            </form>

            {/* Response Time */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                    Quick Response
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    I typically respond to messages within 24 hours. For urgent matters, 
                    feel free to reach out via LinkedIn.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Whether you're looking for an IoT systems engineer, need help with connected product architecture, 
              or want to discuss the future of urban technology, I'm excited to explore how we can work together 
              to create meaningful, scalable solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;

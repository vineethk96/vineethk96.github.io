import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Cloud, Smartphone, Users, Zap, Download } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/constants';
import AnimatedSystemFlow from '../components/AnimatedSystemFlow';
import TimelineSnapshot from '../components/TimelineSnapshot';
import FeaturedProjects from '../components/FeaturedProjects';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
      className="pt-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              I design and develop{' '}
              <span className="gradient-text">connected systems</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From embedded devices to IoT architectures ready for mass market
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <AnimatedSystemFlow />
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/projects"
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>View My Work</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:-translate-y-1"
            >
              <Download className="w-5 h-5" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Timeline Snapshot */}
      <motion.section variants={itemVariants} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            My Journey
          </h2>
          <TimelineSnapshot />
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section variants={itemVariants} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Featured Projects
          </h2>
          <FeaturedProjects />
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section variants={itemVariants} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Let's build the next generation of{' '}
            <span className="gradient-text">connected products</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Ready to create IoT solutions that scale from prototype to mass market
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Contact Me
            </Link>
            <a
              href={SOCIAL_LINKS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-accent-600 text-accent-600 hover:bg-accent-600 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              LinkedIn
            </a>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border-2 border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-600 hover:text-white rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              GitHub
            </a>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Home;

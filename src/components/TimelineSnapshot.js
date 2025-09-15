import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../data/constants';

const TimelineSnapshot = () => {
  const timelineData = TIMELINE_DATA;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 transform md:-translate-x-1/2"></div>
      
      <motion.div
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary-500 transform md:-translate-x-1/2 z-10"></div>
            
            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
            }`}>
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${item.color} text-white flex-shrink-0`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TimelineSnapshot;

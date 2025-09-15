import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, Network } from 'lucide-react';
import SystemMap from '../components/SystemMapD3';
import ProjectGrid from '../components/ProjectGrid';
import ProjectDetail from './ProjectDetail';

const Projects = () => {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'grid'
  const [selectedProject, setSelectedProject] = useState(null);

  // If a project is selected, show the detail view
  if (selectedProject) {
    return (
      <ProjectDetail 
        projectId={selectedProject} 
        onBack={() => setSelectedProject(null)} 
      />
    );
  }

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore my work through an interactive system map or traditional grid view. 
            Each project represents a step in my journey from embedded systems to IoT architecture.
          </p>
        </motion.div>

        {/* View Toggle */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'map'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Network className="w-4 h-4" />
              <span className="font-medium">System Map</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span className="font-medium">Grid View</span>
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div variants={itemVariants}>
          <AnimatePresence mode="wait">
            {viewMode === 'map' ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <SystemMap onProjectSelect={setSelectedProject} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectGrid />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Systems Thinking in Action
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Each project demonstrates different aspects of connected systems design - from low-level 
              embedded programming to cloud architectures and user interfaces. The system map view shows 
              how these projects interconnect and build upon each other, reflecting my evolution from 
              component-level thinking to system-level architecture.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Projects;

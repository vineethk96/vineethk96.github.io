import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/constants';

const ProjectGrid = () => {
  // Map projects and extract featured image data
  const projects = PROJECTS.map(project => ({
    ...project,
    featuredImage: project.images && project.images.length > 0
      ? project.images[0].medium_url
      : null,
    imageAlt: project.images && project.images.length > 0
      ? project.images[0].alt
      : `${project.title} thumbnail`
  }));

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/90 text-white dark:bg-green-600/90';
      case 'In Progress':
        return 'bg-yellow-500/90 text-gray-900 dark:bg-yellow-600/90 dark:text-white';
      case 'Planning':
        return 'bg-blue-500/90 text-white dark:bg-blue-600/90';
      default:
        return 'bg-gray-500/90 text-white dark:bg-gray-600/90';
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group"
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
            {/* Image or Gradient header */}
            <div className="relative h-48 lg:h-56 overflow-hidden">
              {project.featuredImage ? (
                // Image version
                <>
                  <img
                    src={project.featuredImage}
                    alt={project.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to gradient on image load error
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  {/* Fallback gradient (hidden unless image fails) */}
                  <div
                    className={`hidden absolute inset-0 bg-gradient-to-br ${project.color}`}
                  />
                  {/* Dark overlay for images */}
                  <div className="absolute inset-0 bg-black/30"></div>
                </>
              ) : (
                // Gradient fallback (no images available)
                <>
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
                  <div className="absolute inset-0 bg-black/10"></div>
                  {/* Shimmer animation only on gradients */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: [-100, 300],
                      opacity: [0, 0.5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  />
                </>
              )}

              {/* Icon - same for both versions */}
              <div className="absolute top-4 left-4 z-10">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <project.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Status badge - positioned over images with z-10 */}
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              {/* Year label - positioned over images with z-10 */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg">
                  <span className="text-white/90 text-sm font-medium">{project.year}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1 text-sm leading-relaxed">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                      title="View Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-300 text-sm"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;

import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { PROJECTS } from '../data/constants';
import ImageCarousel from '../components/ImageCarousel';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import DOMPurify from 'dompurify';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === projectId);

  const createMarkup = (html) => {
      return { 
      __html: DOMPurify.sanitize(html, {
        FORBID_ATTR: ['style', 'class'], // Remove inline styles and classes
        FORBID_TAGS: ['style', 'link']    // Remove style tags
      })
    };
  };

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <button
            onClick={() => navigate('/projects')}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      {/* Back Button */}
      <motion.button
        variants={itemVariants}
        onClick={() => navigate('/projects')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Projects
      </motion.button>

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          {project.icon && <project.icon size={32} className="text-blue-600 dark:text-blue-400" />}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {project.title}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {project.year}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            {project.status}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <motion.div variants={itemVariants}>
            <ImageCarousel 
              images={project.images || [
                {
                  url: '/api/placeholder/800/400',
                  alt: `${project.title} - Main Image`,
                  caption: 'Project overview'
                }
              ]} 
              title={project.title} 
            />
          </motion.div>

          {/* Project Description */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          {/* Detailed Content */}
          <motion.div variants={itemVariants}>
            <div className="prose dark:prose-invert max-w-none">
              {project.detailed_description ? (
                <div className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={createMarkup(project.detailed_description)} />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    This project demonstrates {project.tags?.slice(0, 3).join(', ')} technologies 
                    in a real-world application. The implementation showcases modern development 
                    practices and innovative solutions to complex problems.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Key Features
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Modern architecture and design patterns</li>
                    <li>Responsive and accessible user interface</li>
                    <li>Optimized performance and scalability</li>
                    <li>Comprehensive testing and documentation</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Technical Implementation
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The project leverages {project.technologies?.join(', ')} to create a 
                    robust and maintainable solution. Special attention was paid to code 
                    quality, performance optimization, and user experience.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Challenges & Solutions
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    During development, several technical challenges were encountered and 
                    successfully resolved through innovative approaches and careful planning. 
                    The final solution demonstrates both technical expertise and practical 
                    problem-solving skills.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Links */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Project Links
            </h3>
            <div className="space-y-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <Github size={20} />
                  View Source Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || project.tags || []).map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Project Info */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Project Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">
                  {project.category || project.type || 'Project'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Status:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {project.status}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Year:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {project.year}
                </span>
              </div>
              {project.size && (
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Complexity:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {project.size}/10
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;

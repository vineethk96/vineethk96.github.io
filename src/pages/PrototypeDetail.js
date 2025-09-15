import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Wrench, TestTube } from 'lucide-react';
import { PROTOTYPES } from '../data/constants';
import ImageCarousel from '../components/ImageCarousel';

const PrototypeDetail = ({ prototypeId, onBack }) => {
  const prototype = PROTOTYPES.find(p => p.id === prototypeId);

  if (!prototype) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Prototype Not Found
          </h1>
          <button
            onClick={onBack}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Lab
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
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Lab
      </motion.button>

      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Wrench size={32} className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white font-mono">
            {prototype.title}
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {prototype.date}
          </div>
          <div className="flex items-center gap-1">
            <Tag size={16} />
            {prototype.category}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Carousel */}
          <motion.div variants={itemVariants}>
            <ImageCarousel 
              images={prototype.images || [
                {
                  url: '/api/placeholder/800/400',
                  alt: `${prototype.title} - Lab Photo`,
                  caption: 'Prototype documentation'
                }
              ]} 
              title={prototype.title} 
            />
          </motion.div>

          {/* Prototype Description */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Prototype Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {prototype.description}
            </p>
          </motion.div>

          {/* Lab Notes */}
          <motion.div variants={itemVariants}>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border-l-4 border-yellow-400">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Wrench size={20} />
                Lab Notes
              </h3>
              <p className="text-gray-700 dark:text-gray-300 italic">
                {prototype.notes}
              </p>
            </div>
          </motion.div>

          {/* Detailed Testing & Results */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Testing & Development
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              {prototype.detailedDescription ? (
                <div dangerouslySetInnerHTML={{ __html: prototype.detailedDescription }} />
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    This prototype explored {prototype.tags?.slice(0, 3).join(', ')} technologies 
                    through hands-on experimentation and iterative testing.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Testing Methodology
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Rapid prototyping with immediate feedback loops</li>
                    <li>Systematic testing of key parameters and configurations</li>
                    <li>Documentation of failures and unexpected behaviors</li>
                    <li>Iterative refinement based on test results</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Key Learnings
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The prototyping process revealed important insights about {prototype.category} 
                    development, particularly around user interaction patterns and technical constraints.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Test Results */}
          {prototype.testResults && (
            <motion.div variants={itemVariants}>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border-l-4 border-green-400">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <TestTube size={20} />
                  Test Results
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {prototype.testResults}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Materials Used */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Materials & Components
            </h3>
            <div className="space-y-2">
              {prototype.materials?.map((material, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  {material}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tags */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Technologies & Methods
            </h3>
            <div className="flex flex-wrap gap-2">
              {prototype.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Prototype Info */}
          <motion.div 
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Prototype Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Category:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">
                  {prototype.category}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Date:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {prototype.date}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Type:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Lab Prototype
                </span>
              </div>
            </div>
          </motion.div>

          {/* Related Projects */}
          <motion.div 
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              💡 From Lab to Product
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This prototype contributed to the development of larger projects through 
              iterative learning and technical validation.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrototypeDetail;

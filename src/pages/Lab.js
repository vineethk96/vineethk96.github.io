import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Camera, Code, Zap, Wrench, Lightbulb, Filter, ArrowRight } from 'lucide-react';
import { PROTOTYPES } from '../data/constants';

const Lab = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Prototypes', icon: BookOpen },
    { id: 'hardware', name: 'Hardware', icon: Zap },
    { id: 'software', name: 'Software', icon: Code },
    { id: 'design', name: 'Design', icon: Lightbulb }
  ];

  const filteredPrototypes = selectedCategory === 'all' 
    ? PROTOTYPES 
    : PROTOTYPES.filter(p => p.category === selectedCategory);

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

  return (
    <motion.div
      className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Lab <span className="gradient-text">Notebook</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of prototypes, experiments, and iterative builds. Each entry represents 
            hands-on exploration of concepts that evolved into larger projects.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Prototypes Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          key={selectedCategory}
        >
          {filteredPrototypes.map((prototype) => (
            <motion.div
              key={prototype.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link to={`/lab/${prototype.id}`} className="block">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 relative">
                {/* Notebook paper effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-50/50 to-orange-50/50 dark:from-yellow-900/10 dark:to-orange-900/10 pointer-events-none"></div>
                <div className="absolute top-0 left-8 w-0.5 h-full bg-red-200 dark:bg-red-800/50 pointer-events-none"></div>
                
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-xs font-medium rounded-full">
                      {prototype.date}
                    </span>
                  </div>
                  {/* Sketch lines effect */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`sketch-${prototype.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M0,10 Q10,5 20,10" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#sketch-${prototype.id})`} />
                  </svg>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <h3 className="text-xl font-bold mb-3 font-mono">
                    {prototype.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {prototype.description}
                  </p>
                  
                  {/* Notes section */}
                  <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold text-sm mb-1 flex items-center space-x-2">
                      <Wrench className="w-3 h-3" />
                      <span>Lab Notes</span>
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                      {prototype.notes}
                    </p>
                  </div>

                  {/* Materials */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2 text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Materials
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {prototype.materials.map((material) => (
                        <span
                          key={material}
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded font-mono"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prototype.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Click to view details
                    </span>
                    <div className="flex items-center gap-1 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                      <span className="text-sm font-medium">View Lab Notes</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Notebook spiral binding effect */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-700 dark:to-transparent pointer-events-none">
                  <div className="flex flex-col justify-evenly h-full px-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    ))}
                  </div>
                </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Lab Philosophy */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Prototype-First Philosophy
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Every successful project starts with experimentation. This lab notebook captures the iterative 
              process of building, testing, and refining ideas. From breadboard circuits to software algorithms, 
              each prototype teaches valuable lessons that inform the final product design.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Lab;

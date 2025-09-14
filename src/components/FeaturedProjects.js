import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Wind, Hand, Thermometer, MapPin, Lightbulb, BookOpen } from 'lucide-react';

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'Smart Ultrasonic Anemometer',
      description: 'IoT wind measurement system with real-time data processing and cloud analytics for urban sensing applications.',
      icon: Wind,
      tags: ['IoT', 'Sensors', 'Cloud', 'Analytics'],
      color: 'from-blue-500 to-cyan-500',
      link: '/projects/anemometer'
    },
    {
      title: 'Gesture Recognizer',
      description: 'ML-powered gesture recognition using flex sensors and embedded processing for intuitive human-computer interaction.',
      icon: Hand,
      tags: ['ML', 'Sensors', 'Embedded', 'HCI'],
      color: 'from-purple-500 to-pink-500',
      link: '/projects/gesture-recognizer'
    },
    {
      title: 'Hot Stone IoT Device',
      description: 'Tactile warmth-sharing device connecting people through temperature, exploring emotional IoT interactions.',
      icon: Thermometer,
      tags: ['IoT', 'Design', 'Emotional Tech', 'Prototyping'],
      color: 'from-orange-500 to-red-500',
      link: '/projects/hot-stone'
    },
    {
      title: 'Traveler App',
      description: 'Flutter-based travel companion with Supabase backend and Google Maps integration for seamless journey planning.',
      icon: MapPin,
      tags: ['Flutter', 'Supabase', 'Maps API', 'Mobile'],
      color: 'from-green-500 to-emerald-500',
      link: '/projects/traveler'
    },
    {
      title: 'Lumos Lighting System',
      description: 'MQTT-controlled smart lighting with rotary interfaces and magnetometer sensing for intuitive control.',
      icon: Lightbulb,
      tags: ['MQTT', 'Smart Home', 'Sensors', 'UI'],
      color: 'from-yellow-500 to-orange-500',
      link: '/projects/lumos'
    },
    {
      title: 'Turbulent Spaces Dissertation',
      description: 'Research on IoT systems for urban environments, exploring scalable architectures for smart city applications.',
      icon: BookOpen,
      tags: ['Research', 'Urban IoT', 'Architecture', 'Scalability'],
      color: 'from-indigo-500 to-purple-500',
      link: '/projects/dissertation'
    }
  ];

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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="group"
        >
          <div className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            {/* Gradient header */}
            <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 left-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <project.icon className="w-8 h-8 text-white" />
                </div>
              </div>
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
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action */}
              <Link
                to={project.link}
                className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-300"
              >
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FeaturedProjects;

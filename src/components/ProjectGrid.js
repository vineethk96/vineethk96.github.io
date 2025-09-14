import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, ArrowRight, Wind, Hand, Thermometer, MapPin, Lightbulb, BookOpen, Bot, Smartphone } from 'lucide-react';

const ProjectGrid = () => {
  const projects = [
    {
      id: 'anemometer',
      title: 'Smart Ultrasonic Anemometer',
      description: 'IoT wind measurement system with real-time data processing and cloud analytics for urban sensing applications. Features custom PCB design and wireless connectivity.',
      icon: Wind,
      tags: ['IoT', 'Sensors', 'Cloud', 'Analytics', 'PCB Design'],
      color: 'from-blue-500 to-cyan-500',
      status: 'Completed',
      year: '2024',
      github: 'https://github.com/vineethk96/anemometer',
      demo: null
    },
    {
      id: 'gesture-recognizer',
      title: 'Gesture Recognizer',
      description: 'ML-powered gesture recognition using flex sensors and embedded processing for intuitive human-computer interaction. Real-time classification with 95% accuracy.',
      icon: Hand,
      tags: ['ML', 'Sensors', 'Embedded', 'HCI', 'Arduino'],
      color: 'from-purple-500 to-pink-500',
      status: 'Completed',
      year: '2024',
      github: 'https://github.com/vineethk96/gesture-recognizer',
      demo: null
    },
    {
      id: 'hot-stone',
      title: 'Hot Stone IoT Device',
      description: 'Tactile warmth-sharing device connecting people through temperature, exploring emotional IoT interactions and long-distance relationships.',
      icon: Thermometer,
      tags: ['IoT', 'Design', 'Emotional Tech', 'Prototyping', 'ESP32'],
      color: 'from-orange-500 to-red-500',
      status: 'Completed',
      year: '2024',
      github: 'https://github.com/vineethk96/hot-stone',
      demo: null
    },
    {
      id: 'traveler',
      title: 'Traveler App',
      description: 'Flutter-based travel companion with Supabase backend and Google Maps integration for seamless journey planning and expense tracking.',
      icon: MapPin,
      tags: ['Flutter', 'Supabase', 'Maps API', 'Mobile', 'Full-Stack'],
      color: 'from-green-500 to-emerald-500',
      status: 'Completed',
      year: '2024',
      github: 'https://github.com/vineethk96/traveler-app',
      demo: 'https://traveler-demo.netlify.app'
    },
    {
      id: 'lumos',
      title: 'Lumos Lighting System',
      description: 'MQTT-controlled smart lighting with rotary interfaces and magnetometer sensing for intuitive control. Features custom hardware and mobile app.',
      icon: Lightbulb,
      tags: ['MQTT', 'Smart Home', 'Sensors', 'UI', 'ESP32'],
      color: 'from-yellow-500 to-orange-500',
      status: 'Completed',
      year: '2024',
      github: 'https://github.com/vineethk96/lumos-lighting',
      demo: null
    },
    {
      id: 'dissertation',
      title: 'Turbulent Spaces Dissertation',
      description: 'Research on IoT systems for urban environments, exploring scalable architectures for smart city applications and citizen engagement.',
      icon: BookOpen,
      tags: ['Research', 'Urban IoT', 'Architecture', 'Scalability', 'Smart Cities'],
      color: 'from-indigo-500 to-purple-500',
      status: 'In Progress',
      year: '2024-2025',
      github: null,
      demo: null
    },
    {
      id: 'ieee-robot',
      title: 'IEEE Autonomous Robot',
      description: 'Autonomous robot designed for IEEE Southeastcon competition. Features computer vision, path planning, and embedded control systems.',
      icon: Bot,
      tags: ['Robotics', 'Computer Vision', 'Embedded', 'C++', 'Competition'],
      color: 'from-red-500 to-pink-500',
      status: 'Completed',
      year: '2017-2018',
      github: 'https://github.com/vineethk96/ieee-robot',
      demo: null
    },
    {
      id: 'vehicle-app',
      title: 'Vehicle Browser App',
      description: 'iOS application with AWS backend for vehicle browsing and management. Features secure authentication and real-time data synchronization.',
      icon: Smartphone,
      tags: ['iOS', 'AWS', 'Swift', 'REST API', 'Mobile'],
      color: 'from-cyan-500 to-blue-500',
      status: 'Completed',
      year: '2018',
      github: null,
      demo: null
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Planning':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
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
            {/* Gradient header */}
            <div className={`h-32 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute top-4 left-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <project.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-white/80 text-sm font-medium">{project.year}</span>
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

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink, Award, Users, Code, Zap } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      company: 'Grenova',
      position: 'Embedded Software Engineer',
      period: 'Nov 2023 – Aug 2024',
      location: 'Remote',
      type: 'Full-time',
      description: 'Led firmware development for TipNovus 2.0, a laboratory pipette tip washing system.',
      achievements: [
        'Co-developed firmware for TipNovus 2.0 laboratory equipment',
        'Built dependency-managed CMake architecture spanning 30+ repositories',
        'Developed drivers for temperature/humidity sensors, SD/MMC, and EEPROM',
        'Implemented memory pool management and secure JSON storage systems',
        'Authored comprehensive system diagnostics and command protocols'
      ],
      technologies: ['C/C++', 'CMake', 'FreeRTOS', 'ESP32', 'JSON', 'Embedded Systems'],
      color: 'bg-green-500'
    },
    {
      company: 'Iontra Inc.',
      position: 'Embedded Software Engineer',
      period: 'Nov 2022 – Nov 2023',
      location: 'Remote',
      type: 'Full-time',
      description: 'Developed firmware for battery safety systems and automated testing infrastructure.',
      achievements: [
        'Automated firmware verification process for 2000+ circuit boards',
        'Developed firmware for pouch cell safety metrics monitoring',
        'Modularized RTOS architecture for cross-platform OS support',
        'Onboarded new engineering hires and led architecture reviews',
        'Contributed to pull request reviews and code quality standards'
      ],
      technologies: ['C/C++', 'RTOS', 'Battery Management', 'Automated Testing', 'Firmware'],
      color: 'bg-blue-500'
    },
    {
      company: 'Platform Aerospace',
      position: 'Embedded Systems Engineer',
      period: 'Feb 2021 – Sept 2023',
      location: 'Remote',
      type: 'Full-time',
      description: 'Architected UAV control systems and embedded web servers for drone orchestration.',
      achievements: [
        'Rewrote UAV controller codebase achieving 50% memory reduction and 40% performance improvement',
        'Built embedded web server for UAS orchestration on Teensy 4.1 platform',
        'Led Hardware-in-the-Loop (HiL) simulation development for UAV testing',
        'Established communication protocol documentation and code review processes',
        'Implemented agile development workflows for embedded systems team'
      ],
      technologies: ['C/C++', 'Teensy', 'Web Servers', 'UAV Systems', 'HiL Testing', 'Agile'],
      color: 'bg-purple-500'
    },
    {
      company: 'Daimler Trucks North America',
      position: 'Engineer I',
      period: 'Jul 2019 – Feb 2021',
      location: 'Portland, OR',
      type: 'Full-time',
      description: 'Developed automation tools and led process improvement initiatives.',
      achievements: [
        'Built Python + Alteryx automation tool for cross-team validation workflows',
        'Proposed and led organizational transition from Waterfall to Agile methodology',
        'Developed Skill Matrix framework for training and competency mapping',
        'Streamlined validation processes reducing manual work by 60%',
        'Facilitated cross-functional team collaboration and knowledge sharing'
      ],
      technologies: ['Python', 'Alteryx', 'Process Automation', 'Agile', 'Data Analysis'],
      color: 'bg-red-500'
    },
    {
      company: 'CapTech Consulting',
      position: 'Software Engineering Intern',
      period: 'May – Aug 2018',
      location: 'Richmond, VA',
      type: 'Internship',
      description: 'Developed iOS application with AWS backend for vehicle management system.',
      achievements: [
        'Built iOS application with AWS backend for vehicle browsing and management',
        'Implemented secure base-32 authentication system for employee access',
        'Coordinated REST API refactor with backend development team',
        'Delivered critical bug fixes within 24-hour demo deadlines',
        'Collaborated with UX designers on mobile interface optimization'
      ],
      technologies: ['iOS', 'Swift', 'AWS', 'REST API', 'Mobile Development'],
      color: 'bg-cyan-500'
    },
    {
      company: 'GM IEEE Senior Design',
      position: 'Lead Engineer',
      period: 'Aug 2017 – May 2018',
      location: 'Virginia Tech',
      type: 'Academic Project',
      description: 'Led autonomous robot development for IEEE Southeastcon competition.',
      achievements: [
        'Designed and built autonomous robot for IEEE Southeastcon competition',
        'Led CAD design, embedded software development, and system testing',
        'Implemented computer vision and path planning algorithms',
        'Managed interdisciplinary team of 6 engineering students',
        'Achieved top 10 finish in regional IEEE competition'
      ],
      technologies: ['C++', 'Computer Vision', 'Robotics', 'CAD', 'Embedded Systems'],
      color: 'bg-orange-500'
    },
    {
      company: 'Joba Design',
      position: 'Engineering Intern',
      period: 'Jun – Aug 2017',
      location: 'Virginia Beach, VA',
      type: 'Internship',
      description: 'Bridged design and engineering through rapid prototyping and user research.',
      achievements: [
        'Bridged design and engineering teams through rapid prototyping',
        'Built Arduino-based interactive devices for user experience testing',
        'Conducted ergonomics research and usability studies',
        'Developed proof-of-concept prototypes for client presentations',
        'Collaborated with industrial designers on product development'
      ],
      technologies: ['Arduino', 'Prototyping', 'UX Research', 'Product Design', 'C++'],
      color: 'bg-pink-500'
    },
    {
      company: 'Communication Network Services',
      position: 'Software Engineering Intern',
      period: 'Feb – Sept 2016',
      location: 'Virginia Beach, VA',
      type: 'Internship',
      description: 'Developed network monitoring dashboards and traffic analysis tools.',
      achievements: [
        'Built UI dashboard for real-time network log monitoring',
        'Researched and implemented ELK stack for log aggregation',
        'Created Kibana visualizations for network traffic analysis',
        'Performed network router testing and performance optimization',
        'Developed traffic heatmaps for network capacity planning'
      ],
      technologies: ['ELK Stack', 'Kibana', 'Network Monitoring', 'UI Development', 'Data Visualization'],
      color: 'bg-indigo-500'
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My journey from embedded systems to IoT architecture, building scalable solutions 
            across startups and established companies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500"></div>
          
          <motion.div className="space-y-12" variants={containerVariants}>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 w-4 h-4 rounded-full ${exp.color} border-4 border-white dark:border-gray-900 transform -translate-x-1/2 z-10`}></div>
                
                {/* Content card */}
                <div className="ml-20">
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{exp.position}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-300 mb-2">
                          <div className="flex items-center space-x-2">
                            <Briefcase className="w-4 h-4" />
                            <span className="font-semibold">{exp.company}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-2 text-primary-600 dark:text-primary-400">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium">{exp.period}</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exp.type === 'Full-time' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : exp.type === 'Internship'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                          }`}>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Award className="w-4 h-4 text-accent-500" />
                        <span>Key Achievements</span>
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                              {achievement}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center space-x-2">
                        <Code className="w-4 h-4 text-primary-500" />
                        <span>Technologies</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">
              Career Progression Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              From network monitoring dashboards to autonomous UAV systems, my career has been defined by 
              building increasingly complex embedded and IoT solutions. Each role has expanded my perspective 
              from component-level optimization to system-level architecture, preparing me for the next phase 
              of designing mass-market connected products.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Experience;

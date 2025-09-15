import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Globe, Code, Zap, Users, BookOpen, Target } from 'lucide-react';

const About = () => {
  const education = [
    {
      institution: 'University College London (UCL)',
      degree: 'MSc Connected Environments',
      period: '2024 – 2025',
      location: 'London, UK',
      description: 'Specialized in IoT systems, urban sensing, and connected product design. Focus on scalable architectures for smart city applications.',
      highlights: [
        'Urban IoT systems and smart city technologies',
        'Connected product design and user experience',
        'Scalable architecture for mass-market deployment',
        'Research in turbulent urban environments'
      ],
      color: 'bg-blue-500'
    },
    {
      institution: 'Virginia Tech',
      degree: 'BSc Computer Engineering',
      period: '2014 – 2019',
      location: 'Blacksburg, VA',
      description: 'Comprehensive foundation in computer systems, embedded programming, and digital design. Active in IEEE and robotics competitions.',
      highlights: [
        'Computer systems architecture and design',
        'Embedded systems and microcontroller programming',
        'Digital signal processing and communications',
        'IEEE Southeastcon robotics competition leadership'
      ],
      color: 'bg-orange-500'
    }
  ];

  const skills = [
    {
      category: 'Embedded Systems',
      icon: Zap,
      skills: ['C/C++', 'FreeRTOS', 'ESP32/Arduino', 'PCB Design', 'Signal Processing'],
      color: 'text-blue-500'
    },
    {
      category: 'IoT & Cloud',
      icon: Globe,
      skills: ['MQTT', 'AWS/Cloud Services', 'REST APIs', 'Data Analytics', 'System Architecture'],
      color: 'text-green-500'
    },
    {
      category: 'Software Development',
      icon: Code,
      skills: ['Python', 'JavaScript/React', 'Flutter', 'Git', 'Agile/Scrum'],
      color: 'text-purple-500'
    },
    {
      category: 'Design & Prototyping',
      icon: Target,
      skills: ['Product Design', 'User Research', 'CAD/3D Modeling', 'Rapid Prototyping', 'UI/UX'],
      color: 'text-pink-500'
    }
  ];

  const certifications = [
    {
      name: 'Autodesk Inventor Professional',
      issuer: 'Autodesk',
      year: '2019',
      description: 'Advanced 3D CAD design and mechanical engineering'
    }
  ];

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            I'm an embedded systems engineer transitioning to IoT architecture and product design. 
            My journey spans from low-level firmware to cloud-connected systems, with a passion for 
            creating technology that scales from prototype to mass market.
          </p>
        </motion.div>

        {/* Personal Story */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
              <Users className="w-6 h-6 text-primary-500" />
              <span>My Journey</span>
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                My path in technology began with a fascination for how things work at the most fundamental level. 
                During my computer engineering studies at Virginia Tech, I dove deep into embedded systems, 
                digital design, and the intricate dance between hardware and software.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Over the past five years, I've worked across various startups and established companies, 
                building everything from UAV control systems to battery safety monitors. Each role has 
                expanded my perspective from component-level optimization to system-level architecture.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Now, pursuing my MSc in Connected Environments at UCL, I'm focused on the bigger picture: 
                how connected devices can create meaningful experiences for people and communities. I'm 
                passionate about bridging the gap between technical capability and human need, designing 
                IoT systems that are not just functional, but truly valuable at scale.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
            <GraduationCap className="w-8 h-8 text-primary-500" />
            <span>Education</span>
          </h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${edu.color} text-white flex-shrink-0`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{edu.degree}</h3>
                        <p className="text-lg text-primary-600 dark:text-primary-400 font-semibold mb-1">
                          {edu.institution}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">{edu.location}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {edu.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2">Key Areas:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
            <Code className="w-8 h-8 text-primary-500" />
            <span>Skills & Technologies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <skillGroup.icon className={`w-6 h-6 ${skillGroup.color}`} />
                  <h3 className="text-lg font-semibold">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center space-x-3">
            <Award className="w-8 h-8 text-primary-500" />
            <span>Certifications</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                    <Award className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{cert.name}</h3>
                    <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-1">
                      {cert.issuer} • {cert.year}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div variants={itemVariants}>
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              Looking Forward
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I'm excited to join teams that are building the next generation of connected products. 
              My goal is to work at the intersection of IoT systems, product design, and user experience, 
              creating technology that seamlessly integrates into people's lives and scales to serve 
              millions of users worldwide.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;

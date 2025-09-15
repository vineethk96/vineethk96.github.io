import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Cloud, Smartphone, Users, ArrowRight, Wifi } from 'lucide-react';

const AnimatedSystemFlow = () => {
  const flowItems = [
    {
      icon: Cpu,
      label: 'Sensor',
      description: 'Edge Devices',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Wifi,
      label: 'Gateway',
      description: 'Connectivity',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: Cloud,
      label: 'Cloud',
      description: 'Processing',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Smartphone,
      label: 'App',
      description: 'Interface',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    },
    {
      icon: Users,
      label: 'Users',
      description: 'Experience',
      color: 'text-pink-500',
      bgColor: 'bg-pink-100 dark:bg-pink-900/30'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.8
      }
    }
  };

  const dataPacketVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      x: [0, 100, 200, 300, 400],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {flowItems.map((item, index) => (
          <React.Fragment key={item.label}>
            <motion.div
              variants={itemVariants}
              className="relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`relative p-6 rounded-2xl ${item.bgColor} border-2 border-transparent group-hover:border-current transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-full ${item.color} bg-white dark:bg-gray-800 shadow-md mb-4`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
                
                {/* Floating animation */}
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: [-100, 100],
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
            </motion.div>

            {/* Arrow between items */}
            {index < flowItems.length - 1 && (
              <motion.div
                variants={arrowVariants}
                className="relative hidden lg:block"
              >
                <ArrowRight className="w-6 h-6 text-gray-400 dark:text-gray-600" />
                
                {/* Animated data packet */}
                <motion.div
                  className="absolute top-1/2 left-0 w-2 h-2 bg-accent-500 rounded-full"
                  variants={dataPacketVariants}
                  style={{ transform: 'translateY(-50%)' }}
                />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Background grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10" />
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* System description */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Building scalable IoT ecosystems that seamlessly connect physical devices to digital experiences, 
          from prototype to production-ready systems serving millions of users.
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedSystemFlow;

import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../data/constants';
import ProjectCard from './ProjectCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const ProjectGrid = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} variant="grid" />
      ))}
    </motion.div>
  );
};

export default ProjectGrid;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: 'easeOut' },
  }),
};

const ProjectCard = ({ project, index }) => {
  const medium = project.images?.[0]?.medium_url || project.images?.[0]?.url;

  return (
    <motion.div variants={fadeUp} custom={index}>
      <Link to={`/projects/${project.id}`} className="group block">
        <div className="technic-module-hover overflow-hidden">
          {/* Image with grayscale-to-color transition */}
          <div className="relative overflow-hidden border-b-2 border-primary aspect-video bg-faint">
            {medium ? (
              <img
                src={medium}
                alt={project.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-faint">
                {project.icon && (
                  <project.icon
                    className="w-12 h-12 text-primary/20 group-hover:text-primary/50 transition-colors duration-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            )}
            {/* Serial number overlay */}
            <div className="absolute top-2 left-2 font-mono text-xs text-background bg-primary px-2 py-0.5 uppercase tracking-wider">
              #{String(index + 1).padStart(2, '0')}
            </div>
            {/* Status badge */}
            <div className={`absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 border border-current text-xs font-mono uppercase tracking-wider ${
              project.status === 'Completed' || project.status === 'Active'
                ? 'text-success bg-background/90 border-success/30'
                : 'text-primary/50 bg-background/90 border-primary/20'
            }`}>
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  project.status === 'Completed' || project.status === 'Active'
                    ? 'bg-success'
                    : 'bg-primary/30'
                }`}
                aria-hidden="true"
              />
              {project.status || 'Complete'}
            </div>
          </div>

          {/* Card body */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-heading font-bold text-primary text-base leading-tight group-hover:text-accent transition-colors duration-200">
                {project.title}
              </h3>
              <span className="font-mono text-xs text-primary/40 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                {project.year}
              </span>
            </div>
            <p className="font-body text-xs text-primary/60 leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(project.tags || []).slice(0, 4).map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const SlotEmpty = ({ index }) => (
  <motion.div variants={fadeUp} custom={index}>
    <div className="border-2 border-dashed border-primary/20 aspect-video bg-faint/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="font-mono text-xs text-primary/20 uppercase tracking-widest mb-1">
          Slot Empty
        </div>
        <div className="font-mono text-xs text-primary/15 uppercase tracking-widest">
          Module {String(index + 1).padStart(2, '0')}
        </div>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const projects = PROJECTS || [];

  // Pad to multiple of 2 so grid looks intentional
  const targetCount = Math.max(projects.length, Math.ceil(projects.length / 2) * 2 + 2);
  const slots = Array.from({ length: targetCount }, (_, i) =>
    i < projects.length ? { type: 'project', data: projects[i] } : { type: 'empty' }
  );

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <motion.header variants={fadeUp} custom={0} className="mb-8 border-l-8 border-accent pl-6">
          <p className="font-mono text-xs font-bold text-accent tracking-widest mb-2 uppercase">
            System_Documentation // Vol_01
          </p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl text-primary tracking-tighter uppercase leading-none">
            Projects:<br />
            <span
              className="italic text-accent"
              style={{ textShadow: '4px 4px 0px rgba(50, 50, 50, 0.7)' }}
            >
              Component_Inventory
            </span>
          </h1>
        </motion.header>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {slots.map((slot, i) =>
            slot.type === 'project' ? (
              <ProjectCard
                key={slot.data.id}
                project={slot.data}
                index={i}
              />
            ) : (
              <SlotEmpty key={`empty-${i}`} index={i} />
            )
          )}
        </div>

      </div>
    </motion.div>
  );
};

export default Projects;

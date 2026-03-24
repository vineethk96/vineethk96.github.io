import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { WORK_EXPERIENCE } from '../data/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

const DeploymentLogCard = ({ exp, index, isLeft }) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    className={`relative flex ${isLeft ? 'flex-row' : 'flex-row-reverse'} gap-0`}
  >
    {/* Content Card */}
    <div className={`w-[calc(50%-24px)] ${isLeft ? 'mr-12' : 'ml-12'}`}>
      <motion.div
        className="technic-module p-5 cursor-default"
        whileHover={{ x: isLeft ? -2 : 2, y: -2 }}
        transition={{ duration: 0.15 }}
      >
        {/* Card Header */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-bold text-primary text-lg leading-tight">
              {exp.position}
            </h3>
            <span className="font-mono text-xs text-primary/40 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
              {exp.start_year}–{exp.end_year || 'Now'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold">
              {exp.company}
            </span>
            {exp.location && (
              <span className="flex items-center gap-1 font-mono text-xs text-primary/40 uppercase tracking-wider">
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {exp.location}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-sm text-primary/60 leading-relaxed mb-4">
          {exp.description}
        </p>

        {/* Achievements */}
        {exp.achievements?.length > 0 && (
          <div className="mb-4">
            <div className="section-label mb-2">Key Deployments</div>
            <ul className="space-y-1.5">
              {exp.achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" aria-hidden="true" />
                  <span className="font-body text-xs text-primary/60 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Tags */}
        {exp.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span key={tech} className="tag-pill">{tech}</span>
            ))}
          </div>
        )}
      </motion.div>
    </div>

    {/* Timeline Node (centered) */}
    <div className="absolute left-1/2 -translate-x-1/2 top-5 flex flex-col items-center z-10">
      <div className="w-5 h-5 border-2 border-primary bg-background flex items-center justify-center">
        <div className="w-2 h-2 bg-accent" />
      </div>
    </div>
  </motion.div>
);

const Experience = () => {
  const experiences = (WORK_EXPERIENCE || []).map(exp => ({
    company: exp.company,
    position: exp.position,
    start_year: exp.start_year,
    end_year: exp.end_year,
    location: exp.location,
    description: exp.description,
    achievements: exp.achievements || [],
    technologies: exp.tags || [],
  }));

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-10">
          <div className="section-label">Career Module</div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary">
            Service Record
          </h1>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Vertical service trace */}
          <div
            className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-primary/20"
            aria-hidden="true"
          />
          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <DeploymentLogCard
                key={i}
                exp={exp}
                index={i + 1}
                isLeft={i % 2 === 0}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline — single column */}
        <div className="md:hidden relative">
          {/* Left service trace */}
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"
            aria-hidden="true"
          />
          <div className="space-y-6 ml-10">
            {experiences.map((exp, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 1} className="relative">
                {/* Node */}
                <div
                  className="absolute -left-[2.125rem] top-4 w-5 h-5 border-2 border-primary bg-background flex items-center justify-center"
                  aria-hidden="true"
                >
                  <div className="w-2 h-2 bg-accent" />
                </div>

                <div className="technic-module p-5">
                  <div className="flex flex-col gap-1 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-heading font-bold text-primary text-base leading-tight">
                        {exp.position}
                      </h3>
                      <span className="font-mono text-xs text-primary/40 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                        {exp.start_year}–{exp.end_year || 'Now'}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold">
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1 font-mono text-xs text-primary/40 uppercase tracking-wider">
                        <MapPin className="w-3 h-3" aria-hidden="true" />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <p className="font-body text-sm text-primary/60 leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  {exp.achievements?.length > 0 && (
                    <ul className="space-y-1.5 mb-3">
                      {exp.achievements.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5" aria-hidden="true" />
                          <span className="font-body text-xs text-primary/60 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="tag-pill">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Experience;

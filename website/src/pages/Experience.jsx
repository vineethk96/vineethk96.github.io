import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Cpu } from 'lucide-react';
import { TIMELINE_DATA } from '../data/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const ExperienceCard = ({ exp, index, isLeft, nodeRef }) => {
  const isCurrent = exp.isCurrent;
  const yearLabel = isCurrent ? `${exp.start_year} — Current` : `${exp.start_year}`;

  return (
    <motion.div
      variants={fadeUp}
      custom={index + 1}
      className="relative z-10 flex items-center justify-between gap-0 group"
    >
      {/* Left slot: card (isLeft) OR year label */}
      <div className="w-[45%] flex justify-end pr-10">
        {isLeft ? (
          <motion.div
            className="w-full border-2 border-primary rounded-2xl p-6 bg-background relative cursor-default"
            style={{ boxShadow: isCurrent ? '6px 6px 0px 0px #FFBF00' : '6px 6px 0px 0px #031632' }}
            whileHover={{ x: -3, y: -3 }}
            transition={{ duration: 0.15 }}
          >
            <CardContent exp={exp} isCurrent={isCurrent} />
          </motion.div>
        ) : (
          <span
            className={`font-heading font-extrabold text-5xl text-primary tracking-tighter uppercase select-none${isCurrent ? ' text-shadow-accent-fluid' : ''}`}
            aria-hidden="true"
          >
            {yearLabel}
          </span>
        )}
      </div>

      {/* Timeline Node (centered) */}
      <div ref={nodeRef} className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        {isCurrent ? (
          <motion.div
            className="w-8 h-8 border-4 border-primary bg-accent flex items-center justify-center"
            initial={{ rotate: 45 }}
            animate={{ scale: [1, 1.12, 1], rotate: 45 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <div className="w-2 h-2 rounded-full bg-primary -rotate-45" />
          </motion.div>
        ) : (
          <div className="w-8 h-8 rotate-45 border-4 border-primary bg-background flex items-center justify-center transition-colors duration-200">
            <div className="w-2 h-2 rounded-full bg-primary/40 -rotate-45" />
          </div>
        )}
      </div>

      {/* Right slot: year label (isLeft) OR card */}
      <div className="w-[45%] flex justify-start pl-10">
        {!isLeft ? (
          <motion.div
            className="w-full border-2 border-primary rounded-2xl p-6 bg-background relative cursor-default"
            style={{ boxShadow: isCurrent ? '6px 6px 0px 0px #FFBF00' : '6px 6px 0px 0px #031632' }}
            whileHover={{ x: 3, y: -3 }}
            transition={{ duration: 0.15 }}
          >
            <CardContent exp={exp} isCurrent={isCurrent} />
          </motion.div>
        ) : (
          <span
            className={`font-heading font-extrabold text-5xl text-primary tracking-tighter uppercase select-none${isCurrent ? ' text-shadow-accent-fluid' : ''}`}
            aria-hidden="true"
          >
            {yearLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

const CardContent = ({ exp, isCurrent }) => (
  <>
    {/* Decorative pegs */}
    <div className="absolute top-4 right-4 flex gap-1 opacity-30" aria-hidden="true">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    </div>

    {/* Header */}
    <div className="mb-4 pr-6">
      <div className="flex items-center gap-2 mb-1">
        <span
          className={`font-mono text-[10px] font-bold uppercase tracking-widest ${
            isCurrent ? 'text-accent' : 'text-primary-muted'
          }`}
        >
          {exp.end_year ? `${exp.start_year} — ${exp.end_year}` : `${exp.start_year} — Present`}
        </span>
        <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 border ${
          exp.type === 'education'
            ? 'border-blue-400/40 text-blue-400/70'
            : 'border-accent/40 text-accent'
        }`}>
          {exp.type === 'education' ? 'Education' : 'Work'}
        </span>
      </div>
      <h3 className="font-heading font-bold text-lg text-primary uppercase tracking-tight leading-tight mb-1">
        {exp.position}
      </h3>
      <span className="font-mono text-xs text-primary-sub font-bold uppercase tracking-wider">
        {exp.company}
      </span>
    </div>

    {/* Meta row */}
    <div className="flex flex-wrap items-center gap-4 mb-4">
      {exp.location && (
        <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary-muted">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {exp.location}
        </span>
      )}
      {exp.technologies?.length > 0 && (
        <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-primary-muted">
          <Cpu className="w-3 h-3" aria-hidden="true" />
          {exp.technologies.length} Technologies
        </span>
      )}
    </div>

    {/* Description */}
    <p className="font-body text-sm text-primary-sub leading-relaxed mb-5">
      {exp.description}
    </p>

    {/* Achievements */}
    {exp.achievements?.length > 0 && (
      <div className="mb-5">
        <div className="section-label mb-2">
          {exp.type === 'education' ? 'Key_Highlights' : 'Key_Deployments'}
        </div>
        <ul className="space-y-2">
          {exp.achievements.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span
                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                  isCurrent ? 'bg-accent' : 'bg-primary/30'
                }`}
                aria-hidden="true"
              />
              <span className="font-body text-xs text-primary-sub leading-relaxed">{item}</span>
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
  </>
);

const Experience = () => {
  const containerRef = useRef(null);
  const firstNodeRef = useRef(null);
  const lastNodeRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !firstNodeRef.current || !lastNodeRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const first = firstNodeRef.current.getBoundingClientRect();
      const last = lastNodeRef.current.getBoundingClientRect();
      const top = first.top + first.height / 2 - containerTop;
      const height = last.top + last.height / 2 - containerTop - top;
      setLineStyle({ top, height });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const entries = (TIMELINE_DATA || []).map((item, index) => {
    const isEducation = !!item.title;
    return {
      type: isEducation ? 'education' : 'work',
      company: isEducation ? item.title : item.company,
      position: isEducation ? item.subtitle : item.position,
      start_year: item.start_year,
      end_year: item.end_year,
      location: item.location,
      description: item.description,
      achievements: isEducation ? (item.highlights || []) : (item.achievements || []),
      technologies: isEducation ? [] : (item.tags || []),
      isCurrent: index === 0,
    };
  });

  return (
    <motion.div
      className="blueprint-bg pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <motion.header variants={fadeUp} custom={0} className="mb-16 border-l-8 border-accent pl-6">
          <p className="font-mono text-xs font-bold text-accent tracking-widest mb-2 uppercase">
            System_Documentation // Vol_01
          </p>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-7xl text-primary tracking-tighter uppercase leading-none">
            Experience:<br />
            <span
              className="italic text-accent text-shadow-dark-fluid"
            >
              Service_Record
            </span>
          </h1>
        </motion.header>

        {/* Desktop Timeline */}
        <div ref={containerRef} className="hidden md:block relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 bg-primary/40 z-[1]"
            style={{ top: lineStyle.top, height: lineStyle.height }}
            aria-hidden="true"
          />
          <div className="space-y-16">
            {entries.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
                isLeft={i % 2 === 0}
                nodeRef={i === 0 ? firstNodeRef : i === entries.length - 1 ? lastNodeRef : null}
              />
            ))}
          </div>
        </div>

        {/* Mobile Timeline — single column */}
        <div className="md:hidden relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"
            aria-hidden="true"
          />
          <div className="space-y-6 ml-12">
            {entries.map((exp, i) => {
              const isCurrent = exp.isCurrent;
              return (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="relative">
                  {/* Node */}
                  <div
                    className="absolute -left-[2.25rem] top-4 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    {isCurrent ? (
                      <motion.div
                        className="w-6 h-6 border-4 border-primary bg-accent flex items-center justify-center"
                        initial={{ rotate: 45 }}
                        animate={{ scale: [1, 1.12, 1], rotate: 45 }}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary -rotate-45" />
                      </motion.div>
                    ) : (
                      <div className="w-6 h-6 rotate-45 border-4 border-primary bg-background flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 -rotate-45" />
                      </div>
                    )}
                  </div>

                  <div
                    className="border-2 border-primary rounded-2xl p-5 bg-background"
                    style={{ boxShadow: isCurrent ? '4px 4px 0px 0px #FFBF00' : '4px 4px 0px 0px #031632' }}
                  >
                    <CardContent exp={exp} isCurrent={isCurrent} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Experience;

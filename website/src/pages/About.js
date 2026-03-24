import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code, Zap, Globe, Target, Cloud, Brain } from 'lucide-react';
import { EDUCATION, SKILLS, CERTIFICATIONS, PERSONAL_STORY, PERSONAL_INFO } from '../data/constants';

const ICON_MAP = { Zap, Globe, Code, Target, Cloud, Brain };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const About = () => {
  const education = (EDUCATION || []).map(edu => ({
    institution: edu.title,
    degree: edu.subtitle,
    period: edu.year,
    location: edu.location,
    description: edu.description,
    highlights: edu.highlights || [],
  }));

  const skills = Object.entries(SKILLS || {}).map(([category, data]) => ({
    category,
    icon: ICON_MAP[data.icon] || Code,
    skills: data.skills || [],
  }));

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <motion.div variants={fadeUp} custom={0} className="mb-8">
          <div className="section-label">System Manual</div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-primary">
            About
          </h1>
        </motion.div>

        {/* Main Grid — Bio + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

          {/* Core Logic — Bio */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div variants={fadeUp} custom={1} className="technic-module p-6">
              <div className="section-label mb-3">Core Logic</div>
              <div className="space-y-4">
                {(PERSONAL_STORY?.journey || []).map((paragraph, i) => (
                  <p key={i} className="font-body text-primary/70 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Education Log */}
            <motion.div variants={fadeUp} custom={2}>
              <div className="section-label mb-3">Education Log</div>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={3 + i}
                    className="technic-module p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-2 border-2 border-primary bg-background rounded-lg flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                          <div>
                            <h3 className="font-heading font-bold text-primary text-base">
                              {edu.degree}
                            </h3>
                            <p className="font-mono text-xs text-accent uppercase tracking-wider">
                              {edu.institution}
                            </p>
                            <p className="font-mono text-xs text-primary/40 uppercase tracking-wider">
                              {edu.location}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-primary/40 uppercase tracking-wider whitespace-nowrap">
                            {edu.period}
                          </span>
                        </div>
                        <p className="font-body text-sm text-primary/60 leading-relaxed mb-3">
                          {edu.description}
                        </p>
                        {edu.highlights.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {edu.highlights.map((h, j) => (
                              <span key={j} className="tag-pill">{h}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar — System Specs */}
          <div className="space-y-4">
            <motion.div variants={fadeUp} custom={2} className="technic-module p-5 bg-primary text-background">
              <div className="font-mono text-xs uppercase tracking-widest text-background/50 mb-4">
                System Specs
              </div>
              <div className="space-y-3">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-0.5">
                    Operator
                  </div>
                  <div className="font-heading font-bold text-background text-sm">
                    {PERSONAL_INFO?.name || 'Vineeth Kirandumkara'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-0.5">
                    Location
                  </div>
                  <div className="font-mono text-sm text-background/80">
                    {PERSONAL_INFO?.location || '—'}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-0.5">
                    Graduation
                  </div>
                  <div className="font-mono text-sm text-background/80">
                    {PERSONAL_INFO?.expectedGraduation || '—'}
                  </div>
                </div>
                <div className="border-t border-background/20 pt-3">
                  <div className="font-mono text-xs uppercase tracking-widest text-background/40 mb-1">
                    Status
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="led-indicator" aria-hidden="true" />
                    <span className="font-mono text-xs text-success uppercase tracking-wider">
                      Operational
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeUp} custom={3} className="technic-module p-5 border-accent bg-accent/5">
              <div className="section-label mb-2">System Vision</div>
              <p className="font-body text-sm text-primary/70 leading-relaxed">
                {PERSONAL_STORY?.vision || ''}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Tech Inventory — Skills Grid */}
        <motion.div variants={fadeUp} custom={5}>
          <div className="section-label mb-3">Tech Inventory</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {skills.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={6 + i}
                  className="technic-module p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-primary/60" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-wider text-primary/60">
                      {group.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tag-pill">{skill}</span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Operation History — Certifications */}
        {(CERTIFICATIONS || []).length > 0 && (
          <motion.div variants={fadeUp} custom={8}>
            <div className="section-label mb-3">Certifications</div>
            <div className="technic-module overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary bg-faint">
                    <th className="font-mono text-xs uppercase tracking-wider text-primary/50 text-left px-4 py-3">
                      Certification
                    </th>
                    <th className="font-mono text-xs uppercase tracking-wider text-primary/50 text-left px-4 py-3 hidden sm:table-cell">
                      Issuer
                    </th>
                    <th className="font-mono text-xs uppercase tracking-wider text-primary/50 text-left px-4 py-3">
                      Year
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CERTIFICATIONS.map((cert, i) => (
                    <tr
                      key={i}
                      className="border-b border-muted last:border-b-0 hover:bg-faint transition-colors duration-150"
                    >
                      <td className="px-4 py-3">
                        <div className="font-body font-semibold text-primary text-sm">
                          {cert.name}
                        </div>
                        <div className="font-mono text-xs text-primary/40 sm:hidden">
                          {cert.issuer}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-primary/60 hidden sm:table-cell">
                        {cert.issuer}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-primary/60">
                        {cert.year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

export default About;

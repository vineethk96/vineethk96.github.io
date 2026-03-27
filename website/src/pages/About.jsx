import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Code, Zap, Globe, Target, Cloud, Brain,
  Terminal, MapPin, Clock, History, LayoutGrid, Award, ArrowRight,
} from 'lucide-react';
import { EDUCATION, SKILLS, CERTIFICATIONS, PERSONAL_STORY, PERSONAL_INFO, WORK_EXPERIENCE } from '../data/constants';

const ICON_MAP = { Zap, Globe, Code, Target, Cloud, Brain };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
  }),
};

const getDegreeLevel = (subtitle = '') => {
  const s = subtitle.toLowerCase();
  if (s.startsWith('msc') || s.startsWith('meng') || s.startsWith('ma ') || s.startsWith('ms ')) return "Master's Degree";
  if (s.startsWith('bsc') || s.startsWith('beng') || s.startsWith('ba ') || s.startsWith('bs ')) return "Bachelor's Degree";
  return 'Degree';
};

const CORE_STACK = ['C++', 'React', 'Python', 'IoT'];

const About = () => {
  const navigate = useNavigate();

  const education = (EDUCATION || []).map(edu => ({
    institution: edu.title,
    degree: edu.subtitle,
    degreeLevel: getDegreeLevel(edu.subtitle),
    period: `${edu.start_year} — ${edu.end_year}`,
    location: edu.location,
    description: edu.description,
    highlights: edu.highlights || [],
  }));

  const skills = Object.entries(SKILLS || {}).map(([category, data]) => ({
    category,
    icon: ICON_MAP[data.icon] || Code,
    skills: data.skills || [],
  }));

  const workHistory = (WORK_EXPERIENCE || []).slice(0, 3);

  const minStartYear = Math.min(...(WORK_EXPERIENCE || [{ start_year: new Date().getFullYear() }]).map(w => w.start_year));
  const yearsExperience = new Date().getFullYear() - 2019;  // 2019 is when I graduated undergrad

  const locationDisplay = PERSONAL_INFO?.location?.split(', ').slice(0, 2).join('_').toUpperCase() || 'LONDON_UK';

  return (
    <motion.div
      className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 min-h-screen"
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto">

        {/* Page Header */}
        <motion.header variants={fadeUp} custom={0} className="mb-12 border-l-8 border-accent pl-6">
          <p className="font-mono text-xs font-bold text-accent tracking-widest mb-2 uppercase">
            System_Documentation // Vol_01
          </p>
          <h1 className="font-heading font-extrabold text-5xl sm:text-7xl text-primary tracking-tighter uppercase leading-none">
            System_Manual:<br />
            <span
              className="italic text-accent"
              style={{ textShadow: '4px 4px 0px rgba(3, 22, 50, 0.4)' }}
            >
              Origins_&amp;_Pivot
            </span>
          </h1>
        </motion.header>

        {/* Main 12-col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left Column ─────────────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-8">

            {/* Core Logic */}
            <motion.section variants={fadeUp} custom={1} className="technic-module p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 flex gap-1 opacity-20" aria-hidden="true">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-1 h-1 bg-primary rounded-full" />
                ))}
              </div>
              <div className="flex items-center gap-3 mb-8">
                <Terminal className="w-5 h-5 text-accent" aria-hidden="true" />
                <h2 className="font-heading font-bold text-2xl tracking-tight uppercase">
                  Core_Logic (The Narrative)
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-10 text-primary/60 leading-relaxed">
                <div className="space-y-3">
                  <p className="font-mono font-bold text-primary uppercase text-xs tracking-wider">
                    Phase_01: The_Purpose
                  </p>
                  <p>{PERSONAL_STORY?.introduction || ''}</p>
                </div>
                <div className="space-y-3">
                  <p className="font-mono font-bold text-primary uppercase text-xs tracking-wider">
                    Phase_02: The_Pivot
                  </p>
                  <p>{(PERSONAL_STORY?.journey || [])[0] || ''}</p>
                </div>
              </div>
            </motion.section>

            {/* Education Log */}
            <motion.section variants={fadeUp} custom={2} className="border-2 border-primary p-8 rounded-2xl bg-secondary">
              <h2 className="font-heading font-bold text-2xl tracking-tight uppercase mb-8 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
                Education_Log
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {education.map((edu, i) => (
                  <div key={i} className={`border-l-4 pl-6 ${i === 0 ? 'border-accent' : 'border-primary/30'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-accent tracking-wider uppercase">
                        {edu.degreeLevel}
                      </span>
                      <span className="text-xs text-primary/40">{edu.location}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-base uppercase text-primary leading-tight mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-primary font-black mb-1 uppercase">{edu.institution}</p>
                    <p className="font-mono text-xs text-primary/40 mb-4">{edu.period}</p>
                    <p className="text-sm text-primary/60 leading-relaxed mb-5">{edu.description}</p>
                    <div className="space-y-2">
                      {edu.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${i === 0 ? 'bg-accent' : 'bg-primary/30'}`}
                            aria-hidden="true"
                          />
                          <span className="text-[11px] font-bold text-primary uppercase leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* ── Right Column ─────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* System Specs */}
            <motion.section
              variants={fadeUp}
              custom={1}
              className="bg-primary text-background border-2 border-primary p-6 rounded-2xl"
              style={{ boxShadow: '8px 8px 0px 0px #FFBF00' }}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-heading font-black text-xl tracking-tight uppercase">System_Specs</h2>
                <span className="px-2 py-1 bg-accent text-primary font-bold text-[10px] uppercase rounded">
                  v2.0.4_STABLE
                </span>
              </div>
              <div className="space-y-5">
                <div className="border-b border-background/20 pb-4">
                  <label className="block text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">
                    Current_Loc
                  </label>
                  <div className="flex items-center gap-2 font-heading font-bold text-base">
                    <MapPin className="w-4 h-4 text-accent/60 flex-shrink-0" aria-hidden="true" />
                    {locationDisplay}
                  </div>
                </div>
                <div className="border-b border-background/20 pb-4">
                  <label className="block text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">
                    System_Uptime
                  </label>
                  <div className="flex items-center gap-2 font-heading font-bold text-base">
                    <Clock className="w-4 h-4 text-accent/60 flex-shrink-0" aria-hidden="true" />
                    {yearsExperience}Y_Experience
                  </div>
                </div>
                <div className="border-b border-background/20 pb-4">
                  <label className="block text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-1 uppercase">
                    System_Status
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="led-indicator" aria-hidden="true" />
                    <span className="font-heading font-bold text-base uppercase">Curious</span>
                  </div>
                </div>
                <div>
                  <label className="block text-accent/80 text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">
                    Core_Stack
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CORE_STACK.map(tech => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-1 bg-white/10 border border-background/20 text-background/80 uppercase font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Operation History */}
            <motion.section variants={fadeUp} custom={2} className="technic-module p-6 relative">
              <div
                className="absolute -top-3 -right-3 w-8 h-8 bg-accent border-2 border-primary rotate-45"
                aria-hidden="true"
              />
              <h2 className="font-heading font-bold text-xl tracking-tight uppercase mb-6 flex items-center gap-2">
                <History className="w-5 h-5" aria-hidden="true" />
                Operation_History
              </h2>
              <div className="space-y-3">
                {workHistory.map((job, i) => (
                  <div
                    key={job.id || i}
                    className={`border-l-4 pl-4 py-2 hover:bg-secondary transition-colors ${i === 0 ? 'border-accent' : 'border-primary/30'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold text-accent uppercase">
                        {job.start_year} — {job.end_year || 'Pres'}
                      </span>
                      <span className="text-[10px] text-primary/40">
                        {job.location?.split(',')[1]?.trim() || ''}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-sm uppercase text-primary">{job.position}</h3>
                    <p className="text-[11px] text-primary/50 font-medium uppercase">{job.company}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4 border-t-2 border-dashed border-primary/20 flex justify-center">
                <button
                  onClick={() => navigate('/experience')}
                  className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 group hover:text-accent transition-colors"
                >
                  Full_Log_Terminal
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </motion.section>

          </div>
        </div>

        {/* Skills & Tech Inventory */}
        <motion.section variants={fadeUp} custom={5} className="mt-12 w-full">
          <div className="mb-8 border-l-4 border-accent pl-4">
            <h2 className="font-heading font-bold text-3xl tracking-tight uppercase flex items-center gap-3 text-primary">
              <LayoutGrid className="w-6 h-6" aria-hidden="true" />
              Skills_&amp;_Tech_Inventory
            </h2>
            <p className="font-mono text-[10px] font-bold tracking-[0.3em] uppercase text-primary/40 mt-1">
              Peripheral_Modules &amp; Core_Competencies
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((group, i) => {
              const Icon = group.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={6 + i}
                  className="bg-secondary border border-primary/20 p-5 rounded-2xl hover:border-primary transition-colors"
                >
                  <div className="flex items-center gap-2 mb-4 text-primary">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <h3 className="font-heading font-bold text-sm uppercase tracking-tight">{group.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-background border border-primary/20 text-[10px] font-bold uppercase text-primary/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Certifications Log */}
          {(CERTIFICATIONS || []).length > 0 && (
            <motion.div variants={fadeUp} custom={10} className="mt-8 p-6 border-2 border-dashed border-primary/30 rounded-2xl bg-secondary">
              <div className="flex items-center gap-3 mb-5">
                <Award className="w-5 h-5 text-accent" aria-hidden="true" />
                <h3 className="font-heading font-bold text-lg uppercase tracking-tight">Certifications_Log</h3>
              </div>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i}>
                    {i > 0 && <div className="border-t border-primary/20 mb-4" />}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div>
                        <p className="font-heading font-bold text-primary uppercase text-sm">{cert.name}</p>
                        <p className="text-[10px] font-medium text-primary/50 uppercase">
                          {cert.issuer} • {cert.year}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 bg-primary text-background uppercase tracking-widest flex-shrink-0">
                        Verified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.section>

      </div>
    </motion.div>
  );
};

export default About;

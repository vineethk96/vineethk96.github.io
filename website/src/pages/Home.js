import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Bolt } from 'lucide-react';
import { useAnalytics } from '../hooks/useAnalytics';
import { PROJECTS } from '../data/constants';

const BAR_HEIGHTS_STANDBY = [16, 16, 16, 16, 16, 16, 16];
const BAR_HEIGHTS_ACTIVE  = [32, 48, 24, 56, 40, 64, 36];

const featuredProjects = PROJECTS.slice(0, 2);

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const [uptimeText, setUptimeText] = useState('0.000%');
  const { track } = useAnalytics();

  const uptimeMotion = useMotionValue(0);

  const handleEngage = () => {
    if (isActive) return;
    setIsActive(true);
    track('hero_engaged', { action: 'engage_power' });
    animate(uptimeMotion, 99.984, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate: (v) => setUptimeText(v.toFixed(3) + '%'),
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-surface-bright blueprint-bg-light text-lego-navy pt-20 pb-24 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto w-full py-8">

        {/* System badge */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className={`inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border-2 transition-all duration-700 ${
            isActive
              ? 'bg-lego-navy text-white border-lego-navy'
              : 'bg-lego-navy/10 text-lego-navy/60 border-lego-navy/20'
          }`}>
            {isActive ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lego-yellow opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-lego-yellow" />
                </span>
                SYSTEM_INIT_COMPLETE
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-lego-navy/30" />
                SYSTEM_STANDBY
              </>
            )}
          </span>
        </motion.div>

        {/* Large title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-lego-navy leading-none tracking-tighter uppercase">
            VINEETH_KIRANDUMKARA
          </h1>
          <p className="text-sm font-bold text-lego-navy/70 uppercase tracking-widest mt-3">
            Embedded Systems Engineer /{' '}
            <span className="border-b-4 border-lego-yellow">IoT Architect</span>
          </p>
        </motion.div>

        {/* Main assembly grid */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">

          {/* Left — Central Content Chassis */}
          <motion.div
            className="flex-1 bg-white border-[4px] border-lego-navy rounded-2xl p-6 sm:p-8 shadow-chunky-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Profile card */}
              <div className="relative w-40 h-48 flex-shrink-0 self-center sm:self-start">
                <div className="absolute inset-0 bg-lego-navy translate-x-2 translate-y-2 rounded-xl" />
                <div className={`relative border-[4px] border-lego-navy rounded-xl overflow-hidden w-full h-full transition-all duration-700 ${
                  isActive ? '' : 'grayscale'
                }`}>
                  <img
                    src="/profile.jpg"
                    alt="Vineeth Kirandumkara"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-surface-container');
                      e.target.parentElement.innerHTML = '<span class="font-mono text-2xl font-black text-lego-navy">VK</span>';
                    }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 translate-y-[-2px] bg-lego-navy text-white text-[9px] font-black tracking-widest px-3 py-1.5 rounded-b-xl text-center z-10">
                  SYSTEM_ARCHITECT_01
                </div>
              </div>

              {/* Hero text */}
              <div className="flex-1 space-y-5">
                <div>
                  <p className={`font-sans italic font-bold text-2xl sm:text-3xl leading-snug transition-colors duration-500 ${
                    isActive ? 'text-lego-navy' : 'text-lego-navy/50'
                  }`}>
                    {isActive
                      ? '"Building technology that makes the world marginally better."'
                      : 'Standby mode active. Awaiting system initialization to display full profile.'}
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={handleEngage}
                  className={`inline-flex items-center gap-3 font-mono text-sm tracking-widest uppercase px-6 py-3 border-[3px] border-lego-navy rounded-lg shadow-chunky transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-600 text-white cursor-default'
                      : 'bg-surface-container text-lego-navy hover:bg-lego-yellow'
                  }`}
                  whileTap={!isActive ? { scale: 0.97, x: 2, y: 2, boxShadow: '2px 2px 0px 0px #031632' } : {}}
                >
                  <span className={`relative flex h-2.5 w-2.5 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                    {isActive && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lego-yellow opacity-75" />
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isActive ? 'bg-lego-yellow' : 'bg-lego-navy/30'}`} />
                  </span>
                  {isActive ? 'POWER_ENGAGED' : 'ENGAGE_POWER'}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Right — Module stack */}
          <div className="w-full lg:w-60 flex flex-col gap-4">

            {/* Connection Module */}
            <motion.div
              className="bg-white border-[3px] border-lego-navy rounded-lg p-4 shadow-chunky"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center border-b-2 border-lego-navy pb-2 mb-3">
                <p className="font-mono text-[10px] font-black text-lego-navy/40 uppercase tracking-widest">
                  MODULE_01
                </p>
              </div>
              <p className="font-mono text-[10px] text-lego-navy/50 tracking-widest uppercase mb-2">
                CONNECTION_MODULE
              </p>
              <div className="flex items-end gap-1">
                {[4, 8, 12, 16].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isActive ? h * 2 + 8 : 8,
                      backgroundColor: isActive ? '#031632' : '#cbd5e1',
                    }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    style={{ width: 8, borderRadius: 2 }}
                  />
                ))}
                <span className={`font-mono text-[10px] ml-2 transition-colors duration-500 ${
                  isActive ? 'text-lego-navy font-bold' : 'text-lego-navy/30'
                }`}>
                  {isActive ? 'SYNCED' : 'OFFLINE'}
                </span>
              </div>
            </motion.div>

            {/* SYS_UPTIME */}
            <motion.div
              className="bg-white border-[3px] border-lego-navy rounded-lg p-4 shadow-chunky"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between items-center border-b-2 border-lego-navy pb-2 mb-3">
                <p className="font-mono text-[10px] font-black text-lego-navy/40 uppercase tracking-widest">
                  MODULE_02
                </p>
              </div>
              <p className="font-mono text-[10px] text-lego-navy/50 tracking-widest uppercase mb-1">
                SYS_UPTIME
              </p>
              <p className={`font-mono text-2xl font-bold transition-colors duration-500 ${
                isActive ? 'text-lego-navy' : 'text-lego-navy/20'
              }`}>
                {uptimeText}
              </p>
              <div className="flex items-center gap-2 mt-1">
                {isActive ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lego-red opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-lego-red" />
                    </span>
                    <span className="font-mono text-[10px] text-lego-red tracking-widest font-bold">LIVE</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-lego-navy/20" />
                    <span className="font-mono text-[10px] text-lego-navy/30 tracking-widest">STANDBY_IDLE</span>
                  </>
                )}
              </div>
            </motion.div>

            {/* ACTIVE_PROJECTS */}
            <motion.div
              className="bg-white border-[3px] border-lego-navy rounded-lg p-4 shadow-chunky"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex justify-between items-center border-b-2 border-lego-navy pb-2 mb-3">
                <p className="font-mono text-[10px] font-black text-lego-navy/40 uppercase tracking-widest">
                  MODULE_03
                </p>
              </div>
              <p className="font-mono text-[10px] text-lego-navy/50 tracking-widest uppercase mb-2">
                ACTIVE_PROJECTS
              </p>
              <div className="flex items-center gap-2">
                {isActive ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
                    </span>
                    <span className="font-mono text-[10px] text-accent-600 tracking-widest font-bold">STATUS: ONGOING</span>
                  </>
                ) : (
                  <>
                    <span className="h-2 w-2 rounded-full bg-lego-navy/20" />
                    <span className="font-mono text-[10px] text-lego-navy/30 tracking-widest">AWAITING_SYNC</span>
                  </>
                )}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* GitHub Dashboard */}
          <motion.div
            className="lg:col-span-4 bg-white border-[3px] border-lego-navy rounded-2xl p-6 shadow-chunky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className={`font-black text-base uppercase tracking-tighter transition-colors duration-500 ${
                isActive ? 'text-lego-navy' : 'text-lego-navy/40'
              }`}>
                {isActive ? 'GITHUB_DASHBOARD' : 'CONNECTION_OFFLINE'}
              </p>
              {isActive && (
                <span className="font-mono text-[10px] text-lego-navy/50 tracking-widest">DATA_STREAM ●</span>
              )}
            </div>
            <div className="flex items-end gap-2 h-16">
              {BAR_HEIGHTS_STANDBY.map((standbyH, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm"
                  animate={{
                    height: isActive ? BAR_HEIGHTS_ACTIVE[i] : standbyH,
                    backgroundColor: isActive
                      ? i % 3 === 0 ? '#031632' : i % 3 === 1 ? '#ffbf00' : '#1e3a5f'
                      : '#e2e8f0',
                  }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                  style={{ alignSelf: 'flex-end' }}
                />
              ))}
            </div>
            {isActive && (
              <motion.p
                className="font-mono text-[10px] text-lego-navy/40 tracking-widest mt-3 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                MON — SUN / CONTRIBUTION_VOLTAGE
              </motion.p>
            )}
          </motion.div>

          {/* Prototypes */}
          <motion.div
            className="lg:col-span-8 bg-lego-yellow border-[3px] border-lego-navy rounded-2xl p-6 sm:p-8 shadow-chunky"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-lego-navy flex items-center justify-center flex-shrink-0">
                <Bolt className="w-5 h-5 text-lego-yellow" />
              </div>
              <h2 className="text-4xl font-black uppercase tracking-tighter text-lego-navy leading-none">
                PROTOTYPES
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="block bg-white border-[3px] border-lego-navy rounded-xl p-4 shadow-chunky hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-chunky-lg transition-all duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon && (
                      <span className="text-lego-navy">
                        <project.icon className="w-4 h-4" />
                      </span>
                    )}
                    <p className="font-black text-sm uppercase tracking-tight text-lego-navy truncate">
                      {project.title}
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-lego-navy/60 leading-relaxed line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[9px] font-bold uppercase px-2 py-0.5 bg-lego-navy/10 text-lego-navy rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-4 text-right">
              <Link
                to="/projects"
                className="font-mono text-xs font-bold uppercase tracking-widest text-lego-navy underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                VIEW_ALL_PROJECTS →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default Home;

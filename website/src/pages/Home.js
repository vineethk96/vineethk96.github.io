import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, User } from 'lucide-react';
import FaderSwitch from '../components/ui/fader-switch';
import { PERSONAL_INFO, SOCIAL_LINKS, PROJECTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';

const GITHUB_USERNAME = 'vineethk96';

const TelemetryModule = ({ label, value, unit, isActive }) => (
  <div
    className={`technic-module p-4 transition-all duration-500 ${
      isActive ? '' : 'opacity-30'
    }`}
  >
    <div className="section-label">{label}</div>
    <div className="flex items-end gap-1.5 mt-1">
      <span
        className={`font-mono font-bold text-2xl transition-colors duration-500 ${
          isActive ? 'text-accent' : 'text-primary/30'
        }`}
      >
        {isActive ? value : '—'}
      </span>
      {unit && isActive && (
        <span className="font-mono text-xs text-primary/50 mb-1">{unit}</span>
      )}
    </div>
    <div className="flex items-center gap-1.5 mt-2">
      <span
        className={`inline-block w-2 h-2 rounded-full transition-all duration-500 ${
          isActive ? 'bg-success led-indicator' : 'bg-primary/20'
        }`}
        aria-hidden="true"
      />
      <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">
        {isActive ? 'Online' : 'Standby'}
      </span>
    </div>
  </div>
);

const Home = () => {
  const [isPowerEngaged, setIsPowerEngaged] = useState(false);
  const [carouselAngle, setCarouselAngle] = useState(0);
  const [githubGraphLoaded, setGithubGraphLoaded] = useState(false);
  const { track } = useAnalytics();

  const featuredProjects = (PROJECTS || []).slice(0, 6);

  // Slowly rotate the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselAngle((a) => (a + 0.3) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const handlePowerToggle = (next) => {
    const value = typeof next === 'boolean' ? next : !isPowerEngaged;
    setIsPowerEngaged(value);
    track('hero_power_engaged', { state: value ? 'active' : 'standby' });
  };

  return (
    <motion.div
      className="min-h-screen pt-28 pb-24 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* === HERO NAME TITLE === */}
        <h1 className="font-heading font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-primary leading-none mb-4 tracking-tight">
          {PERSONAL_INFO?.name || 'Vineeth_Kirandumkara'}
        </h1>

        <p className="font-mono text-sm sm:text-base text-primary/60 uppercase tracking-widest mb-8">
          {PERSONAL_INFO?.tagline || 'IoT Systems Engineer & Product Designer'}
        </p>

        {/* === HERO SECTION === */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

          {/* Left Column — Identity + CTA */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            {/* System ID Header */}
            <div className="technic-module p-5 sm:p-8">
              {/* Top row: headshot + bio text */}
              <div className="flex flex-col md:flex-row items-start gap-8 mb-6">

                {/* Headshot */}
                <div className="relative flex-shrink-0">
                  {/* Chunky shadow offset */}
                  <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl" />

                  {/* Photo container */}
                  <div className="relative w-44 h-52 border-[3px] border-primary rounded-xl overflow-hidden flex flex-col bg-primary/5">

                    {/* Image area */}
                    <div className="flex-1 relative group overflow-hidden bg-faint">
                      <img
                        src="/headshot.jpg"
                        alt="Vineeth Kirandumkara"
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />

                      {/* Fallback user icon */}
                      <div className="absolute inset-0 flex items-center justify-center text-primary/20 pointer-events-none">
                        <User className="w-16 h-16" aria-hidden="true" />
                      </div>

                      {/* Yellow accent bars — top-left overlay */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                        <div className="w-5 h-1 bg-accent" />
                        <div className="w-3 h-1 bg-accent" />
                      </div>

                      {/* OP_01 badge — top-right */}
                      <div className="absolute top-2 right-2 bg-accent px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-primary pointer-events-none">
                        OP_01
                      </div>
                    </div>

                    {/* Dark footer strip */}
                    <div className="bg-primary px-3 py-2 flex justify-between items-center">
                      <span className="text-[9px] font-mono font-black tracking-widest text-background/70 uppercase">
                        System_Architect_ID
                      </span>
                    </div>
                  </div>

                </div>

                {/* Text column */}
                <div className="flex flex-col flex-1 gap-4">
                  <div className="section-label">System Operator</div>

                  <p className="font-body text-primary/70 leading-relaxed max-w-lg">
                    {PERSONAL_INFO?.bio || 'Building connected systems from embedded devices to cloud architectures — designing products ready for the mass market.'}
                  </p>
                </div>

              </div>

              {/* Divider */}
              <div className="border-t-2 border-primary/10 mb-5" />

              {/* Full-width fader */}
              <FaderSwitch
                checked={isPowerEngaged}
                onChange={handlePowerToggle}
                activeLabel="SYSTEM ACTIVE"
                standbyLabel="ENGAGE POWER"
              />
            </div>

          </div>

          {/* Right Column — Telemetry Modules */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            <TelemetryModule
              label="Connection Status"
              value="Established"
              unit=""
              isActive={isPowerEngaged}
            />
            <TelemetryModule
              label="System Uptime"
              value="99.8"
              unit="%"
              isActive={isPowerEngaged}
            />
            <TelemetryModule
              label="Ongoing Projects"
              value={(PROJECTS || []).filter(p => p.status === 'In Progress' || p.status === 'Active').length || 3}
              unit="active"
              isActive={isPowerEngaged}
            />
          </div>
        </div>

        {/* === BENTO GRID === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* GitHub Contribution Graph */}
          <div className="technic-module p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="section-label">GitHub Activity</div>
              <a
                href={SOCIAL_LINKS?.github?.url || `https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('external_link_clicked', { type: 'github', page: 'hero' })}
                className="flex items-center gap-1.5 font-mono text-xs text-primary/50 hover:text-primary transition-colors duration-200"
              >
                <Github className="w-3 h-3" aria-hidden="true" />
                @{GITHUB_USERNAME}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
            <div
              className={`transition-opacity duration-500 ${isPowerEngaged ? 'opacity-100' : 'opacity-40'}`}
            >
              <img
                src={`https://ghchart.rshah.org/94A744/${GITHUB_USERNAME}`}
                alt={`${GITHUB_USERNAME} GitHub contribution graph`}
                className="w-full h-auto"
                onLoad={() => setGithubGraphLoaded(true)}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              {!githubGraphLoaded && (
                <div className="h-24 flex items-center justify-center">
                  <span className="font-mono text-xs text-primary/30 uppercase tracking-wider">
                    Loading contribution data…
                  </span>
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full transition-all duration-500 ${
                  isPowerEngaged ? 'bg-success led-indicator' : 'bg-primary/20'
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">
                {isPowerEngaged ? 'Live Data' : 'Offline'}
              </span>
            </div>
          </div>

          {/* Project Carousel */}
          <div className="technic-module p-5 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="section-label">Component Inventory</div>
              <Link
                to="/projects"
                className="font-mono text-xs text-primary/50 hover:text-primary transition-colors duration-200 uppercase tracking-wider"
              >
                All Projects →
              </Link>
            </div>
            <div
              className={`relative h-56 transition-opacity duration-500 ${
                isPowerEngaged ? 'opacity-100' : 'opacity-30'
              }`}
              aria-label="Project carousel"
            >
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project, i) => {
                  const angle = ((carouselAngle + (i / featuredProjects.length) * 360) % 360);
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.sin(rad) * 130;
                  const y = -Math.cos(rad) * 50;
                  const z = Math.cos(rad);
                  return (
                    <div
                      key={project.id}
                      style={{
                        position: 'absolute',
                        left: `calc(50% + ${x}px - 55px)`,
                        top: `calc(50% + ${y}px - 35px)`,
                        zIndex: Math.round(z * 10 + 10),
                        opacity: Math.max(0.2, 0.5 + z * 0.5),
                        transform: `scale(${Math.max(0.7, 0.85 + z * 0.15)})`,
                        transition: 'opacity 0.1s, transform 0.1s',
                      }}
                    >
                      <Link
                        to={`/projects/${project.id}`}
                        className="block w-[110px] border-2 border-primary bg-background rounded-2xl p-2.5 hover:bg-faint transition-colors duration-200"
                        style={{ boxShadow: `${2 + z * 2}px ${2 + z * 2}px 0px 0px #031632` }}
                        tabIndex={z > 0 ? 0 : -1}
                      >
                        <div className="font-mono text-xs text-primary/40 uppercase mb-1">
                          {project.year}
                        </div>
                        <div className="font-heading font-bold text-primary text-xs leading-tight line-clamp-2">
                          {project.title}
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-xs text-primary/30 uppercase tracking-wider">
                    No projects loaded
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Home;

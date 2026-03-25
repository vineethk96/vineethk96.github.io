import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, User } from 'lucide-react';
import FaderSwitch from '../components/ui/fader-switch';
import { PERSONAL_INFO, SOCIAL_LINKS, PROJECTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { useGitHubData } from '../hooks/useGitHubData';
import ContributionOscilloscope from '../components/ui/ContributionOscilloscope';
import { ThreeDPhotoCarousel } from '../components/ui/ThreeDCarousel';

const GITHUB_USERNAME = 'vineethk96';


const TelemetryModule = ({ label, value, unit, isActive, isError = false }) => {
  const [displayValue, setDisplayValue] = useState('—');
  const isAnimatingRef = useRef(false);
  const timerRef       = useRef(null);
  const displayRef     = useRef('—');

  const setDisplay = (v) => {
    displayRef.current = String(v);
    setDisplayValue(String(v));
  };

  // Boot / shutdown animation — only triggers on isActive toggle
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isActive) {
      // Aborted mid-boot: snap off immediately
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        setDisplay('—');
        return;
      }

      // Shutdown animation from current display
      const snapshot = displayRef.current;
      if (snapshot === '—') return;

      const numVal    = parseFloat(snapshot);
      const isNumeric = !isNaN(numVal);
      isAnimatingRef.current = true;

      if (isNumeric) {
        const hasDecimal = snapshot.includes('.');
        let step = 0;
        const STEPS = 36;
        timerRef.current = setInterval(() => {
          step++;
          const t   = step / STEPS;
          const cur = numVal * (1 - Math.pow(t, 3)); // ease-in
          setDisplay(hasDecimal ? cur.toFixed(1) : String(Math.round(cur)));
          if (step >= STEPS) {
            clearInterval(timerRef.current);
            isAnimatingRef.current = false;
            setDisplay('—');
          }
        }, 33);
      } else {
        const str = snapshot;
        const n   = str.length;
        let step  = 0;
        timerRef.current = setInterval(() => {
          step++;
          setDisplay(str.slice(0, n - step) + '-'.repeat(Math.min(step, n)));
          if (step >= n) {
            clearInterval(timerRef.current);
            isAnimatingRef.current = false;
            setDisplay('—');
          }
        }, 80);
      }
      return;
    }

    // Boot animation
    isAnimatingRef.current = true;
    const numVal    = parseFloat(value);
    const isNumeric = !isNaN(numVal) && value !== '';

    if (isNumeric) {
      const hasDecimal = String(value).includes('.');
      let step = 0;
      const STEPS = 36;
      timerRef.current = setInterval(() => {
        step++;
        const t     = step / STEPS;
        const eased = 1 - Math.pow(1 - t, 3);
        const cur   = numVal * eased;
        setDisplay(hasDecimal ? cur.toFixed(1) : String(Math.round(cur)));
        if (step >= STEPS) {
          clearInterval(timerRef.current);
          isAnimatingRef.current = false;
          setDisplay(String(value));
        }
      }, 33);
    } else {
      const str = String(value);
      const n   = str.length;
      let step  = 0;
      setDisplay('-'.repeat(n));
      timerRef.current = setInterval(() => {
        step++;
        setDisplay('-'.repeat(n - step) + str.slice(n - step));
        if (step >= n) {
          clearInterval(timerRef.current);
          isAnimatingRef.current = false;
        }
      }, 80);
    }

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live value pass-through (after boot animation completes)
  useEffect(() => {
    if (isActive && !isAnimatingRef.current) {
      setDisplay(String(value));
    }
  }, [value, isActive]);

  return (
    <div className="technic-module p-4">
      <div className="section-label">{label}</div>
      <div className="flex items-end gap-1.5 mt-1">
        <span className={`font-mono font-bold text-2xl transition-colors duration-500 ${
          isActive ? (isError ? 'text-danger' : 'text-accent') : 'text-primary/30'
        }`}>
          {displayValue}
        </span>
        {unit && isActive && (
          <span className="font-mono text-xs text-primary/50 mb-1">{unit}</span>
        )}
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={`inline-block w-3 h-3 rounded-full transition-all duration-500 ${
            isActive
              ? isError ? 'bg-danger led-indicator-error' : 'bg-success led-indicator'
              : 'bg-danger led-indicator-off'
          }`}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">
          {isActive ? (isError ? 'No Signal' : 'Online') : 'Standby'}
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const [isPowerEngaged, setIsPowerEngaged] = useState(false);
  const { track } = useAnalytics();
  const { isOnline, connectionLabel, downlink, uptimePercent } = useConnectionStatus();
  const { weeklyCommits, currentStreak, ongoingProjectsCount, contributionsByDay } = useGitHubData();

  const featuredProjects = (PROJECTS || []).slice(0, 6);

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
              value={connectionLabel}
              unit={downlink != null ? `${downlink} Mbps` : ''}
              isActive={isPowerEngaged}
              isError={!isOnline}
            />
            <TelemetryModule
              label="System Uptime"
              value={uptimePercent}
              unit="%"
              isActive={isPowerEngaged}
            />
            <TelemetryModule
              label="Ongoing Projects"
              value={ongoingProjectsCount ?? '—'}
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
            <ContributionOscilloscope
              data={contributionsByDay}
              isPowered={isPowerEngaged}
              weeklyCommits={weeklyCommits}
            />
            <div className="mt-2 flex items-center gap-4 font-mono text-xs text-primary/50">
              <span>
                Commits (7d):&nbsp;
                <span className="text-accent">
                  {isPowerEngaged ? (weeklyCommits ?? '—') : '—'}
                </span>
              </span>
              <span className="text-primary/20">|</span>
              <span>
                Streak:&nbsp;
                <span className="text-accent">
                  {isPowerEngaged && currentStreak != null ? `${currentStreak}d` : '—'}
                </span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-block w-3 h-3 rounded-full transition-all duration-500 ${
                  isPowerEngaged ? 'bg-success led-indicator' : 'bg-danger led-indicator-off'
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
              className={`relative transition-opacity duration-500 ${
                isPowerEngaged ? 'opacity-100' : 'opacity-30'
              }`}
              aria-label="Project carousel"
            >
              <ThreeDPhotoCarousel projects={featuredProjects} isPowered={isPowerEngaged} />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <span
                className={`inline-block w-3 h-3 rounded-full transition-all duration-500 ${
                  isPowerEngaged ? 'bg-success led-indicator' : 'bg-danger led-indicator-off'
                }`}
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-primary/40 uppercase tracking-wider">
                {isPowerEngaged ? 'System Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default Home;

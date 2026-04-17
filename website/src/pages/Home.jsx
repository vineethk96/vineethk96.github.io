import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, ExternalLink, User, ChevronDown } from 'lucide-react';
import FaderSwitch from '../components/ui/fader-switch';
import { PERSONAL_INFO, SOCIAL_LINKS, PROJECTS } from '../data/constants';
import { useAnalytics } from '../hooks/useAnalytics';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import { useGitHubData } from '../hooks/useGitHubData';
import ContributionOscilloscope from '../components/ui/ContributionOscilloscope';
import { ThreeDPhotoCarousel } from '../components/ui/ThreeDCarousel';

const GITHUB_USERNAME = 'vineethk96';


const TelemetryModule = ({ label, value, unit, secondValue, secondUnit, isActive, isError = false }) => {
  const [displayValue, setDisplayValue] = useState('—');
  const isAnimatingRef = useRef(false);
  const timerRef       = useRef(null);
  const displayRef     = useRef('—');

  const [displaySecondValue, setDisplaySecondValue] = useState('—');
  const isAnimating2Ref = useRef(false);
  const timer2Ref       = useRef(null);
  const display2Ref     = useRef('—');

  const setDisplay = (v) => {
    displayRef.current = String(v);
    setDisplayValue(String(v));
  };

  const setDisplay2 = (v) => {
    display2Ref.current = String(v);
    setDisplaySecondValue(String(v));
  };

  // Boot / shutdown animation for primary value — only triggers on isActive toggle
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (!isActive) {
      if (isAnimatingRef.current) {
        isAnimatingRef.current = false;
        setDisplay('—');
        return;
      }

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
          const cur = numVal * (1 - Math.pow(t, 3));
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

  // Boot / shutdown animation for secondary value (always numeric)
  useEffect(() => {
    if (secondValue === undefined) return;
    if (timer2Ref.current) clearInterval(timer2Ref.current);

    if (!isActive) {
      if (isAnimating2Ref.current) {
        isAnimating2Ref.current = false;
        setDisplay2('—');
        return;
      }

      const snapshot = display2Ref.current;
      if (snapshot === '—') return;

      const numVal = parseFloat(snapshot);
      if (isNaN(numVal)) { setDisplay2('—'); return; }

      const hasDecimal = snapshot.includes('.');
      isAnimating2Ref.current = true;
      let step = 0;
      const STEPS = 36;
      timer2Ref.current = setInterval(() => {
        step++;
        const t   = step / STEPS;
        const cur = numVal * (1 - Math.pow(t, 3));
        setDisplay2(hasDecimal ? cur.toFixed(1) : String(Math.round(cur)));
        if (step >= STEPS) {
          clearInterval(timer2Ref.current);
          isAnimating2Ref.current = false;
          setDisplay2('—');
        }
      }, 33);
      return;
    }

    // Boot: if no data yet, show — without animating
    if (secondValue === null || secondValue === undefined) {
      setDisplay2('—');
      return;
    }

    const numVal     = parseFloat(secondValue);
    const hasDecimal = String(secondValue).includes('.');
    isAnimating2Ref.current = true;
    let step = 0;
    const STEPS = 36;
    timer2Ref.current = setInterval(() => {
      step++;
      const t     = step / STEPS;
      const eased = 1 - Math.pow(1 - t, 3);
      const cur   = numVal * eased;
      setDisplay2(hasDecimal ? cur.toFixed(1) : String(Math.round(cur)));
      if (step >= STEPS) {
        clearInterval(timer2Ref.current);
        isAnimating2Ref.current = false;
        setDisplay2(String(secondValue));
      }
    }, 33);

    return () => { if (timer2Ref.current) clearInterval(timer2Ref.current); };
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live value pass-through (after boot animation completes)
  useEffect(() => {
    if (isActive && !isAnimatingRef.current) {
      setDisplay(String(value));
    }
  }, [value, isActive]);

  useEffect(() => {
    if (secondValue === undefined) return;
    if (isActive && !isAnimating2Ref.current) {
      setDisplay2(secondValue !== null ? String(secondValue) : '—');
    }
  }, [secondValue, isActive]);

  const hasDualValues = secondValue !== undefined;

  return (
    <div className="technic-module p-4">
      <div className="section-label">{label}</div>
      {hasDualValues ? (
        <div className="flex items-end gap-4 mt-1">
          <span className={`font-mono font-bold text-2xl transition-colors duration-500 ${
            isActive ? (isError ? 'text-danger-text' : 'text-accent') : 'text-primary-muted'
          }`}>
            {displayValue}
          </span>
          <span className="font-mono font-bold text-2xl text-primary">/</span>
          <div className="flex items-end gap-1.5">
            <span className={`font-mono font-bold text-2xl transition-colors duration-500 ${
              isActive ? (isError ? 'text-danger-text' : 'text-accent') : 'text-primary-muted'
            }`}>
              {displaySecondValue}
            </span>
            {secondUnit && (
              <span className="font-mono text-xs text-primary-muted mb-1">{secondUnit}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-end gap-1.5 mt-1">
          <span className={`font-mono font-bold text-2xl transition-colors duration-500 ${
            isActive ? (isError ? 'text-danger-text' : 'text-accent') : 'text-primary-muted'
          }`}>
            {displayValue}
          </span>
          {unit && (
            <span className="font-mono text-xs text-primary-muted mb-1">{unit}</span>
          )}
        </div>
      )}
      <div className="flex items-center gap-1.5 mt-2">
        <span
          className={`inline-block w-3 h-3 rounded-full transition-all duration-500 ${
            isActive
              ? isError ? 'bg-danger led-indicator-error' : 'bg-success led-indicator'
              : 'bg-danger led-indicator-off'
          }`}
          aria-hidden="true"
        />
        <span className="font-mono text-xs text-primary-muted uppercase tracking-wider">
          {isActive ? (isError ? 'No Signal' : 'Online') : 'Standby'}
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const [isPowerEngaged, setIsPowerEngaged] = useState(
    () => localStorage.getItem('faderPowerEngaged') === 'true'
  );
  const { track } = useAnalytics();
  const { isOnline, connectionLabel, downlink, uptimePercent } = useConnectionStatus();
  const { weeklyCommits, currentStreak, ongoingProjectsCount, contributionsByDay } = useGitHubData();

  const featuredProjects = (PROJECTS || []).slice(0, 6);

  const handlePowerToggle = (next) => {
    const value = typeof next === 'boolean' ? next : !isPowerEngaged;
    setIsPowerEngaged(value);
    localStorage.setItem('faderPowerEngaged', value);
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

        {/* === MOBILE HERO (hidden on md+) === */}
        <div className="flex md:hidden flex-col items-center justify-between min-h-[calc(100vh-7rem)] py-8">
          {/* Centered photo card */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl" />
              <div className="relative w-64 h-80 border-[3px] border-primary rounded-xl overflow-hidden flex flex-col bg-primary/5">
                <div className="flex-1 relative group overflow-hidden bg-faint">
                  <div className="absolute inset-0 flex items-center justify-center text-primary/20 pointer-events-none">
                    <User className="w-20 h-20" aria-hidden="true" />
                  </div>
                  <img
                    src={PERSONAL_INFO?.headshotUrl || "/headshot.jpg"}
                    alt="Vineeth Kirandumkara"
                    className="w-full h-full object-cover brightness-100"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
                    <div className="w-5 h-1 bg-accent" />
                    <div className="w-3 h-1 bg-accent" />
                  </div>
                  <div className="absolute top-2 right-2 bg-accent px-1.5 py-0.5 rounded text-[8px] font-mono font-black text-primary pointer-events-none">
                    OP_01
                  </div>
                </div>
                <div className="bg-primary px-3 py-2 flex justify-between items-center">
                  <span className="text-[9px] font-mono font-black tracking-widest text-background/70 uppercase">
                    System_Architect_ID
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Name + tagline */}
          <div className="w-full">
            <h1 className="font-heading font-bold text-5xl text-primary leading-none mb-3 tracking-tight shadow-accent-fluid">
              {PERSONAL_INFO?.name || 'Vineeth_Kirandumkara'}
            </h1>
            <p className="font-mono text-sm text-primary-sub uppercase tracking-widest">
              {PERSONAL_INFO?.tagline || 'IoT Systems Engineer & Product Designer'}
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center animate-bounce text-primary/50 mt-6">
            <ChevronDown className="w-8 h-8" aria-hidden="true" />
          </div>
        </div>

        {/* === HERO NAME TITLE (hidden on mobile) === */}
        <h1 className="hidden md:block font-heading font-bold text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-primary leading-none mb-4 tracking-tight shadow-accent-fluid">
          {PERSONAL_INFO?.name || 'Vineeth_Kirandumkara'}
        </h1>

        <p className="hidden md:block font-mono text-sm sm:text-xl text-primary-sub uppercase tracking-widest mb-8">
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

                {/* Headshot — hidden on mobile (shown in mobile hero above) */}
                <div className="hidden md:block relative flex-shrink-0">
                  {/* Chunky shadow offset */}
                  <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-xl" />

                  {/* Photo container */}
                  <div className="relative w-44 h-52 border-[3px] border-primary rounded-xl overflow-hidden flex flex-col bg-primary/5">

                    {/* Image area */}
                    <div className="flex-1 relative group overflow-hidden bg-faint">
                      {/* Fallback user icon — rendered first so img paints on top */}
                      <div className="absolute inset-0 flex items-center justify-center text-primary/20 pointer-events-none">
                        <User className="w-16 h-16" aria-hidden="true" />
                      </div>

                      <img
                        src={PERSONAL_INFO?.headshotUrl || "/headshot.jpg"}
                        alt="Vineeth Kirandumkara"
                        className="w-full h-full object-cover brightness-100"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />

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

                  <p className="font-body text-primary-sub leading-relaxed max-w-lg">
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
              secondValue={downlink}
              secondUnit="Mbps"
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
              unit=""
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
                className="flex items-center gap-1.5 font-mono text-xs text-primary-muted hover:text-primary transition-colors duration-200"
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
            <div className="mt-2 flex items-center gap-4 font-mono text-xs text-primary-muted">
              <span>
                Commits (7d):&nbsp;
                <span className="text-accent">
                  {isPowerEngaged ? (weeklyCommits ?? '—') : '—'}
                </span>
              </span>
              <span className="text-primary-muted">|</span>
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
              <span className="font-mono text-xs text-primary-muted uppercase tracking-wider">
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
                className="font-mono text-xs text-primary-muted hover:text-primary transition-colors duration-200 uppercase tracking-wider"
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
              <span className="font-mono text-xs text-primary-muted uppercase tracking-wider">
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

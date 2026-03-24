import React, { useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const SCREEN_W = 480;
const SCREEN_H = 280;
const PAD_X = 20;
const PAD_Y = 20;

const OFF_BG = '#f0eee9';
const ON_BG = '#122a2a';
const OFF_GRID = '#dcdad4';
const ON_GRID = '#1d4d4a';
const TRACE_COLOR = '#33ffcc';

// Graticule: 8 columns × 7 rows
const GRID_COLS = 8;
const GRID_ROWS = 7;

function getMax(data) {
  return (!data || data.length === 0) ? 1 : Math.max(...data, 1);
}

function buildSteppedPath(data) {
  if (!data || data.length === 0) return '';
  const max = getMax(data);
  const xStep = (SCREEN_W - PAD_X * 2) / data.length;
  const traceH = SCREEN_H - PAD_Y * 2;
  const baseY = SCREEN_H - PAD_Y;
  let d = `M ${PAD_X} ${baseY}`;
  data.forEach((val, i) => {
    const x = PAD_X + i * xStep;
    const y = baseY - (val / max) * traceH;
    d += ` H ${x} V ${y}`;
  });
  d += ` H ${SCREEN_W - PAD_X} V ${baseY}`;
  return d;
}

function YAxisLabels({ max, color }) {
  const labels = [];
  for (let r = 0; r <= GRID_ROWS; r++) {
    const y = PAD_Y + (r / GRID_ROWS) * (SCREEN_H - PAD_Y * 2);
    const value = Math.round(((GRID_ROWS - r) / GRID_ROWS) * max);
    labels.push(
      <text
        key={r}
        x={PAD_X - 3}
        y={y + 3}
        fontSize="7"
        fill={color}
        fontFamily="'Courier New', monospace"
        textAnchor="end"
        opacity="0.7"
      >
        {value}
      </text>
    );
  }
  return <g>{labels}</g>;
}

function GraticuleLines({ color }) {
  const lines = [];
  // Horizontal lines
  for (let r = 0; r <= GRID_ROWS; r++) {
    const y = PAD_Y + (r / GRID_ROWS) * (SCREEN_H - PAD_Y * 2);
    lines.push(
      <line key={`h${r}`} x1={PAD_X} y1={y} x2={SCREEN_W - PAD_X} y2={y}
        stroke={color} strokeWidth="0.5" strokeDasharray={r === 0 || r === GRID_ROWS ? 'none' : '3 4'} />
    );
  }
  // Vertical lines
  for (let c = 0; c <= GRID_COLS; c++) {
    const x = PAD_X + (c / GRID_COLS) * (SCREEN_W - PAD_X * 2);
    lines.push(
      <line key={`v${c}`} x1={x} y1={PAD_Y} x2={x} y2={SCREEN_H - PAD_Y}
        stroke={color} strokeWidth="0.5" strokeDasharray={c === 0 || c === GRID_COLS ? 'none' : '3 4'} />
    );
  }
  // Tick marks along center lines
  const midX = PAD_X + (SCREEN_W - PAD_X * 2) / 2;
  const midY = PAD_Y + (SCREEN_H - PAD_Y * 2) / 2;
  for (let r = 0; r <= GRID_ROWS * 5; r++) {
    const y = PAD_Y + (r / (GRID_ROWS * 5)) * (SCREEN_H - PAD_Y * 2);
    lines.push(
      <line key={`tx${r}`} x1={midX - 2} y1={y} x2={midX + 2} y2={y}
        stroke={color} strokeWidth="0.5" />
    );
  }
  for (let c = 0; c <= GRID_COLS * 5; c++) {
    const x = PAD_X + (c / (GRID_COLS * 5)) * (SCREEN_W - PAD_X * 2);
    lines.push(
      <line key={`ty${c}`} x1={x} y1={midY - 2} x2={x} y2={midY + 2}
        stroke={color} strokeWidth="0.5" />
    );
  }
  return <g>{lines}</g>;
}

export default function ContributionOscilloscope({ data, isPowered, weeklyCommits }) {
  const bgControls = useAnimation();
  const graticuleControls = useAnimation();
  const traceControls = useAnimation();
  const flashControls = useAnimation();

  const tracePath = buildSteppedPath(data || []);

  // Boot/shutdown visual sequence (bg, graticule, flash) — fires on power state change
  useEffect(() => {
    if (isPowered) {
      flashControls.start({ opacity: [1, 0], transition: { duration: 0.1 } });
      bgControls.start({ fill: ON_BG, transition: { duration: 0.3, delay: 0.05 } });
      graticuleControls.start({ opacity: 1, transition: { duration: 0.4, delay: 0.2 } });
    } else {
      // Shutdown
      traceControls.start({ pathLength: 0, opacity: 0, transition: { duration: 0.2 } });
      graticuleControls.start({ opacity: 0, transition: { duration: 0.2 } });
      bgControls.start({ fill: OFF_BG, transition: { duration: 0.3, delay: 0.15 } });
    }
  }, [isPowered, bgControls, graticuleControls, traceControls, flashControls]);

  // Trace animation — fires when powered AND path data is available (handles API race condition)
  useEffect(() => {
    if (isPowered && tracePath) {
      traceControls.start({ pathLength: 1, opacity: 1, transition: { duration: 1.2, delay: 0.4, ease: 'easeOut' } });
    }
  }, [isPowered, tracePath, traceControls]);

  return (
    <div
      className="rounded-sm"
      style={{ background: '#d1cdc5', padding: '6px' }}
    >
      <div
        className="rounded-sm"
        style={{ background: '#8e8981', padding: '3px' }}
      >
        <div className="relative overflow-hidden rounded-sm">
          {/* Main SVG screen */}
          <svg
            viewBox={`0 0 ${SCREEN_W} ${SCREEN_H}`}
            className="w-full h-auto block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="phosphor-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Screen background */}
            <motion.rect
              x="0" y="0"
              width={SCREEN_W} height={SCREEN_H}
              initial={{ fill: OFF_BG }}
              animate={bgControls}
            />

            {/* Graticule */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={graticuleControls}
            >
              <GraticuleLines color={ON_GRID} />
              <YAxisLabels max={getMax(data)} color={TRACE_COLOR} />
            </motion.g>

            {/* OFF-state faint graticule */}
            {!isPowered && <GraticuleLines color={OFF_GRID} />}

            {/* Trace */}
            <motion.path
              d={tracePath}
              stroke={TRACE_COLOR}
              strokeWidth="1.5"
              fill="none"
              filter="url(#phosphor-glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={traceControls}
            />

            {/* Digital dash — top left */}
            {isPowered && (
              <text
                x="8" y="14"
                fontSize="10"
                fill={TRACE_COLOR}
                fontFamily="'Courier New', monospace"
                opacity="0.85"
              >
                {`\u0394V1 = ${weeklyCommits ?? '--'}V`}
              </text>
            )}

            {/* Digital dash — bottom center */}
            {isPowered && (
              <text
                x={SCREEN_W / 2} y={SCREEN_H - 6}
                fontSize="10"
                fill={TRACE_COLOR}
                fontFamily="'Courier New', monospace"
                textAnchor="middle"
                opacity="0.85"
              >
                AVERAGE 50ms
              </text>
            )}
          </svg>

          {/* CRT scanlines overlay */}
          {isPowered && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
              }}
            />
          )}

          {/* Boot flash overlay */}
          <AnimatePresence>
            {isPowered && (
              <motion.div
                key="flash"
                className="absolute inset-0 bg-white pointer-events-none"
                initial={{ opacity: 1 }}
                animate={flashControls}
                exit={{ opacity: 0 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

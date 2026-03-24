import React, { useState, useRef, useEffect, useCallback } from 'react';

const ACTIVATION_THRESHOLD = 98;
const NUM_TICKS = 11; // 3 major (positions 0, 5, 10), 8 minor

export default function FaderSwitch({ checked, onChange, standbyLabel = 'ENGAGE POWER', activeLabel = 'SYSTEM ACTIVE' }) {
  const [percent, setPercent] = useState(checked ? 100 : 0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  const hasMoved = useRef(false);
  const isDraggingRef = useRef(false);

  // Sync visual position when external checked prop changes
  useEffect(() => {
    setPercent(checked ? 100 : 0);
  }, [checked]);

  const updatePosition = useCallback((newPercent) => {
    const clamped = Math.max(0, Math.min(newPercent, 100));
    setPercent(clamped);
    return clamped;
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    hasMoved.current = false;
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      hasMoved.current = true;
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      updatePosition((x / rect.width) * 100);
    };

    const onMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      if (hasMoved.current) {
        setPercent(prev => {
          const snapped = prev >= ACTIVATION_THRESHOLD ? 100 : 0;
          onChange(snapped === 100);
          return snapped;
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onChange, updatePosition]);

  const handleClick = () => {
    if (!hasMoved.current) {
      const newChecked = percent < ACTIVATION_THRESHOLD;
      setPercent(newChecked ? 100 : 0);
      onChange(newChecked);
    }
  };

  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    hasMoved.current = false;
    setIsDragging(true);
  };

  useEffect(() => {
    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      hasMoved.current = true;
      const rect = trackRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.touches[0].clientX - rect.left;
      updatePosition((x / rect.width) * 100);
    };

    const onTouchEnd = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      if (hasMoved.current) {
        setPercent(prev => {
          const snapped = prev >= ACTIVATION_THRESHOLD ? 100 : 0;
          onChange(snapped === 100);
          return snapped;
        });
      } else {
        setPercent(prev => {
          const snapped = prev < ACTIVATION_THRESHOLD ? 100 : 0;
          onChange(snapped === 100);
          return snapped;
        });
      }
    };

    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [onChange, updatePosition]);

  const isActive = percent >= ACTIVATION_THRESHOLD;

  return (
    <div
      className="fader-switch-root"
      role="switch"
      aria-checked={isActive}
      aria-label="System Power Toggle"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          onChange(!checked);
          e.preventDefault();
        }
      }}
    >
      {/* Track row — padded by half knob-width so knob edges align with surrounding content */}
      <div className="fader-row">
        <div className="fader-track" ref={trackRef}>
          {/* Tick marks */}
          <div className="fader-ticks">
            {Array.from({ length: NUM_TICKS }).map((_, i) => (
              <div key={i} className={`fader-tick${i % 5 === 0 ? ' fader-tick--major' : ''}`} />
            ))}
          </div>

          {/* Knob */}
          <div
            className={`fader-knob${isDragging ? ' fader-knob--dragging' : ''}${isActive ? ' fader-knob--active' : ''}`}
            style={{ left: `${percent}%` }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
          >
            <div className="fader-center-line" />
            <div className="fader-ridges">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="fader-ridge" />
              ))}
            </div>
          </div>
        </div>
        <div className={`fader-led${isActive ? ' fader-led--active' : ''}`} />
      </div>

      {/* Status row: left label flush with container edge, right label flush right */}
      <div className="fader-status-row">
        <div className="fader-status-label">Slide to Enable Power</div>
        <div className="fader-status-label">System Active</div>
      </div>
    </div>
  );
}

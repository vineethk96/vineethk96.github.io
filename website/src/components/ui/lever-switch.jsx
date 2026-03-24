import React, { useId } from 'react';
import { cn } from '../../lib/utils';

const LeverSwitch = ({
  checked = false,
  onChange,
  label = 'Power Switch',
  activeLabel = 'ACTIVE',
  standbyLabel = 'STANDBY',
  className,
}) => {
  const switchId = useId();

  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <div
      className={cn('lever-switch-root', className)}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      tabIndex={0}
      onClick={() => onChange(!checked)}
      onKeyDown={handleKeyDown}
    >
      <input
        id={switchId}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        tabIndex={-1}
        aria-hidden="true"
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
      />

      <div className={cn('lever-track', checked && 'lever-track--on')}>
        <div className={cn('lever-arm', checked && 'lever-arm--on')}>
          <div className="lever-rod" />
          <div className="lever-knob" />
        </div>
      </div>

      <span
        className={cn('lever-label', checked ? 'lever-label--on' : 'lever-label--off')}
        aria-live="polite"
      >
        {checked ? activeLabel : standbyLabel}
      </span>
    </div>
  );
};

export default LeverSwitch;

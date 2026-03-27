import { useState, useEffect, useRef } from 'react';

const getConn = () =>
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;

const buildLabel = () => {
  if (!navigator.onLine) return 'Offline';
  const conn = getConn();
  if (!conn) return 'Established';
  if (conn.type === 'wifi') return 'Wi-Fi';
  if (conn.type === 'ethernet') return 'Ethernet';
  if (conn.type === 'cellular') return (conn.effectiveType || '4g').toUpperCase();
  if (conn.effectiveType) return conn.effectiveType.toUpperCase();
  return 'Established';
};

export const useConnectionStatus = () => {
  const [isOnline, setIsOnline]           = useState(navigator.onLine);
  const [connectionLabel, setLabel]       = useState(buildLabel);
  const [downlink, setDownlink]           = useState(() => getConn()?.downlink ?? null);
  const [uptimePercent, setUptimePercent] = useState('100.0');

  const sessionStart  = useRef(Date.now());
  const onlineMsRef   = useRef(0);
  const lastOnlineRef = useRef(navigator.onLine ? Date.now() : null);

  useEffect(() => {
    const refresh = () => {
      setLabel(buildLabel());
      setDownlink(getConn()?.downlink ?? null);
    };

    const handleOnline = () => {
      setIsOnline(true);
      lastOnlineRef.current = Date.now();
      refresh();
    };

    const handleOffline = () => {
      setIsOnline(false);
      if (lastOnlineRef.current !== null) {
        onlineMsRef.current += Date.now() - lastOnlineRef.current;
        lastOnlineRef.current = null;
      }
      refresh();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const conn = getConn();
    conn?.addEventListener('change', refresh);

    const timer = setInterval(() => {
      const now      = Date.now();
      const total    = now - sessionStart.current;
      const onlineMs = onlineMsRef.current +
        (lastOnlineRef.current !== null ? now - lastOnlineRef.current : 0);
      const pct = total > 0 ? Math.min(100, (onlineMs / total) * 100) : 100;
      setUptimePercent(pct.toFixed(1));
    }, 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      conn?.removeEventListener('change', refresh);
      clearInterval(timer);
    };
  }, []);

  return { isOnline, connectionLabel, downlink, uptimePercent };
};

/**
 * Color mapping for system map relationship types.
 * Shared between SystemMap.js (canvas) and SystemMapD3.js (SVG).
 */
export const RELATIONSHIP_COLORS = {
  'research-application': '#6366f1',
  'iot-platform': '#10b981',
  'embedded-evolution': '#f59e0b',
  'sensor-system': '#8b5cf6',
  'mobile-app': '#06b6d4',
  'rest-api': '#f97316',
  'cloud-architecture': '#10b981',
  'systems-thinking': '#ef4444'
};

/** Returns the color for a given relationship type, with a neutral fallback. */
export const getRelationshipColor = (relationship) =>
  RELATIONSHIP_COLORS[relationship] || '#64748b';

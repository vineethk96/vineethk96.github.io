import React, { useCallback, useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { motion } from 'framer-motion';

const SystemMap = () => {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Project data with connections
  const graphData = {
    nodes: [
      {
        id: 'anemometer',
        name: 'Smart Ultrasonic Anemometer',
        category: 'iot-sensor',
        description: 'IoT wind measurement system with real-time data processing',
        technologies: ['Arduino', 'IoT', 'Cloud', 'Sensors'],
        color: '#3b82f6',
        size: 8
      },
      {
        id: 'gesture',
        name: 'Gesture Recognizer',
        category: 'ml-embedded',
        description: 'ML-powered gesture recognition using flex sensors',
        technologies: ['ML', 'Sensors', 'Embedded', 'Arduino'],
        color: '#8b5cf6',
        size: 7
      },
      {
        id: 'hotstone',
        name: 'Hot Stone IoT',
        category: 'iot-design',
        description: 'Tactile warmth-sharing device for emotional connections',
        technologies: ['IoT', 'Design', 'Prototyping', 'ESP32'],
        color: '#f59e0b',
        size: 6
      },
      {
        id: 'traveler',
        name: 'Traveler App',
        category: 'mobile-cloud',
        description: 'Flutter travel app with cloud backend',
        technologies: ['Flutter', 'Supabase', 'Maps API', 'Mobile'],
        color: '#10b981',
        size: 7
      },
      {
        id: 'lumos',
        name: 'Lumos Lighting',
        category: 'iot-control',
        description: 'MQTT smart lighting with intuitive controls',
        technologies: ['MQTT', 'Smart Home', 'Sensors', 'ESP32'],
        color: '#f59e0b',
        size: 6
      },
      {
        id: 'dissertation',
        name: 'Turbulent Spaces',
        category: 'research',
        description: 'Urban IoT research for smart city applications',
        technologies: ['Research', 'Urban IoT', 'Architecture', 'Scalability'],
        color: '#6366f1',
        size: 9
      },
      {
        id: 'ieee-robot',
        name: 'IEEE Autonomous Robot',
        category: 'embedded-systems',
        description: 'Autonomous robot for IEEE competition',
        technologies: ['Embedded', 'Robotics', 'C++', 'Sensors'],
        color: '#ef4444',
        size: 6
      },
      {
        id: 'vehicle-app',
        name: 'Vehicle Browser App',
        category: 'mobile-cloud',
        description: 'iOS app with AWS backend for vehicle browsing',
        technologies: ['iOS', 'AWS', 'Swift', 'REST API'],
        color: '#06b6d4',
        size: 5
      }
    ],
    links: [
      // IoT ecosystem connections
      { source: 'anemometer', target: 'dissertation', relationship: 'research-application' },
      { source: 'hotstone', target: 'dissertation', relationship: 'research-application' },
      { source: 'lumos', target: 'hotstone', relationship: 'iot-platform' },
      { source: 'anemometer', target: 'lumos', relationship: 'iot-platform' },
      
      // Technology evolution
      { source: 'ieee-robot', target: 'gesture', relationship: 'embedded-evolution' },
      { source: 'gesture', target: 'anemometer', relationship: 'sensor-progression' },
      { source: 'vehicle-app', target: 'traveler', relationship: 'mobile-evolution' },
      
      // System architecture connections
      { source: 'traveler', target: 'dissertation', relationship: 'cloud-architecture' },
      { source: 'vehicle-app', target: 'ieee-robot', relationship: 'systems-thinking' }
    ]
  };

  // Handle node click
  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    // Focus camera on node
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 1000);
      fgRef.current.zoom(2, 1000);
    }
  }, []);

  // Handle background click
  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
    if (fgRef.current) {
      fgRef.current.zoomToFit(1000);
    }
  }, []);

  // Custom node rendering
  const nodeCanvasObject = useCallback((node, ctx, globalScale) => {
    const label = node.name;
    const fontSize = 12/globalScale;
    ctx.font = `${fontSize}px Inter, sans-serif`;
    
    // Node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.color;
    ctx.fill();
    
    // Node border
    ctx.strokeStyle = selectedNode?.id === node.id ? '#ffffff' : 'rgba(255,255,255,0.3)';
    ctx.lineWidth = selectedNode?.id === node.id ? 3/globalScale : 1/globalScale;
    ctx.stroke();
    
    // Label
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y + node.size + 2, bckgDimensions[0], bckgDimensions[1]);
    
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(label, node.x, node.y + node.size + 2 + bckgDimensions[1] / 2);
  }, [selectedNode]);

  // Custom link rendering
  const linkCanvasObject = useCallback((link, ctx) => {
    const start = link.source;
    const end = link.target;
    
    // Calculate link color based on relationship
    const relationshipColors = {
      'research-application': '#6366f1',
      'iot-platform': '#10b981',
      'embedded-evolution': '#f59e0b',
      'sensor-progression': '#8b5cf6',
      'mobile-evolution': '#06b6d4',
      'cloud-architecture': '#10b981',
      'systems-thinking': '#ef4444'
    };
    
    ctx.strokeStyle = relationshipColors[link.relationship] || '#64748b';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('system-map-container');
      if (container) {
        setDimensions({
          width: container.offsetWidth,
          height: Math.max(600, window.innerHeight - 300)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="relative">
      {/* Graph Container */}
      <div 
        id="system-map-container"
        className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeCanvasObject={nodeCanvasObject}
          linkCanvasObject={linkCanvasObject}
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          cooldownTicks={100}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          enableNodeDrag={true}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          backgroundColor="transparent"
        />
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 max-w-sm"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedNode.color }}
              />
              <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {selectedNode.description}
          </p>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedNode.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
        <p className="text-sm">
          Click on nodes to explore projects • Drag to rearrange • Scroll to zoom • Click background to reset
        </p>
      </div>
    </div>
  );
};

export default SystemMap;

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

const SystemMapD3 = () => {
  const svgRef = useRef();
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
      { source: 'anemometer', target: 'dissertation', relationship: 'research-application' },
      { source: 'hotstone', target: 'dissertation', relationship: 'research-application' },
      { source: 'lumos', target: 'hotstone', relationship: 'iot-platform' },
      { source: 'anemometer', target: 'lumos', relationship: 'iot-platform' },
      { source: 'ieee-robot', target: 'gesture', relationship: 'embedded-evolution' },
      { source: 'gesture', target: 'anemometer', relationship: 'sensor-progression' },
      { source: 'vehicle-app', target: 'traveler', relationship: 'mobile-evolution' },
      { source: 'traveler', target: 'dissertation', relationship: 'cloud-architecture' },
      { source: 'vehicle-app', target: 'ieee-robot', relationship: 'systems-thinking' }
    ]
  };

  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

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

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    // Create simulation
    const simulation = d3.forceSimulation(graphData.nodes)
      .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(d => d.size * 3));

    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke", d => {
        const relationshipColors = {
          'research-application': '#6366f1',
          'iot-platform': '#10b981',
          'embedded-evolution': '#f59e0b',
          'sensor-progression': '#8b5cf6',
          'mobile-evolution': '#06b6d4',
          'cloud-architecture': '#10b981',
          'systems-thinking': '#ef4444'
        };
        return relationshipColors[d.relationship] || '#64748b';
      })
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .attr("opacity", 0.6);

    // Create nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .join("g")
      .style("cursor", "pointer")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    // Add circles to nodes
    node.append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    // Add labels to nodes
    node.append("text")
      .text(d => d.name)
      .attr("dy", d => d.size + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("font-weight", "500")
      .attr("fill", "currentColor")
      .style("pointer-events", "none");

    // Add click handlers
    node.on("click", (event, d) => {
      event.stopPropagation();
      handleNodeClick(d);
    });

    svg.on("click", handleBackgroundClick);

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [dimensions, handleNodeClick, handleBackgroundClick]);

  return (
    <div className="relative">
      {/* Graph Container */}
      <div 
        id="system-map-container"
        className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full"
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
          Click on nodes to explore projects • Drag to rearrange • Click background to reset
        </p>
      </div>
    </div>
  );
};

export default SystemMapD3;

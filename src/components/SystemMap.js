import React, { useCallback, useRef, useEffect, useState } from 'react';
import { ForceGraph2D } from 'react-force-graph';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, SYSTEM_MAP_LINKS } from '../data/constants';

const SystemMap = () => {
  const navigate = useNavigate();
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Generate graph data from centralized projects
  const graphData = {
    nodes: PROJECTS.filter(project => project.title && project.map_color).map(project => ({
      id: project.id,
      name: project.title,
      category: project.category,
      description: project.description,
      technologies: project.technologies,
      color: project.map_color,
      size: project.size
    })),
    links: SYSTEM_MAP_LINKS.filter(link => {
      // Only include links where both source and target nodes exist
      const nodeIds = PROJECTS.filter(p => p.title && p.map_color).map(p => p.id);
      return nodeIds.includes(link.source) && nodeIds.includes(link.target);
    })
  };

  // Handle node click
  const handleNodeClick = useCallback((node) => {
    setSelectedNode(node);
    // Navigate to project detail page
    navigate(`/projects/${node.id}`);
  }, [navigate]);

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
      'sensor-system': '#8b5cf6',
      'mobile-app': '#06b6d4',
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
          onNodeClick={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
          cooldownTicks={200}
          d3AlphaDecay={0.01}
          d3VelocityDecay={0.4}
          d3ReheatSimulation={false}
          d3ForceConfig={{
            charge: { strength: -80, distanceMax: 150 },
            link: { distance: 40, strength: 0.8 },
            center: { x: 0.5, y: 0.5, strength: 0.05 },
            collision: { radius: 15, strength: 0.7 }
          }}
          nodeRelSize={4}
          warmupTicks={100}
          onNodeDrag={(node) => {
            // Constrain node position during drag to container bounds (with 25px buffer)
            const { width, height } = dimensions;
            const nodeRadius = node.size || 20;
            const buffer = 25;
            const minX = buffer + nodeRadius;
            const maxX = width - buffer - nodeRadius;
            const minY = buffer + nodeRadius;
            const maxY = height - buffer - nodeRadius;
            node.x = Math.max(minX, Math.min(maxX, node.x));
            node.y = Math.max(minY, Math.min(maxY, node.y));
          }}
          linkWidth={link => 2}
          linkColor={link => {
            const relationshipColors = {
              'research-application': '#6366f1',
              'iot-platform': '#10b981',
              'embedded-evolution': '#f59e0b',
              'sensor-progression': '#8b5cf6',
              'mobile-evolution': '#06b6d4',
              'cloud-architecture': '#10b981',
              'systems-thinking': '#ef4444'
            };
            return relationshipColors[link.relationship] || '#64748b';
          }}
          linkLineDash={[5, 5]}
          linkDirectionalParticles={0}
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

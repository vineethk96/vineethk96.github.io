# SystemMap Component Documentation

The SystemMap is an interactive network visualization that displays projects and their relationships. It uses D3.js physics simulation to create a dynamic, draggable node network.

## 🎯 Overview

The SystemMap component visualizes your portfolio projects as connected nodes, showing relationships between different technologies, project evolution, and system architectures.

## 📁 Files

- `src/components/SystemMap.js` - React Force Graph implementation
- `src/components/SystemMapD3.js` - Pure D3.js implementation
- `src/data/constants.js` - Data source for projects and connections

## 🎮 Interactive Features

### Node Interactions
- **Click**: Select a node to view project details
- **Drag**: Move nodes around with physics simulation
- **Hover**: Highlight connections and show tooltips

### Physics Simulation
- **Repulsion**: Nodes push away from each other
- **Attraction**: Connected nodes are drawn together
- **Collision**: Prevents nodes from overlapping
- **Centering**: Keeps the network centered in the container

## 🔧 Configuration

### Force Parameters (SystemMapD3.js)

```javascript
const simulation = d3.forceSimulation(graphData.nodes)
  .force("link", d3.forceLink(graphData.links).id(d => d.id).distance(20))
  .force("charge", d3.forceManyBody().strength(-10))  // Repulsion strength
  .force("center", d3.forceCenter(width / 2, height / 2))
  .force("collision", d3.forceCollide().radius(d => d.size * 3));
```

### Adjustable Parameters

| Parameter | Description | Effect |
|-----------|-------------|--------|
| `distance(20)` | Link length | Shorter = tighter clusters |
| `strength(-10)` | Node repulsion | More negative = stronger repulsion |
| `radius(d.size * 3)` | Collision radius | Larger = more spacing |

### Container Bounds
- **25px buffer** from container edges
- **Node radius** accounted for in positioning
- **Drag constraints** prevent nodes from leaving visible area

## 📊 Data Structure

### Project Node Properties
```javascript
{
  id: 'unique-identifier',
  title: 'Display Name',
  category: 'project-type',
  technologies: ['Tech1', 'Tech2'],
  map_color: '#hexcolor',  // Node color
  size: 8                 // Node radius
}
```

### Connection Properties
```javascript
{
  source: 'project-id-1',
  target: 'project-id-2',
  relationship: 'connection-type'
}
```

## 🎨 Relationship Types & Colors

| Relationship | Color | Description |
|--------------|-------|-------------|
| `research-application` | `#6366f1` | Research to practical application |
| `iot-platform` | `#10b981` | IoT ecosystem connections |
| `embedded-evolution` | `#f59e0b` | Hardware/embedded progression |
| `sensor-system` | `#8b5cf6` | Sensor technology relationships |
| `mobile-app` | `#06b6d4` | Mobile application connections |
| `systems-thinking` | `#ef4444` | System architecture relationships |

## 🛠 Adding New Features

### Custom Relationship Types
1. Add new relationship to `SYSTEM_MAP_LINKS` in `constants.js`
2. Add color mapping in both SystemMap components:

```javascript
const relationshipColors = {
  'your-new-relationship': '#your-color',
  // ... existing relationships
};
```

### Node Styling
Modify node appearance in `SystemMapD3.js`:

```javascript
// Add circles to nodes
node.append("circle")
  .attr("r", d => d.size)
  .attr("fill", d => d.color)
  .attr("stroke", "#fff")
  .attr("stroke-width", 2);
```

### Animation Effects
Adjust simulation behavior:

```javascript
// Drag start - reactivate simulation
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}
```

## 🐛 Troubleshooting

### Common Issues

**Nodes clustering together**
- Increase repulsion: `.strength(-50)` (more negative)
- Increase link distance: `.distance(50)`

**Nodes drifting off screen**
- Check buffer calculations in drag constraints
- Verify container dimensions are set correctly

**Links not appearing**
- Ensure both source and target nodes exist in PROJECTS array
- Verify nodes have required `map_color` property
- Check link filtering logic in graph data generation

**Performance issues**
- Reduce number of simulation ticks
- Simplify collision detection
- Limit number of nodes/links

### Debug Mode
Add console logging to track simulation:

```javascript
simulation.on("tick", () => {
  console.log("Simulation tick", simulation.alpha());
  // ... position updates
});
```

## 🎯 Best Practices

### Data Management
- Keep project data in `constants.js`
- Use consistent `id` naming (lowercase, hyphenated)
- Ensure all connected projects have `map_color` property

### Performance
- Limit to ~20 nodes for optimal performance
- Use appropriate force strengths for your data size
- Consider debouncing resize events

### Visual Design
- Use contrasting colors for different relationship types
- Maintain consistent node sizing relative to importance
- Ensure sufficient color contrast for accessibility

## 🚀 Future Enhancements

### Potential Features
- **Zoom/Pan**: Add zoom controls for large networks
- **Filtering**: Show/hide nodes by category or technology
- **Clustering**: Group related nodes automatically
- **Timeline**: Animate project evolution over time
- **Search**: Find and highlight specific projects
- **Export**: Save network as image or data file

### Implementation Ideas
```javascript
// Zoom behavior
const zoom = d3.zoom()
  .scaleExtent([0.1, 3])
  .on("zoom", (event) => {
    svg.selectAll("g").attr("transform", event.transform);
  });

svg.call(zoom);
```

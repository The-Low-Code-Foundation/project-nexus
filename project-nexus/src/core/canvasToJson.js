/**
 * Converts the React Flow canvas state into a JSON structure
 * that can be used to generate a Next.js application
 */

/**
 * Main function to convert canvas state to JSON configuration
 * @param {Object} nodes - Array of React Flow nodes
 * @param {Object} edges - Array of React Flow edges
 * @returns {Object} JSON configuration for Next.js generation
 */
export function canvasToJson(nodes, edges) {
  // Start with default metadata
  const json = {
    metadata: {
      title: "Generated App",
      description: "App created with Visual Low-Code Builder",
      version: "1.0.0"
    },
    nodes: [],
    edges: [],
    events: {}
  };

  // First, find the root page node (should always exist)
  const pageNode = nodes.find(node => node.type === 'page');
  if (!pageNode) {
    throw new Error('Canvas must contain a page node');
  }

  // Build the node hierarchy
  json.nodes = buildNodeHierarchy(nodes, edges);

  // Extract any events (like onClick handlers)
  json.events = extractEvents(nodes);

  // Add edge connections
  json.edges = edges.map(edge => ({
    source: edge.source,
    target: edge.target
  }));

  return json;
}

/**
 * Builds a hierarchical structure of nodes based on their connections
 * @param {Array} nodes - Array of React Flow nodes
 * @param {Array} edges - Array of React Flow edges
 * @returns {Array} Hierarchical array of nodes with their props
 */
function buildNodeHierarchy(nodes, edges) {
  return nodes.map(node => {
    const nodeJson = {
      id: node.id,
      type: node.type,
      props: convertNodePropsToJson(node.data),
      position: {
        x: node.position.x,
        y: node.position.y
      }
    };

    // Find child nodes connected to this node
    const childEdges = edges.filter(edge => edge.source === node.id);
    if (childEdges.length > 0) {
      nodeJson.children = childEdges.map(edge => {
        const childNode = nodes.find(n => n.id === edge.target);
        return childNode ? childNode.id : null;
      }).filter(id => id !== null);
    }

    return nodeJson;
  });
}

/**
 * Converts node data/props into a clean JSON structure
 * @param {Object} data - Node data from React Flow
 * @returns {Object} Clean props object for JSON
 */
function convertNodePropsToJson(data) {
  const props = {};

  switch (data.type) {
    case 'text':
      props.content = data.content || 'Sample Text';
      if (data.style) props.style = data.style;
      break;

    case 'button':
      props.label = data.label || 'Click Me';
      if (data.onClick) props.onClick = data.onClick;
      if (data.style) props.style = data.style;
      break;

    case 'div':
      if (data.style) props.style = data.style;
      break;

    // Add more component types as needed
  }

  return props;
}

/**
 * Extracts event handlers from nodes
 * @param {Array} nodes - Array of React Flow nodes
 * @returns {Object} Map of event handlers
 */
function extractEvents(nodes) {
  const events = {};

  nodes.forEach(node => {
    if (node.data?.onClick) {
      // Create a unique event handler name if none exists
      const handlerName = node.data.onClick || `handle${node.id}Click`;
      events[handlerName] = node.data.onClickCode || "() => {}";
    }
  });

  return events;
}

/**
 * Validates the JSON structure before export
 * @param {Object} json - Generated JSON configuration
 * @returns {boolean} True if valid, throws error if invalid
 */
export function validateJson(json) {
  if (!json.nodes || !Array.isArray(json.nodes)) {
    throw new Error('JSON must contain an array of nodes');
  }

  if (!json.nodes.some(node => node.type === 'page')) {
    throw new Error('JSON must contain a page node');
  }

  return true;
}

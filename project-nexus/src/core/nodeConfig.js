/**
 * Configuration for all available node types in the Visual Low-Code App Builder
 */

// Default styles for different node types
const nodeStyles = {
  page: {
    padding: '16px',
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
  },
  div: {
    padding: '8px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'column',
  },
  text: {
    margin: '4px 0',
    fontSize: '16px',
    color: '#333333',
  },
  button: {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1976d2',
    color: '#ffffff',
    cursor: 'pointer',
  },
};

// Node type definitions
export const nodeTypes = {
  page: {
    type: 'page',
    label: 'Page',
    acceptsChildren: true,
    isRoot: true,
    defaultProps: {
      style: nodeStyles.page,
    },
    allowedChildren: ['div', 'text', 'button'],
  },
  div: {
    type: 'div',
    label: 'Div',
    acceptsChildren: true,
    defaultProps: {
      style: nodeStyles.div,
    },
    allowedChildren: ['div', 'text', 'button'],
  },
  text: {
    type: 'text',
    label: 'Text',
    acceptsChildren: false,
    defaultProps: {
      content: 'Sample Text',
      style: nodeStyles.text,
    },
  },
  button: {
    type: 'button',
    label: 'Button',
    acceptsChildren: false,
    defaultProps: {
      label: 'Click Me',
      style: nodeStyles.button,
      onClick: 'handleClick',
    },
  },
};

// Helper functions for node validation and creation
export const nodeHelpers = {
  /**
   * Check if a node type can accept children
   */
  canAcceptChildren: (nodeType) => {
    return nodeTypes[nodeType]?.acceptsChildren || false;
  },

  /**
   * Get allowed child types for a node
   */
  getAllowedChildren: (nodeType) => {
    return nodeTypes[nodeType]?.allowedChildren || [];
  },

  /**
   * Create a new node instance with default props
   */
  createNode: (type, id, position = { x: 0, y: 0 }) => {
    const nodeConfig = nodeTypes[type];
    if (!nodeConfig) return null;

    return {
      id,
      type,
      position,
      data: {
        ...nodeConfig.defaultProps,
        label: nodeConfig.label,
      },
    };
  },

  /**
   * Validate if a child node can be nested under a parent node
   */
  isValidChild: (parentType, childType) => {
    const parent = nodeTypes[parentType];
    if (!parent || !parent.acceptsChildren) return false;
    return parent.allowedChildren?.includes(childType) || false;
  },
};

// Export default node configurations
export default {
  types: nodeTypes,
  helpers: nodeHelpers,
  styles: nodeStyles,
};

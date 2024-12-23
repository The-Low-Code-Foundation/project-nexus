/**
 * Converts canvas JSON structure into Next.js application files
 */

/**
 * Generates the main index.js file content from canvas JSON
 * @param {Object} json - The canvas JSON configuration
 * @returns {string} - The content of pages/index.js
 */
export function generateIndexFile(json) {
  return `import { useState } from 'react';

export default function App() {
  ${generateEventHandlers(json.events)}
  
  return (
    ${generateJSXFromNode(json.nodes[0])}
  );
}`;
}

/**
 * Generates event handler functions from the events object
 * @param {Object} events - Object containing event handler definitions
 * @returns {string} - JavaScript code for event handlers
 */
function generateEventHandlers(events = {}) {
  return Object.entries(events)
    .map(([name, code]) => `const ${name} = () => { ${code} };`)
    .join('\n  ');
}

/**
 * Recursively generates JSX from a node and its children
 * @param {Object} node - Node object from the canvas
 * @returns {string} - JSX string representation
 */
function generateJSXFromNode(node) {
  if (!node) return '';

  const props = generateProps(node.props);
  const children = node.children?.map(child => generateJSXFromNode(child)).join('\n') || '';

  switch (node.type) {
    case 'page':
      return `<div ${props}>${children}</div>`;
    
    case 'div':
      return `<div ${props}>${children}</div>`;
    
    case 'text':
      return `<p ${props}>${node.props?.content || ''}</p>`;
    
    case 'button':
      return `<button ${props}>${node.props?.label || 'Click Me'}</button>`;
    
    default:
      return '';
  }
}

/**
 * Converts node props object into JSX props string
 * @param {Object} props - Node properties
 * @returns {string} - JSX props string
 */
function generateProps(props = {}) {
  const propsArray = [];

  // Handle style props
  if (props.style) {
    const styleString = Object.entries(props.style)
      .map(([key, value]) => `${key}: "${value}"`)
      .join(', ');
    propsArray.push(`style={{${styleString}}}`);
  }

  // Handle event handlers
  if (props.onClick) {
    propsArray.push(`onClick={${props.onClick}}`);
  }

  // Handle other props
  Object.entries(props).forEach(([key, value]) => {
    if (key !== 'style' && key !== 'onClick' && key !== 'content' && key !== 'label') {
      propsArray.push(`${key}="${value}"`);
    }
  });

  return propsArray.length ? propsArray.join(' ') : '';
}

/**
 * Generates package.json content for the exported app
 * @returns {string} - JSON string for package.json
 */
export function generatePackageJson() {
  return JSON.stringify(
    {
      name: "generated-app",
      version: "1.0.0",
      private: true,
      scripts: {
        dev: "next dev",
        build: "next build",
        start: "next start"
      },
      dependencies: {
        next: "latest",
        react: "latest",
        "react-dom": "latest"
      }
    },
    null,
    2
  );
}

/**
 * Generates global styles for the app
 * @returns {string} - Content for styles/globals.css
 */
export function generateGlobalStyles() {
  return `
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}
`;
}

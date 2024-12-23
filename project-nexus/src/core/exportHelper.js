import JSZip from 'jszip';

/**
 * Converts the canvas JSON into a Next.js project and returns a zip file
 * @param {Object} json - The canvas state in JSON format
 * @returns {Promise<Blob>} - A zip file containing the Next.js project
 */
export async function exportNextJsProject(json) {
  const zip = new JSZip();

  // Add the main application file
  zip.file("pages/index.js", generateIndexFile(json));
  
  // Add package.json
  zip.file("package.json", generatePackageFile());
  
  // Add README
  zip.file("README.md", generateReadmeFile());

  return zip.generateAsync({ type: "blob" });
}

/**
 * Generates the index.js file content from the JSON structure
 * @param {Object} json - The canvas state
 * @returns {string} - The content of index.js
 */
function generateIndexFile(json) {
  const imports = `import React from 'react';\n\n`;
  const componentCode = generateComponentCode(json.nodes);
  
  return `${imports}export default function App() {
  return (
    ${componentCode}
  );
}\n`;
}

/**
 * Recursively generates React components from JSON nodes
 * @param {Array} nodes - Array of node objects
 * @returns {string} - JSX string representation
 */
function generateComponentCode(nodes) {
  if (!nodes || nodes.length === 0) return '';

  return nodes.map(node => {
    switch (node.type) {
      case 'page':
        return `<div className="page">${generateComponentCode(node.children)}</div>`;
      case 'div':
        const style = node.props?.style ? ` style={${JSON.stringify(node.props.style)}}` : '';
        return `<div${style}>${generateComponentCode(node.children)}</div>`;
      case 'text':
        return `<p>${node.props?.content || 'Sample Text'}</p>`;
      case 'button':
        const onClick = node.props?.onClick ? 
          `\n  onClick={() => ${sanitizeCode(node.props.onClick)}}` : '';
        return `<button${onClick}>${node.props?.label || 'Click Me'}</button>`;
      default:
        return '';
    }
  }).join('\n    ');
}

/**
 * Generates the package.json file content
 * @returns {string} - The content of package.json
 */
function generatePackageFile() {
  const packageJson = {
    name: "generated-app",
    version: "1.0.0",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    dependencies: {
      "next": "latest",
      "react": "latest",
      "react-dom": "latest"
    }
  };

  return JSON.stringify(packageJson, null, 2);
}

/**
 * Generates a basic README file
 * @returns {string} - The content of README.md
 */
function generateReadmeFile() {
  return `# Generated Next.js Application

This is a [Next.js](https://nextjs.org/) project generated using the Visual Low-Code App Builder.

## Getting Started

First, install the dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
`;
}

/**
 * Helper function to sanitize JavaScript code
 * @param {string} code - The code to sanitize
 * @returns {string} - Sanitized code
 */
function sanitizeCode(code) {
  // Remove any potentially harmful code patterns
  return code.replace(/[^\w\s().{}]/g, '');
}

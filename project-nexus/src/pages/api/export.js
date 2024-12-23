import JSZip from 'jszip';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { nodes, edges } = req.body;

    // Create a new zip file
    const zip = new JSZip();

    // Generate the Next.js project files
    zip.file('pages/index.js', generateIndexFile(nodes));
    zip.file('package.json', generatePackageJson());
    zip.file('README.md', generateReadme());

    // Generate the zip file
    const zipContent = await zip.generateAsync({ type: 'nodebuffer' });

    // Set response headers for file download
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=next-app.zip');
    
    // Send the zip file
    res.send(zipContent);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Error generating export' });
  }
}

function generateIndexFile(nodes) {
  // Convert nodes into React components
  const components = generateComponentsFromNodes(nodes);

  return `import React from 'react';

export default function App() {
  return (
    ${components}
  );
}`;
}

function generateComponentsFromNodes(nodes) {
  // Start with the page node (root)
  const pageNode = nodes.find(node => node.type === 'page');
  if (!pageNode) return '<div />';

  return generateNodeJsx(pageNode, nodes);
}

function generateNodeJsx(node, allNodes) {
  switch (node.type) {
    case 'page':
      const children = allNodes.filter(n => n.parentId === node.id);
      const childrenJsx = children.map(child => generateNodeJsx(child, allNodes)).join('\n      ');
      return `<div className="page">
      ${childrenJsx}
    </div>`;

    case 'div':
      const divChildren = allNodes.filter(n => n.parentId === node.id);
      const divChildrenJsx = divChildren.map(child => generateNodeJsx(child, allNodes)).join('\n      ');
      return `<div ${generateStyles(node.data?.style)}>
      ${divChildrenJsx}
    </div>`;

    case 'text':
      return `<p ${generateStyles(node.data?.style)}>${node.data?.content || ''}</p>`;

    case 'button':
      return `<button ${generateStyles(node.data?.style)}>${node.data?.label || 'Click Me'}</button>`;

    default:
      return '';
  }
}

function generateStyles(style = {}) {
  if (!Object.keys(style).length) return '';
  const styleString = Object.entries(style)
    .map(([key, value]) => `${key}: '${value}'`)
    .join(', ');
  return `style={{ ${styleString} }}`;
}

function generatePackageJson() {
  return JSON.stringify({
    name: "generated-app",
    version: "1.0.0",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start"
    },
    dependencies: {
      "next": "latest",
      "react": "latest",
      "react-dom": "latest"
    }
  }, null, 2);
}

function generateReadme() {
  return `# Generated Next.js App

This app was generated using the Visual Low-Code App Builder.

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.
`;
}

'use client';

import { Box } from '@mui/material';
import { Node } from 'reactflow';

interface PreviewProps {
  nodes: Node[];
}

export default function Preview({ nodes }: PreviewProps) {
  const renderComponent = (node: Node) => {
    switch (node.type) {
      case 'div':
        return (
          <div
            key={node.id}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              margin: '5px'
            }}
          >
            {node.data.label}
          </div>
        );
      case 'text':
        return (
          <p
            key={node.id}
            style={{ margin: '5px' }}
          >
            {node.data.content || 'Sample Text'}
          </p>
        );
      case 'button':
        return (
          <button
            key={node.id}
            style={{
              margin: '5px',
              padding: '8px 16px'
            }}
          >
            {node.data.label || 'Click Me'}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: '100%', 
      border: '1px solid #ddd',
      borderRadius: 1,
      overflow: 'auto',
      padding: 2,
      bgcolor: 'white'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {nodes.map(renderComponent)}
      </div>
    </Box>
  );
}

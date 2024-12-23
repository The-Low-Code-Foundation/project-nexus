'use client';

import { Box } from '@mui/material';
import dynamic from 'next/dynamic';
import Sidebar from '../components/Sidebar';
import Preview from '../components/Preview';
import { useCallback, useState } from 'react';
import { Node, applyNodeChanges, NodeChange } from 'reactflow';

// Dynamically import ReactFlow to avoid SSR issues
const Canvas = dynamic(() => import('../components/Canvas'), {
  ssr: false
});

export default function HomePage() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'page',
      type: 'div',
      data: { label: 'Page' },
      position: { x: 250, y: 5 },
    },
  ]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      return updatedNodes;
    });
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '100vh',
      overflow: 'hidden'
    }}>
      <Sidebar />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1, 
        height: '100%',
        overflow: 'hidden'
      }}>
        <Box sx={{ flexGrow: 1, height: '50%' }}>
          <Canvas 
            nodes={nodes}
            edges={[]}
            onNodesChange={onNodesChange}
          />
        </Box>
        <Box sx={{ height: '50%', p: 2 }}>
          <Preview nodes={nodes} />
        </Box>
      </Box>
    </Box>
  );
}

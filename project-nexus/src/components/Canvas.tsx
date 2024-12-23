import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  NodeProps,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  NodeChange,
  Edge,
  DragEndEvent,
  OnNodesChange,
  NodeDragHandler,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node types
const nodeTypes = {
  div: ({ data }: NodeProps) => (
    <div style={{ padding: '10px', border: '1px solid #ddd', background: 'white' }}>
      {data.label}
    </div>
  ),
  text: ({ data }: NodeProps) => <p>{data.content || 'Sample Text'}</p>,
  button: ({ data }: NodeProps) => (
    <button onClick={() => alert('Button clicked!')}>
      {data.label || 'Click Me'}
    </button>
  ),
};

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
}

export default function Canvas({ nodes, edges, onNodesChange }: CanvasProps) {
  const onConnect = useCallback(
    (params: Connection) => {
      // You might want to lift this state management to the parent component
      console.log('Connection attempted:', params);
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the position relative to the page container
      const pageNode = nodes.find(n => n.id === 'page');
      if (!pageNode) return;

      const position = {
        x: event.clientX - pageNode.position.x - 240, // Adjust for sidebar width
        y: event.clientY - pageNode.position.y,
      };

      // Create new node with appropriate type and data
      const newNode: Node = {
        id: `${type}-${nodes.length + 1}`,
        type,
        position,
        data: { 
          label: type.charAt(0).toUpperCase() + type.slice(1),
          content: type === 'text' ? 'Sample Text' : undefined,
        },
        // Ensure new nodes are draggable and connectable
        draggable: true,
        connectable: true,
      };

      onNodesChange([{
        type: 'add',
        item: newNode
      }]);
    },
    [nodes, onNodesChange]
  );

  const handleDragEnd: NodeDragHandler = (event, node) => {
    // Get the element being dragged
    const draggedElement = document.querySelector(`[data-id="${node.id}"]`);
    if (!draggedElement) return;
    
    const draggedRect = draggedElement.getBoundingClientRect();
    
    // Find potential target nodes that overlap
    const potentialTargets = nodes.filter(targetNode => {
      if (targetNode.id === node.id) return false;
      
      const targetElement = document.querySelector(`[data-id="${targetNode.id}"]`);
      if (!targetElement) return false;
      
      const targetRect = targetElement.getBoundingClientRect();
      return checkOverlap(draggedRect, targetRect);
    });

    if (potentialTargets.length > 0) {
      const targetNode = potentialTargets[0]; // Use the first overlapping target
      
      // Find existing children of the target node
      const existingChildren = nodes.filter(n => n.parentNode === targetNode.id);
      const totalHeight = existingChildren.reduce((sum, child) => {
        const el = document.querySelector(`[data-id="${child.id}"]`);
        return sum + (el?.getBoundingClientRect().height || 0);
      }, 0);

      // Calculate new Y position based on existing children
      const newY = totalHeight + 20; // 20px padding between elements

      onNodesChange([
        {
          type: 'remove',
          id: node.id,
        },
        {
          type: 'add',
          item: {
            ...node,
            parentNode: targetNode.id,
            position: { x: 20, y: newY },
            extent: 'parent',
          }
        }
      ]);
    }
  };

  // Helper function to check if elements overlap significantly
  const checkOverlap = (rect1: DOMRect, rect2: DOMRect) => {
    const overlapArea = Math.max(0,
      Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left)
    ) * Math.max(0,
      Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top)
    );
    
    const rect1Area = rect1.width * rect1.height;
    const overlapPercentage = overlapArea / rect1Area;
    
    return overlapPercentage > 0.5; // Require 50% overlap
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={() => {}}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeDragStop={handleDragEnd}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

import { Handle, Position } from 'reactflow';

interface Element {
  id: string;
  content?: string;
  children?: Element[];
  // Add other properties your element might have
}

const ElementRenderer = ({ element }: { element: Element }) => {
  return (
    <div data-id={element.id} className="relative">
      {/* Render the element itself as a node */}
      <div className="node-container">
        <Handle 
          type="target" 
          position={Position.Top} 
          id={`${element.id}-target`}
        />
        
        <div className="node-content">
          {element.content}
        </div>

        <Handle 
          type="source" 
          position={Position.Bottom} 
          id={`${element.id}-source`}
        />
      </div>
      
      {/* Render children if they exist */}
      {element.children?.map((child) => (
        <ElementRenderer key={child.id} element={child} />
      ))}
    </div>
  );
};

export default ElementRenderer;

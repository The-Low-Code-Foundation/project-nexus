import { Box, Button } from '@mui/material';

const components = [
  { type: 'div', label: 'Div' },
  { type: 'text', label: 'Text' },
  { type: 'button', label: 'Button' },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Box sx={{ 
      width: 240, 
      borderRight: '1px solid #ddd', 
      padding: 2,
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}>
      {components.map(({ type, label }) => (
        <Button
          key={type}
          variant="outlined"
          draggable
          onDragStart={(event) => onDragStart(event, type)}
          sx={{ 
            textTransform: 'none',
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' }
          }}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
}

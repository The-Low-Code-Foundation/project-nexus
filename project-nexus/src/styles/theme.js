import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  // Custom palette colors
  palette: {
    primary: {
      main: '#2196f3', // Blue for primary actions
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057', // Pink for secondary actions
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
      canvas: '#f5f5f5', // Light grey for the canvas background
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },

  // Typography settings
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Prevents automatic uppercase transformation
    },
  },

  // Component-specific overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    // Specific styles for the canvas area
    MuiBox: {
      styleOverrides: {
        root: {
          '&.canvas-container': {
            backgroundColor: '#f5f5f5',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: 8,
          },
        },
      },
    },
  },

  // Custom spacing
  spacing: 8,

  // Shape configurations
  shape: {
    borderRadius: 8,
  },
});

export default theme;

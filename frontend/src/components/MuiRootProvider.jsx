import React from 'react';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

/**
 * 1. Emotion Cache Setup
 * This is CRUCIAL for deployment consistency. It creates a client-side cache 
 * instance that ensures the order of CSS injection and the generation of 
 * hashed class names (like css-xxxxxx) are predictable and consistent 
 * between development and production builds.
 */
const clientSideEmotionCache = createCache({ key: 'mui' });

// 2. Custom Theme (Optional, but good practice)
// Ensures all MUI components have a unified theme context, which is necessary
// for responsive components like MuiGrid to calculate breakpoints (md-6, xs-12).
const theme = createTheme({
  // You can customize your theme here.
  // Example to ensure typography respects your global font:
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  }
});

/**
 * MuiRootProvider component: 
 * Wraps the entire application with the necessary providers to fix 
 * deployment inconsistencies for MUI components.
 * * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The root of your application (e.g., <App />).
 */
export default function MuiRootProvider({ children }) {
  
  return (
    // CacheProvider MUST be the outermost wrapper for Emotion consistency
    <CacheProvider value={clientSideEmotionCache}>
      {/* ThemeProvider makes sure all responsive styling is available */}
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

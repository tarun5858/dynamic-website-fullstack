import React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

/**
 * CalculatorRouteWrapper
 * This component is designed to wrap a group of routes (the calculators)
 */
export default function CalculatorRouteWrapper() {
  // Get the current theme from the parent MuiRootProvider context
  // This ensures we use the theme defined in main.jsx
  const theme = useTheme();

  // Outlet renders the nested route element (e.g., MonthlyBudgetCalculator)
  return (
    // Reapplying the ThemeProvider forces MUI to recalculate breakpoints 
    // within this component's subtree.
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}
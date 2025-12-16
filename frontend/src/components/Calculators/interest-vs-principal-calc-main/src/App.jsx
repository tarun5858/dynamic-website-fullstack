import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";
import InterestVsPrincipal from "./InterestVsPrincipal"; // Import your component
import WhatsAppButton from "./Components/whatsappButton";
  import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const location = useLocation();
  const isLargeScreen = useMediaQuery('(min-width:1400px)');
  const isMediumScreen = useMediaQuery('(min-width:1024px) and (max-width:1399px)');
  const [loading, setLoading] = useState(false);

  const sidebarWidth = isLargeScreen ? 280 : isMediumScreen ? 220 : 200; // Dynamic sidebar width

  useEffect(() => {
    // Set loading state whenever the route changes
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Show shimmer effect for 500ms
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App">
      <WhatsAppButton/>
      <Box component="main">
        <Box>
          <Routes>
            <Route path="/" element={<InterestVsPrincipal />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

const Root = () => {
  const theme = createTheme(); // Apply Material UI theme

  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
};

export default Root;
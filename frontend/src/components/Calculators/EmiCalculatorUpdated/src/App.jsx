import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import 'bootstrap/dist/css/bootstrap.min.css';
import WhatsAppButton from "./Components/whatsappButton";

import EmiVsRentCalculator from "./EmiVsRentCalculator";

const App = () => {
  const location = useLocation();
  const isLargeScreen = useMediaQuery('(min-width:1400px)');
  const isMediumScreen = useMediaQuery('(min-width:1024px) and (max-width:1399px)');
  const [loading, setLoading] = useState(false);

  const sidebarWidth = isLargeScreen ? 280 : isMediumScreen ? 220 : 200;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App">
      <WhatsAppButton/>
      <Box component="main">
        <Routes>
          <Route path="/" element={<EmiVsRentCalculator />} />
        </Routes>
      </Box>
    </div>
  );
};

export default App;

// import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Box } from "@mui/material";
import Calculator from "./Calculator";
import WhatsAppButton from "./Components/whatsappButton";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <WhatsAppButton />

      <Box component="main">
        <Box>
          <Routes>
            <Route path="/" element={<Calculator />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;

// import { createRoot } from 'react-dom/client'
import React from 'react';
import { BrowserRouter } from "react-router-dom";

//  STEP 1: MUI/EMOTION PROVIDER IMPORTS (Must be first)
import MuiRootProvider from './components/MuiRootProvider.jsx';
import ReactDOM from 'react-dom/client'
// STEP 2: APPLICATION IMPORTS 
import App from './App.jsx'
// import AnalyticsTracker from './components/AnalyticsTracker.jsx';

import 'bootstrap/dist/js/bootstrap.bundle.min'; // Keep the JS bundle



// createRoot(document.getElementById('root')).render(
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* MuiRootProvider (Emotion Cache/Theme) must wrap everything */}
        <MuiRootProvider> 
            <BrowserRouter>
                {/* <AnalyticsTracker /> */}
                <App />
            </BrowserRouter>
        </MuiRootProvider>
    </React.StrictMode>
)

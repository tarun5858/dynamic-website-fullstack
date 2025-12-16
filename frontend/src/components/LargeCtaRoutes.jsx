// // import React from "react";
// import "../App.css";
// import { Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// // import ReactGA from "react-ga4";
// const LargeCtaRoutes = ({ text, to, style, onClick }) => {

//   //   const handleCtaRoutes = () => {
//   //   // 1. Send the data to Google Analytics
//   //   ReactGA.event({
//   //     category: "User Interaction", // Broad category
//   //     action: "Clicked CtaRoutes",    // Specific action
//   //     label: "Homepage Hero",       // Where it happened (optional)
//   //     value: 1                      // Value associated with event (optional)
//   //   });

//   //   // 2. Perform actual logic (redirect, submit, etc.)
//   //   console.log("User Clicked CtaRoutes");
//   // };

//   const navigate = useNavigate();

//   // Check if the link is external
//     const isExternal = to.startsWith('http://') || to.startsWith('https://');
    
//     const handleNavigationAndTracking = (event) => {
//         // 1. Call the tracking function provided by the parent
//         if (onClick) {
//             onClick(event); // The parent component passes the trackButtonClick function here
//         }
        
//         // 2. Prevent the default Link/Anchor behavior (stopping the immediate redirect)
//         event.preventDefault(); 
        
//         // 3. Wait a very short moment for GTM to process the dataLayer push
//         //    A 50ms delay is usually sufficient for synchronous dataLayer calls.
//         setTimeout(() => {
//             // 4. Manually trigger the navigation after tracking is done
//             navigate(to);
//         }, 50); // Delay execution by 50 milliseconds

//         // Note: For simple synchronous dataLayer push, the preventDefault + setTimeout combo is reliable.
//     };

//   return (
//     <Link
//       className="large-cta theme-btn btn-radius animated"
//       data-animation-in="fadeInRight"
//       data-delay-in="0.9"
//       to={to}
//       style={style}
//       onClick={handleNavigationAndTracking}
//     >
//       {text}
//     </Link>
//   );
// };
// export default LargeCtaRoutes;



import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// import ReactGA from "react-ga4"; // Unused import is fine

const LargeCtaRoutes = ({ text, to, style, onClick, target }) => {

  const navigate = useNavigate();

  // Check if the link is external
  const isExternal = to.startsWith('http://') || to.startsWith('https://');

  // Handler for internal links (uses the delay trick for GTM)
  const handleInternalNavigationAndTracking = (event) => {
    // 1. Call the tracking function provided by the parent
    if (onClick) {
      onClick(event); 
    }
    
    // 2. Prevent the default React Router/Link behavior
    event.preventDefault(); 
    
    // 3. Wait a very short moment for GTM dataLayer push
    setTimeout(() => {
      // 4. Manually trigger internal navigation
      navigate(to);
    }, 50); // Delay execution by 50 milliseconds
  };

  // Handler for external links (fires tracking, then lets the browser handle navigation)
  const handleExternalTracking = () => {
    // 1. Call the tracking function provided by the parent
    if (onClick) {
      onClick(); // Call tracking function
    }
    // 2. The browser automatically handles the 'href' and 'target="_blank"'
    //    The native navigation is reliable and fast enough here.
  };


  // --- CONDITIONAL RENDERING ---

  if (isExternal) {
    //  1. EXTERNAL LINK (e.g., WhatsApp URL)
    return (
      <a
        className="large-cta theme-btn btn-radius animated"
        data-animation-in="fadeInRight"
        data-delay-in="0.9"
        href={to} // Use href instead of 'to'
        target={target || "_blank"} // Ensure it opens in a new tab by default for external links
        style={style}
        onClick={handleExternalTracking} // Use the simpler external handler
      >
        {text}
      </a>
    );
  } else {
    //  2. INTERNAL LINK (e.g., /howitworks) 
    return (
      <Link
        className="large-cta theme-btn btn-radius animated"
        data-animation-in="fadeInRight"
        data-delay-in="0.9"
        to={to}
        style={style}
        onClick={handleInternalNavigationAndTracking} // Use the delayed handler
      >
        {text}
      </Link>
    );
  }
};
export default LargeCtaRoutes;
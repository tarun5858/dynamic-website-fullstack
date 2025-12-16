// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// const GA_MEASUREMENT_ID = 'G-J2LQXQ630G';

// const AnalyticsTracker = () => {
//   const location = useLocation(); 

//   useEffect(() => {
//     if (typeof window.gtag === 'function') {
//       // Send a new page view event whenever the location.pathname changes.
//       // This is crucial for single-page applications (SPAs).
//       window.gtag('event', 'page_view', {
//         page_title: document.title, // You can set custom titles per page if needed
//         page_path: location.pathname + location.search,
//         send_to: GA_MEASUREMENT_ID
//       });  
      
//       console.log(`GA: Page view tracked: ${location.pathname}`);
//     } else {
//       console.warn('GA: window.gtag is not defined. Check index.html implementation.');
//     }
//   }, [location.pathname, location.search]); // Trigger whenever the URL path or search parameters change

//   // This component renders nothing; its sole purpose is side effects (tracking).
//   return null;
// };

// export default AnalyticsTracker;

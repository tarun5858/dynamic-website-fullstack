import React from "react";
import { backgroundImage } from "./Imagepath";
import LargeBlueCta from "./LargeBlueCta";
const PreFooter = () => {
    // 1. Create a function to push the event
const trackButtonClick = (buttonName) => {
  // Check if the dataLayer exists before pushing (safety check)
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'custom_button_click', // <-- 🚨 This is the Custom Event name GTM must listen for
      button_name: buttonName,      // Optional: Pass context like the button name
      page_path: window.location.pathname
    });
    console.log(`DataLayer push: custom_button_click - ${buttonName}`); // For debugging
  }
};

  return (
    <section
      className="why-choice-us section-padding bg-cover "
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="container container-lg">
        <div className="row ">
          <div
            className="col-12 cal-to-action pt-100 pb-100 aos-item footer-section text-left"
            data-aos="flip-up"
          >
            <h2 className="text-white pb-3">Stay Tuned!</h2>
            <p className="text-white pb-4 mt-10 mb-30">
              Be the first to know about our upcoming homes near you!!
            </p>

            <LargeBlueCta text="Join our waitlist" onClick={() => trackButtonClick('Submit Lead Form')}></LargeBlueCta>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PreFooter;

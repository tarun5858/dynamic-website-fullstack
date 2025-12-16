import React from "react";
import { bannerImg } from "../components/Imagepath";
import LargeBlueCta from "../components/LargeBlueCta";
import VideoPlayer from "../components/VideoPlayer";
import Carousel from "../components/Carousel";
import TextImageCard from "../components/TextImageCard";
import componentsData from "../data/componentsData";
import {
  benefitimg1,
  benefitimg2,
  benefitimg3,
  whatweoffer,
  perfectplace,
  worriedabout,
  experienceliving,
} from "../components/Imagepath";
import TextImageSection from "../components/TextImageSection";
import TextImageData from "../data/TextImageData";
import PreFooter from "../components/PreFooter";
import LargeCtaRoutes from "../components/LargeCtaRoutes";

const Home = () => {
  const cardData = componentsData;
  const imageSrc = {
    benefitimg1,
    benefitimg2,
    benefitimg3,
    whatweoffer,
    perfectplace,
    worriedabout,
    experienceliving,
  };

  const data = TextImageData;

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

  // const GA_MEASUREMENT_ID = "G-J2LQXQ630G"; // Your GA ID

  // //   // This function handles both the tracking AND the action (opening modal)
  // const handleWaitlistClick = () => {
  //   // 1. Check if gtag exists and fire the GA event
  //   if (typeof window.gtag === "function") {
  //     window.gtag("event", "cta_click", {
  //       event_category: "lead_generation",
  //       event_label: "homepage_waitlist_cta", // Specific, descriptive label
  //       send_to: GA_MEASUREMENT_ID,
  //     });
  //     console.log("GA: Waitlist CTA Click tracked successfully.");
  //   } else {
  //     console.warn("GA: Tracking failed. window.gtag is not defined.");
  //   }

  //   // 2. Execute the primary action (e.g., open the modal)
  //   // In a real app, you would call your state setter or ref to open the modal here.
  //   // For demonstration, we'll use a console message.
  //   console.log("Action: Opening the waitlist modal now...");
  // };

  //   const handleWaitlistClick = () => {

  //     // 1. Check if dataLayer exists (initialized by the GTM script)
  //     if (typeof window.dataLayer !== 'undefined') {

  //         // Push an 'event' object to the dataLayer.
  //         // The event name ('cta_click') will be used in GTM to trigger the GA tag.
  //         window.dataLayer.push({
  //             event: 'cta_click',

  //             // Send the contextual parameters (no 'send_to' needed)
  //             event_category: 'lead_generation',
  //             event_label: 'homepage_waitlist_cta',

  //             // You can also add non-standard variables for custom dimensions/metrics
  //             // page_location: window.location.href
  //         });

  //         console.log('GTM: Waitlist CTA Click tracked successfully via dataLayer.');
  //     } else {
  //         console.warn('GTM: Tracking failed. window.dataLayer is not defined.');
  //     }

  //     // 2. Execute the primary action (e.g., open the modal)
  //     console.log('Action: Opening the waitlist modal now...');
  // };

  return (
    <>
      <section
        className=" section-padding-home text-md-start"
        style={{ paddingTop: "1%", backgroundColor: "#F7F7F7" }}
      >
        <div className="single-slide">
          <div className="container container-lg">
            <div className="row home-text-img-container">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <div className="hero-contents pe-lg-3 ">
                  <h6>&nbsp;</h6>
                  <h1 className="fs-lg">Redefining homeownership</h1>
                  <p className="sub-head-home">
                    A smarter way to rent, a simpler way to own.
                  </p>
                  <LargeBlueCta
                    text="Join our waitlist"
                    // onClick={handleWaitlistClick}
                    onClick={() => trackButtonClick('Submit Lead Form')}
                  ></LargeBlueCta>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                <img src={bannerImg} alt="" width="100%" height="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=" section-padding text-md-start">
        <div className="container container-lg">
          <div
            className="section-title text-center aos-item"
            data-aos="flip-left"
          >
            <h2 className="text-center">An alternate path to homeownership</h2>
          </div>
          <div className="row my-5">
            <div className="col-12 d-flex justify-content-center text-center">
              <VideoPlayer></VideoPlayer>
            </div>
          </div>
        </div>
        <div className="cta-parent">
          <LargeCtaRoutes text="Learn how" to="/howitworks" onClick={() => trackButtonClick('Learn How CTA')}></LargeCtaRoutes>
        </div>
      </section>

      <section className="about-wrapper1 section-padding container">
        <div className="container container-lg">
          <h2 className="line5 text-center">
            <b>Hear it from the Prehomers</b>
          </h2>
          <Carousel></Carousel>

          <div className="cta-parent d-flex justify-content-center">
            <LargeCtaRoutes
              text="Learn more"
              to="/success-stories"
              onClick={() => trackButtonClick('Learn More CTA')}
            ></LargeCtaRoutes>
          </div>
        </div>
      </section>

      <section className="prehome-benefit-sec">
        <div className="container container-lg">
          <div className=" align-items-center">
            <div className="row">
              <div className="col-12 mb-md-3 mb-sm-0  ">
                <div className=" text-center aos-item" data-aos="fade-down">
                  <h2 className="sec-title-h2 mb-5">The Prehome Benefit</h2>
                  <div className="row d-flex">
                    {cardData.map((data, i) => (
                      <TextImageCard
                        src={imageSrc[data.imageKey]}
                        key={i}
                        subheading={data.subheading}
                        paragraph={data.paragraph}
                      ></TextImageCard>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-wrapper ">
        <div className="container container-lg">
          <div className="row align-items-center  column-reverse ">
            <div
              className="col-xl-12 col-md-12 ps-xl-4 aos-item getpre-cont text-left"
              data-aos="fade-up"
            >
              <div
                className="section-title list-style  "
                data-wow-duration="1500ms"
                data-wow-delay="00ms"
              >
                {data.map((value, i) => (
                  <TextImageSection
                    src={imageSrc[value.imgkey]}
                    key={i}
                    data={value}
                    reverse={value.reverse === "true"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-choice-us">
        <PreFooter></PreFooter>
      </section>
    </>
  );
};
export default Home;

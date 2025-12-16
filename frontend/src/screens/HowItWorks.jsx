import React from "react";
import { useState, useEffect } from "react";

import VideoPlayer from "../components/VideoPlayer";
import HowitworksTextImg from "../components/HowitworksTextImg";
import HowitworksData from "../data/HowitworksData";
import PreFooter from "../components/PreFooter";
import LargeBlueCta from "../components/LargeBlueCta";
import {
  containerImg1,
  containerImg2,
  cardnumber1,
  cardnumber2,
  cardnumber3,
  cardnumber4,
  cardnumber5,
  cardicon1,
  cardicon2,
  cardicon3,
  cardicon4,
  cardicon5,
  logo,
  containerImg1mobile,
  containerImg2mobile,
} from "../components/Imagepath";
const HowItWorks = () => {
  const imageSrc = {
    containerImg1,
    containerImg2,
    cardnumber1,
    cardnumber2,
    cardnumber3,
    cardnumber4,
    cardnumber5,
    cardicon1,
    cardicon2,
    cardicon3,
    cardicon4,
    cardicon5,
    logo,
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // run on load
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    <>
      <section className="about-wrapper ">
        <h2 className="desktop-text">
          Your path to homeownership with Prehome
        </h2>
        <h2 className="mobile-text">Your path to homeownership with Prehome</h2>
        <div className="container container-lg">
          <div className="row my-5">
            <div className="col-12 d-flex justify-content-center text-center">
              <VideoPlayer></VideoPlayer>
            </div>
          </div>
        </div>
      </section>

      <section className="  container mb-50 how-works-margin">
        <div className="container container-lg">
          {HowitworksData.map((value, i) => {
            const imgSrc =
              i % 2 === 0
                ? isMobile
                  ? containerImg1mobile
                  : containerImg1
                : isMobile
                ? containerImg2mobile
                : containerImg2;
            return (
              <div key={i}>
                {i % 2 === 0 ? (
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <img src={imgSrc} alt="Top" />
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <img src={imgSrc} alt="Bottom" />
                    </div>
                  </div>
                )}

                <HowitworksTextImg
                  data={value}
                  srcNumber={imageSrc[value.imgkeyNumber]}
                  srcIcon={imageSrc[value.imgkeyIcon]}
                  reverse={value.reverse === "true"}
                />
              </div>
            );
          })}
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <img
                className="desktop-img-howitwork"
                src={containerImg2}
                alt="Top"
              />
              <img
                className="mobile-img-howitwork text-center"
                src={containerImg2mobile}
                alt="Top"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-xl-2  col-sm-0"></div>

            <div className="col-8 col-sm-8 col-md-7 col-lg-8 col-xl-6    ps-xl-5">
              <div
                className="section-title list-style aos-item "
                data-aos="zoom-in-left"
              >
                <p className="sec-title-p">
                  Your home ownership story matters to us.
                </p>
                <h3 className="footer-h3">Let's write it together.</h3>
              </div>
              <LargeBlueCta
                style={{ width: "70%", height: "62px" }}
                text="Join us"
                onClick={() => trackButtonClick('Submit Lead Form')}
              />
            </div>

            <div className="col-4 col-sm-4 col-md-5  col-lg-4 col-xl-4 justify-content-center">
              <div
                className="about-images   mb-sm-0  aos-item section-title d-flex align-items-center"
                data-aos="zoom-in"
              >
                <img src={logo} alt="" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>

      <PreFooter></PreFooter>
    </>
  );
};
export default HowItWorks;

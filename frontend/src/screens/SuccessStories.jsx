import React from "react";
import { familyImageDesktop, familyImageMobile } from "../components/Imagepath";
import CarouselData from "../data/CarouselData";
import {
  carouselImage1,
  carouselImage2,
  carouselImage3,
  prefooterDesktop,
  prefooterMobile
} from "../components/Imagepath";
import SuccessCard from "../components/SuccessCards";
import PreFooter from "../components/PreFooter";
import { useState,useEffect } from "react";
import LargeCtaRoutes from "../components/LargeCtaRoutes";


const SuccessStories = () => {
  const data = CarouselData;
  const imageSrc = { carouselImage1, carouselImage2, carouselImage3 };

   const [bgImage, setBgImage] = useState(prefooterDesktop);

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage(prefooterMobile);
      } else {
        setBgImage(prefooterDesktop);
      }
    };
       handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <section className=" about-wrapper success-img ">
        <h2 className="success-subhead">The Success Stories</h2>

        <img
          className="main-img-desktop"
          src={familyImageDesktop}
          alt="family-image"
        />
        <img
          className="main-img-mobile"
          src={familyImageMobile}
          alt="family-image"
        />
      </section>

      <section className="about-wrapper1 container mb-0">
        <div className="container container-lg">
          <h2 className="success-subhead mobile-subhead">
            Hear it from the Prehomers
          </h2>
          <div className="container container-lg">
            <div className="row d-flex justify-content-center align-items-center text-img-container-success">
             
              {data.map((value, i) => (
                <SuccessCard
                  src={imageSrc[value.imgKey]}
                  key={i}
                  data={value}
                  reverse={value.reverse === "true"}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pre-footer" >
        <div className="container pre-footer-container text-center" style={{backgroundImage: `url(${bgImage})`, height: "228px",width: "83%",backgroundRepeat:"no-repeat"}}>
            <h1 >Learn how we unlock your path to <br/> homeownership.</h1>
            <div className="header-right-element d-flex align-items-end justify-content-center">     
                  <LargeCtaRoutes text="Learn more"  to="/howitworks" style={{width: "272px",height: "62px",fontSize:"16px"}}></LargeCtaRoutes>
            </div>
        </div>
    </section>

    <PreFooter></PreFooter>
    </>
  );
};
export default SuccessStories;

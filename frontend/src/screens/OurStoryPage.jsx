import OurstoryTextImg from "../components/OurstoryTextImg";
import {
  ourstoryImg1,
  ourstoryImg2,
  ourstoryImg3,
  benefitImg1,
  benefitImg2,
  benefitImg3,
  carouselBackImgDesktop,
  carouselBackImgMobile,
  promiseImage1,
  promiseImage2,
  promiseImage3,
} from "../components/Imagepath";
import { useState, useEffect } from "react";
import OurstoryImgTextCard from "../components/OurstoryImgTextCard";
import OurstoryData from "../data/OursotryData";
import OurStoryCarousel from "../components/OurStoryCarousel";
import OurPromiseCards from "../components/OurPromiseCards";
import PreFooter from "../components/PreFooter";

const OurStoryPage = () => {
  const imgSrc = {
    ourstoryImg1,
    ourstoryImg2,
    ourstoryImg3,
    benefitImg1,
    benefitImg2,
    benefitImg3,
    promiseImage1,
    promiseImage2,
    promiseImage3,
  };

  const [bgImage, setBgImage] = useState(carouselBackImgDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBgImage(carouselBackImgMobile);
      } else {
        setBgImage(carouselBackImgDesktop);
      }
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section>
        {OurstoryData.map((value, i) => (
          <OurstoryTextImg
            data={value}
            key={i}
            src={imgSrc[value.imgkey]}
            reverse={value.reverse === "true"}
          ></OurstoryTextImg>
        ))}
      </section>

      <section className="about-wrapper  section-padding ">
        <h2 className="sec-title-h2 text-center mb-3">India needs Prehome</h2>
        <p className="text-center">
          These statistics represent real people with real dreams being put on
          hold. Prehome was created to change this reality.
        </p>
        <div className="container container-lg mb-5">
          <div className="row align-items-center section-title mt-5">
            {OurstoryData.map((value, i) => (
              <OurstoryImgTextCard
                data={value}
                key={i}
                src={imgSrc[value.cardImage]}
              ></OurstoryImgTextCard>
            ))}
          </div>
        </div>
      </section>

      <section
        className=" section-padding bg-cover Transformative-section"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row align-items-center section-title bg-cover">
            <div className="col-xl-12 col-12 col-md-12">
              <div className="transform-head-cont list-style aos-item wow">
                <h2 className="sec-title-h2 text-center">
                  The Transformative Power of a Home
                </h2>
                <OurStoryCarousel></OurStoryCarousel>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-wrapper  section-padding ">
        <div className="container container-lg mb-5">
          <div className="row align-items-center section-title mt-5">
            <h2 className="sec-title-h2 text-center mb-5">Our Promise</h2>
            {OurstoryData.map((value, i) => (
              <OurPromiseCards
                data={value}
                key={i}
                src={imgSrc[value.promiseImage]}
              ></OurPromiseCards>
            ))}
          </div>
        </div>
      </section>

      <PreFooter></PreFooter>
    </>
  );
};
export default OurStoryPage;

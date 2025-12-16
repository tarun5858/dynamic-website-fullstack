import React from "react";
import {
  carouselImage1,
  carouselImage2,
  carouselImage3,
  carouselIcon,
} from "../components/Imagepath";
import CarouselData from "../data/CarouselData";

const Carousel = () => {
  const data = CarouselData;
  const imageSrc = { carouselImage1, carouselImage2, carouselImage3 };

  console.log(data);

  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide "
      data-bs-ride="carousel"
      style={{ position: "relative", minHeight: "410px" }}
    >
      <div
        className="carousel-indicators "
        style={{
          position: "absolute",

          // FIX: Locks vertical position 1.5rem from the bottom of the main container
          bottom: "1.5rem",

          // FIX: Overrides Bootstrap's default centering transform
          marginLeft: "2%",
          // right: "auto",
          transform: "none",
          margin: 0,
          justifyContent: "flex-start",
          zIndex: 10,
        }}
      >
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>

      <div className="carousel-inner">
        {CarouselData.map((item, index) => {
          const imageUrl = imageSrc[item.imgKey]; // dynamically fetch the correct image

          return (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={item.id}
            >
              <div className="container container-lg">
                <div className="row align-items-center">
                  <div className="col-xl-4 col-md-4">
                    <div
                      className="about-images mb-md-5 mb-sm-0 aos-item section-title"
                      data-aos="zoom-in"
                    >
                      <img
                        src={imageUrl}
                        alt=""
                        style={{
                          display: "inline-block",
                          width: "500px",
                          borderRadius: "50% 50% 0 0",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-xl-8 col-md-8 ps-xl-2">
                    <div
                      className="list-style aos-item text-left"
                      data-aos="zoom-in-left"
                    >
                      <img src={carouselIcon} alt="" />
                      <p className="pb-3 text-justify testimonials-text">
                        {item.text}
                      </p>
                      <p
                        style={{
                          color: "#007fad",
                          fontWeight: "bold",
                          textAlign: "left",
                        }}
                      >
                        {item.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

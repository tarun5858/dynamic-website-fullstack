import React from "react";
import { carouselIcon } from "./Imagepath";

const SuccessCards = ({ data, src, reverse }) => {
  return (
    <div className="container container-lg">
      <div
        className={`row align-items-center  flex-md-row mt-5 mb-5 ${
          reverse ? "flex-md-row-reverse" : ""
        }`}
      >
        {/* <div className="row align-items-center"> */}
        <div className="col-xl-4 col-md-4">
          <div
            className="about-images mb-md-5 mb-sm-0 aos-item section-title"
            data-aos="zoom-in"
          >
            <img
              src={src}
              alt=""
              style={{
                display: "inline-block",
                width: "500px",
                borderRadius: "50% 50% 0 0",
              }}
            />
          </div>
        </div>
        <div className="col-xl-8 col-md-8 ps-xl-3">
          <div
            className="section-title list-style aos-item"
            data-aos="zoom-in-left"
            style={{ textAlign: "left" }}
          >
            <img src={carouselIcon} alt="" />
            <p className="pb-3 pagrap-success text-justify">{data.text}</p>
            <p
              style={{
                color: "#000",
                fontWeight: "bold",
                textAlign: "left",
              }}
              className="success-names"
            >
              {data.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCards;

import React from "react";
import {
  carouselImg1,
  carouselImg2,
  carouselImg3,
} from "../components/Imagepath";
import CarouselData from "../data/CarouselData";

const OurStoryCarousel = () => {
  const data = CarouselData;
  const imageSrc = { carouselImg1, carouselImg2, carouselImg3 };

  console.log(data);

  return (
<div
            id="carouselExampleIndicators"
            className="carousel carousel-parent slide bg-gray-100 p-8 rounded-xl "
            data-bs-ride="carousel"
            style={{ position: 'relative', minHeight: '410px' }}
        >
            
            {/*Indicators with absolute positioning and vertical/horizontal lock */}
            <div
                className="carousel-indicators"
                style={{
                    position: "absolute",
                    
                    // Locks vertical position 1.5rem from the bottom of the main container
                    bottom: '1.5rem', 
                    
                    // Overrides Bootstrap's default centering transform
                    marginLeft: "9%",
                    // right: "auto", 
                    transform: "none", 
                    margin: 0, 
                    justifyContent: "flex-start",
                    zIndex: 10,
                }}
            >
                {CarouselData.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index.toString()}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : "false"}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner" style={{ position: "relative" }}>
                {CarouselData.map((item, index) => {
                    const imageUrl = imageSrc[item.carouselimgKey];

                    return (
                        <div
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                            key={item.id}
                        >
                            <div className="container container-lg">
                                <div className="row align-items-center">
                                    <div className="col-xl-6 col-md-6 col-sm-12">
                                        <div
                                            className="transformative-images mb-md-5 mb-sm-0 aos-item"
                                            data-aos="zoom-in"
                                        >
                                            <img src={imageUrl} alt="" className="img-fluid rounded-lg shadow-md" />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 col-sm-12 ">
                                        <div
                                            className="section-title list-style aos-item"
                                            data-aos="zoom-in-left"
                                        >
                                            <h3 className="carousel-h3 text-2xl font-bold mb-3">{item.subhead}</h3>
                                            <p className="carousel-p text-gray-600">{item.paragraph}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* Optional: Add prev/next controls if you need them */}
        </div>
  );
};

export default OurStoryCarousel;

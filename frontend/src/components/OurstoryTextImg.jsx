const OurstoryTextImg = ({ data, src, reverse }) => {
  console.log(src);

  return (
    <div className="container">
      <div
        className={`row align-items-start  text-img-container flex-md-row ${
          reverse ? "flex-md-row-reverse" : ""
        }`}
      >
        <div className="col-lg-6 col-md-6 col-sm-12 ">
          <div className="page-banner-text float-text">
            <h1>{data.heading}</h1>
            <p className="about-p-tag">{data.paragraph}</p>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 p-0">
          <div className="float-img">
            <div
              className="page-banner-wrap text-center bg-cover "
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OurstoryTextImg;

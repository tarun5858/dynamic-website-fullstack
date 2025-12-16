const OurPromiseCards = ({ data, src }) => {
  return (
    <div className="col-xl-4 col-lg-4  col-md-4 col-sm-12 ps-xl-5">
      <div className="about-images promises-img mb-md-5 mb-sm-0 aos-item d-flex justify-content-center">
        <img src={src} alt="" />
        <p className="last-sec-p text-center">{data.promiseText}</p>
      </div>
    </div>
  );
};
export default OurPromiseCards;

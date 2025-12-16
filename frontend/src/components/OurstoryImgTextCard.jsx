const OurstoryImgTextCard = ({ data, src }) => {
  return (
    <div className="col-xl-4 col-lg-4 col-md-4 ps-xl-5">
      <div className="about-icons mb-md-5 mb-sm-0 aos-item">
        <img src={src} alt="" />
        <h3 className="text-center font-bold prehome-h3">{data.cardtext}</h3>
        <p className="text-center about-images-p">{data.cardParagraph}</p>
      </div>
    </div>
  );
};
export default OurstoryImgTextCard;

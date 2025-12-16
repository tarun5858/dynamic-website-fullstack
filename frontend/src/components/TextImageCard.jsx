import React from "react";

const TextImageCard = ({src,subheading,paragraph}) => {

  return (
   
      <div className="col-12 col-sm-4 col-md-4 col-lg-4 text-center aos-item">
        <div className="benefit-txt">
          <img src={src} className="mb-2" />
          <h3>{subheading}</h3>
          <p className="text-center">
           {paragraph}</p>

           </div>
        </div>

  );
};
export default TextImageCard;


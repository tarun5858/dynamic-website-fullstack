import LargeCtaRoutes from "./LargeCtaRoutes";
import LargeBlueCta from "./LargeBlueCta";

const TextImageSection = ({ data, src, reverse = false }) => {
  const phoneNumber = "918800658299"; // WhatsApp number in international format without "+" or spaces
  const message =
    "Thank you for contacting Prehome. How can we help you today?";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}`;

    // 1. Create a function to push the event
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
    <div className="container container-lg">
      <div
        className={`row align-items-center flex-column-reverse flex-md-row mt-5 mb-5 ${
          reverse ? "flex-md-row-reverse" : ""
        }`}
      >
        <div
          className="col-xl-6 col-md-5 ps-xl-4 aos-item getpre-cont"
          data-aos="fade-up"
        >
          <div
            className="section-title list-style  "
            data-wow-duration="1500ms"
            data-wow-delay="00ms"
          >
            <h2 className="desktop-show">{data.heading}</h2>

            <p className="pb-3 text-justify">{data.paragraph}</p>

            {data.listitems?.map((item, index) => (
              <div key={index} className="mx-3">
                <ul className="blog-text-ul">
                  {item.point.map((benefit, i) => (
                    <li key={i}>
                      {" "}
                      <b>{item.title}</b> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            {data.text &&
              (data.ctaType === "page" ? (
                <LargeBlueCta
                  text={data.text}
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => trackButtonClick('Submit Lead Form')}
                />
              ) : data.ctaType === "faq" ? (
                <LargeCtaRoutes text={data.text} to="/faq" onClick={() => trackButtonClick('Navigation Click')} />
              ) : data.ctaType === "whatsapp" ? ( // Action 3: WHATSAPP LINK (If ctaType is 'whatsapp')
                <LargeCtaRoutes
                  text={data.text}
                  to={whatsappUrl}
                  target="_blank"
                  onClick={() => trackButtonClick('Navigate To Whatsapp')}
                />
              ) : (
                <LargeBlueCta text={data.text} />
              ))}
          </div>
        </div>

        <div className="col-xl-6 col-md-6  aos-item section-title ">
          <h2 className="mobile-show">{data.heading}</h2>
          <div className="about-images mb-md-4 mb-sm-0  ">
            <img src={src} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextImageSection;

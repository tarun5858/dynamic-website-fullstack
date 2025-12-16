import React, { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const phoneNumber = "918800658299"; // WhatsApp number in international format without "+" or spaces
  const message = "Thank you for contacting Prehome. How can we help you today?";
const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

   const styles = {
    floatingButton: {
      position: "fixed",
      bottom: isMobile ? "10px" : "30px",
      right: isMobile ? "10px" : "40px",
      padding: isMobile ? "10px 10px" : "10px 23px",
      backgroundColor: "#4dc247",
      borderRadius: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
      cursor: "pointer",
      fontSize: isMobile ? "16px" : "20px",
      color: "#fff"
    },
    icon: {
      width: isMobile ? "35px" : "30px",
      height: isMobile ? "35px" : "30px",
      fill: "#fff",
      marginRight: isMobile ? "0px" : "5px",
    }
  };

  return (
    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <div style={styles.floatingButton}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          style={styles.icon}
        />
        {!isMobile && <span className="desk-text"> Chat with us</span>}
      </div>
    </a>
  );
};

export default WhatsAppButton;

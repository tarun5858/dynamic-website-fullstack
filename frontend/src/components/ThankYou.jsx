import React, { useEffect, useState } from "react";

const ThankYou = () => {
  const REDIRECT_DELAY_MS = 5000;
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_MS / 1000);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    // The actual redirect logic
    const timer = setTimeout(() => {
      console.log("Redirecting to homepage after successful form submission.");
      // Use window.location.href for a full reload redirect
      window.location.href = "/";
    }, REDIRECT_DELAY_MS);

    // Cleanup function: important to clear the timers when the component unmounts
    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="container">
      <div className="content-modal">
        <div className="">
          <h5 className="modal-title1">Thank You!</h5>
        </div>
        <div className="modal-body" style={{ textAlign: "center" }}>
          You’re on the list! We’ll reach out soon with homes that match your
          preferences
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

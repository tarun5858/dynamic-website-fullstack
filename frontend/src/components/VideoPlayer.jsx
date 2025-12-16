import React, { useRef } from "react";
import posterImg from "../assets/img/Untitled design-50.png";
import videoFile from "../assets/videos/VERSION 2-2.mp4";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const buttonRef = useRef(null);

  const playVideo = () => {
    if (buttonRef.current) buttonRef.current.style.display = "none";
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className="video-container" style={{ position: "relative" }}>
      <button ref={buttonRef} onClick={playVideo}></button>

      <video
        ref={videoRef}
        id="myVideo"
        width="100%"
        height="auto"
        controls
        playsInline
        poster={posterImg}
      >
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

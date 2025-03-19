import React from 'react';
import "../css/Common.css";
import bannerVideo from '../images/banner_4.mp4'; // Ensure the video is in the correct path

const Banner = () => {
  return (
    <div className="banner_wrapper">
      <video autoPlay loop muted className="banner_video">
        <source src={bannerVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Banner;

import React from "react";
import cage from "../../Assets/cage.mp4";
import "../Homepage/Homepage.css";

const Homepage = () => {
  return (
    <div className="homepage">
      <video src={cage} autoPlay loop muted />
    </div>
  );
};

export default Homepage;

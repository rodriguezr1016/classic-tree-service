import React from "react";
import "./jumbotron.css";

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <div className="image-container">
        <img src="/sun-tree.jpeg" alt="Tree service team working in Modesto, California" />
      </div>
      <div className="line2"></div>
      <p>
        No one cuts trees quite like Classic Tree Service. We provide safe, reliable,
        and affordable tree trimming, tree removal, and stump grinding for homes and
        businesses in Modesto, Merced, and surrounding areas.
      </p>
    </div>
  );
};

export default Jumbotron;

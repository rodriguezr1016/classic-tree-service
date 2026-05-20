import React from "react";
import "./jumbotron.css";
import Image from "next/image";

const Jumbotron = () => {
  return (
    <div className="jumbotron">
      <div className="image-container">
        <Image
          src="/trimming.jpg"
          alt="Tree service team working in Modesto, California"
          width={900}
          height={1200}
        />
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

import React from "react";

const BannerSlider = (props) => {
  const { images } = props;
  return (
    <div className="slides">
      {images.map((item, i) => (
        <div className={`slide slide-${i + 1}`} key={i}>
          <img src={item} alt={i} onContextMenu={(e) => e.preventDefault()} />
        </div>
      ))}
    </div>
  );
};

export default BannerSlider;

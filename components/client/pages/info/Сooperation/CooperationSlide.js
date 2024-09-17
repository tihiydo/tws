import React from "react";
import classes from "./cooperation.module.scss";
import Image from "next/image";
const CooperationSlide = ({ img, text }) => {
  return (
    <div className={classes.sliderSlide}>
      <div className={classes.imgWrapper}>
        <Image
          fill
          src={img}
          alt="products for cooperation"
        />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default CooperationSlide;

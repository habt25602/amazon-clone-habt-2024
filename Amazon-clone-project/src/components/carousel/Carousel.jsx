import React from "react";
import style from "../carousel/carousel.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { img } from "../carousel/img/data.js";
import { Carousel } from "react-responsive-carousel";

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItemList) => {
          return <img src={imageItemList} />;
        })}
      </Carousel>
    </div>
  );
}

export default CarouselEffect;

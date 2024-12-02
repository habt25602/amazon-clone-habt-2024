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
        {img.map((imageItemList, id) => {
          return <img src={imageItemList} key={id} />;
        })}
      </Carousel>
      <div className={style.fed}></div>
    </div>
  );
}

export default CarouselEffect;

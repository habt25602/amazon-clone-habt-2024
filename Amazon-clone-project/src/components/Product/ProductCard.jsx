import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformatter/CurrencyFormatter";
import style from "../Product/Product.module.css";

function ProductCard({ product }) {
  const { title, image, rating, price } = product;
  return (
    <div className={style.card_container}>
      <a href="">
        <img src={image} alt="" />{" "}
      </a>
      <div>
        <h3>{title}</h3>
        <div className={style.rating}>
          <Rating value={rating.rate} precision={0.1} />
          <small>{rating.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={style.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;

import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../Currencyformatter/CurrencyFormatter";
import style from "../Product/Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  // Check if product exists
  if (!product) {
    return <div>Loading...</div>; // or some other loading indicator
  }

  const { title, image, rating, price, id, description } = product;

  const [state, dispatch] = useContext(DataContext);
  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_CART,
      item: { title, image, rating, price, id, description },
    });
  };

  return (
    <div
      className={`${style.card_container} ${flex ? style.product_flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div style={{ maxWidth: "650px" }}> {description}</div>}
        <div className={style.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count} reviews</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={style.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

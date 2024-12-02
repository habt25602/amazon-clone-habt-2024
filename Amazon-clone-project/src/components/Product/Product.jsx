import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "../Product/Product.module.css";

function Product() {
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.log(err);
      });
  }, []);
  return (
    <section className={style.product_container}>
      {Product.map((singleproduct) => (
        <ProductCard product={singleproduct} key={singleproduct.id} />
      ))}
    </section>
  );
}

export default Product;

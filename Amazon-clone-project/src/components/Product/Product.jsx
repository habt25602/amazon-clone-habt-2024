import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import style from "../Product/Product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [Product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={style.product_container}>
          {Product.map((singleproduct) => (
            <ProductCard
              product={singleproduct}
              key={singleproduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;

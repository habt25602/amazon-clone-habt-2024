import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Product/ProductCard"; // Assuming you have a ProductCard component
import { useLocation } from "react-router-dom";
import Layout from "../Layout/Layout"; // Assuming you have a Layout component
import style from './Search.module.css'

function Search() {
  const location = useLocation();
  const searchTerm = location.state || ""; // Fallback to an empty string if no state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    // Filter the products based on the search term
    const results = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  return (
    <Layout>
      <h3 className={style.results_header}>
        Search Results for "{searchTerm}"
      </h3>
      
      <div className={style.search_results}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p>No products found for "{searchTerm}"</p>
        )}
      </div>
    </Layout>
  );
}

export default Search;

import React from "react";
import { CategoryImage } from "./categoryjson.js";

import style from "./Category.module.css";
import CatagoryCard from "./CategoryCard.jsx";

function Category() {
  return (
    <section className={style.category_container}>
      {CategoryImage.map((categoryinfo) => (
        <CatagoryCard data={categoryinfo} key={categoryinfo.title} />
      ))}
    </section>
  );
}

export default Category;

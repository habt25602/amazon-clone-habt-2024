import React from "react";
import style from "../Catagory/Catagory.module.css";

function CatagoryCard({ data }) {
  return (
    <div className={style.catagory}>
      <a href="">
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imageLink} alt="" />
        <p>Shop now</p>
      </a>
    </div>
  );
}

export default CatagoryCard;

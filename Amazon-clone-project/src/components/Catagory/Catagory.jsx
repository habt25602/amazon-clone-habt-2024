import React from "react";
import { CatagoryImage } from "./catagoryjson";

import style from "../Catagory/Catagory.module.css";
import CatagoryCard from "./CatagoryCard.Jsx";

function Catagory() {
  return (
    <section className={style.catagory_container}>
      {CatagoryImage.map((catagoryinfo) => (
        <CatagoryCard data={catagoryinfo} key={catagoryinfo.title} />
      ))}
    </section>
  );
}

export default Catagory;

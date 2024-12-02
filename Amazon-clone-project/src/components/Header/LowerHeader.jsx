import React from "react";
import { IoMenuSharp } from "react-icons/io5";
import style from "../Header/Header.module.css";
function LowerHeader() {
  return (
    <div className={style.lower_container}>
      <ul>
        <li>
          {" "}
          <IoMenuSharp />
          <p>All</p>
        </li>
        <li>Today's deal</li>
        <li>Customer Service </li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;

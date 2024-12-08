import React, { useContext } from "react";
import { Link } from "react-router-dom";
import flag from "../../assets/images/usaflag.png";
import Amazonlogo from "../../assets/images/AmazonLogo.png";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import style from "../Header/Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={style.fixed}>
      <section>
        {" "}
        <div className={style.header_container}>
          <div className={style.log_container}>
            <Link to="/">
              <img src={Amazonlogo} alt="Amazon" />
            </Link>
            <div className={style.delivery}>
              <span>
                <HiOutlineLocationMarker />
              </span>
              <div>
                <p>Delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={style.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" placeholder="Search Products" />
            <FaSearch className={style.icon} size={39} />
          </div>

          <div className={style.order_container}>
            <a href="" className={style.language}>
              {" "}
              <img src={flag} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello,{user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign in</p>
                    <span>Accont & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <div>
                <p>Returns </p>
                <span>& Orders</span>
              </div>
            </Link>

            <Link to="/cart" className={style.cart}>
              <IoCartOutline size={35} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;

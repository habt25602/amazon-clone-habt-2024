import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import flag from "../../assets/images/usaflag.png";
import Amazonlogo from "../../assets/images/AmazonLogo.png";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import style from "../Header/Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
import axios from "axios";

function Header() {
  const [{ user, basket }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const [searchBox, setSearchBox] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate_search = useNavigate();

  useEffect(() => {
    // Fetch products for suggestion purposes
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
    if (searchBox) {
      const filteredSuggestions = products.filter((item) =>
        item.title.toLowerCase().includes(searchBox.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchBox, products]);

  const handleSearch = () => {
    if (searchBox.trim().length !== 0) {
      // Pass the search term when navigating
      navigate_search("/search-results", { state: searchBox });
      setSearchBox(""); // Clear the search box after navigating
      setSuggestions([]); // Clear suggestions after search
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchBox(title); // Set the search box to the clicked suggestion
    // Navigate to search results with the clicked suggestion as the search term
    navigate_search("/search-results", { state: title });
  };

  return (
    <section className={style.fixed}>
      <section>
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
            <input
              type="text"
              placeholder="Search Products"
              value={searchBox}
              onChange={(e) => setSearchBox(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Allow search on Enter key press
            />
            <FaSearch className={style.icon} size={39} onClick={handleSearch} />
            {suggestions.length > 0 && (
              <ul className={style.suggestionList}>
                {suggestions.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => handleSuggestionClick(item.title)}
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={style.order_container}>
            <a href="" className={style.language}>
              <img src={flag} alt="" />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello, Sign in</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <div>
                <p>Returns</p>
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

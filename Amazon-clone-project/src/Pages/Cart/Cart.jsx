import React, { useContext } from "react";
import Layout from "../../components/Layout/Layout";
import { DataContext } from "../../components/DataProvider/DataProvider";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/Currencyformatter/CurrencyFormatter";
import { Link } from "react-router-dom";
import style from "../Cart/Cart.module.css";
import { Type } from "../../Utility/action.type";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };
  const decreament = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };
  return (
    <Layout>
      <section className={style.container}>
        <div className={style.cart_container}>
          <h2>Hello</h2>
          <h3>Your Shopping Basket</h3>
          <hr />
          {basket?.length == 0 ? (
            <p>No Item in your Cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={style.cart_product}>
                  {" "}
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    flex={true}
                    rendeAdd={false}
                  />
                  <div className={style.btn_container}>
                    <button
                      className={style.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button
                      className={style.btn}
                      onClick={() => decreament(item.id)}
                    >
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={style.subtotal}>
            <div>
              <p>Sub total({basket?.length}) items</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>
            <Link to="/payments"> Continue to checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;

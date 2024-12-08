import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import style from "../Payment/Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/Currencyformatter/CurrencyFormatter";

function Payment() {
  const [{ basket, user }] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);

  const handleChang = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  return (
    <Layout>
      {/* header */}

      <div className={style.payment_header}>Checkout ({totalItem}) items</div>
      <section className={style.payment}>
        {/* adress */}
        <div className={style.flex}>
          <h3>Delivery Adress</h3>
          <div>
            <div>{user?.email}</div>
            <div> No.8 Kalokh Drive</div>
            <div> Freetown</div>
          </div>
        </div>
        <hr />
        {/* product */}{" "}
        <div className={style.flex}>
          <h3>Review Delivery and Items</h3>
          <div>
            {basket.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card forms */}
        <div className={style.flex}>
          <h3>Payment Methods</h3>
          <div className={style.payment_card_container}>
            <div className={style.payment_details}>
              {" "}
              <form action="">
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                <CardElement onChange={handleChang} />

                {/* total price */}
                <div className={style.payment_price}>
                  <div>
                    <span>
                      Total order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <hr />
      </section>
    </Layout>
  );
}

export default Payment;

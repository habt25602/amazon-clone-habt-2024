import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import style from "../Payment/Payment.module.css";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { useContext } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../components/Currencyformatter/CurrencyFormatter";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);

  const [processing, setProcessing] = useState();
  const navigate = useNavigate();

  const handleChang = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      // 1. contact Back end
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });
      // console.log(response.data);
      const clientSecret = response.data?.clientSecret;

      // 2.client Side conformation

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
      // 3.Put the Items on fire store, Data Base

      await db
        .collection("user")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // Empty The Cart

      dispatch({ type: Type.EMPTY_CART });

      setProcessing(false);
      navigate("/orders", { state: { msg: "You have Placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };
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
              <form onSubmit={paymentHandler}>
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

                  <button type="submit">
                    {" "}
                    {processing ? (
                      <div className={style.loading}>
                        <ClipLoader size={12} color="gray" />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
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

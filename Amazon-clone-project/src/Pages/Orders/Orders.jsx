import React from "react";
import Layout from "../../components/Layout/Layout";
import style from "./Orders.module.css";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import ProductCard from "../../components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("user")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log("Snapshot:", snapshot);
          console.log("Documents:", snapshot.docs);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={style.container}>
        <div className={style.order_container}>
          <h2>Your Orders</h2>
{
  orders?.length==0&& <div>
    No Orders Found.
  </div>
}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID:{eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard flex={true} product={order} key={order.id} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;

import React from "react";
import Layout from "../../components/Layout/Layout";
import CarouselEffect from "../../components/carousel/Carousel";
import Catagory from "../../components/Category/Category";
import Product from "../../components/Product/Product";

function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Catagory />
      <Product />
    </Layout>
  );
}

export default Landing;

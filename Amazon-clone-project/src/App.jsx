import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CarouselEffect from "./components/carousel/Carousel";
import Catagory from "./components/Catagory/Catagory";
import Product from "./components/Product/Product";

function App() {
  return (
    <div>
      <Header />
      <CarouselEffect />
      <Catagory />
      <Product />
    </div>
  );
}

export default App;

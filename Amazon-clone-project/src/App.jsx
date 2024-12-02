import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CarouselEffect from "./components/carousel/Carousel";

function App() {
  return (
    <div>
      <Header />
      <CarouselEffect/>
    </div>
  );
}

export default App;

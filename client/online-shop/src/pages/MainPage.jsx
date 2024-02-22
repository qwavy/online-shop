import { useState } from "react";
import { useEffect } from "react";
import Header from "../layouts/Header";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { getAllProducts,addToCart } from "../api/Api";
import ProductItem from "../layouts/ProductItem";
// import { addToCart } from "../api/cart/cartApi";


const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts)
  }, []);


  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductItem products={products}/>
        </div>
      </div>
    </>
  );
};

export default MainPage;

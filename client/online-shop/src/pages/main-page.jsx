import { useState } from "react";
import { useEffect } from "react";
import Header from "../templates/header";
import Footer from "../templates/footer";
import {
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import '../App.css'
import {
  getAllProducts,
  addToCart,
  getTopRateProducts,
  getSearchResults,
} from "../api/Api";
import ProductItem from "../templates/product-item";
import TopRateProductsSwipper from "../components/top-rate-products-swiper";
// import { addToCart } from "../api/cart/cartApi";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [topRateProducts, setTopRateProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts);
    getTopRateProducts(setTopRateProducts);
    console.log(topRateProducts);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <section className="flex flex-col justify-center lg:flex-row  w-full">
          <div className="w-11/12 lg:w-2/4 m-10  ">
            <Link to="/product/18">
              <div className="bg-cyan-300 h-44 mb-10 flex justify-around rounded-xl">
                <div className="flex items-center justify-center flex-col ">
                  <span className="text-center font-roboto font-bold">
                    iphone 13
                  </span>
                  <span className="text-gray-600 font-roboto">
                    Now Available on affordable price
                  </span>
                  <span className="font-roboto font-bold">900$</span>
                </div>
                <img src="https://i.imgur.com/kBI0DIN.png" className="" />
              </div>
            </Link>
            <div className="bg-purple-400 h-44 mb-10 flex justify-around rounded-xl">
              <div className="flex items-center justify-center flex-col ">
                <span className="text-center font-roboto font-bold">
                  Ultra HD 4K TVs
                </span>
                <span className="text-gray-600 font-roboto">Lg company</span>
                <span className="font-roboto font-bold">2900$</span>
              </div>
              <img src="https://i.imgur.com/Bb74eBH.png" className="" />
            </div>
          </div>
          <div className="w-11/12 lg:w-2/4 bg-rose-200 h-96 m-10 rounded-xl  flex flex-col justify-around">
            <div className="w-full flex flex-col items-center">
              <span className="text-center font-roboto font-bold w-full ">
                Lifelong Tribe 20T
              </span>
              <span className="text-gray-600 text-center font-roboto w-full ">
                Lg company
              </span>
              <span className="font-roboto text-center w-full font-bold ">
                2900$
              </span>
            </div>
            <img
              src="https://i.imgur.com/nEDa3RK.png"
              className="h-4/6 w-4/5 mx-auto"
            />
          </div>
        </section>
        <h1 className="font-readex font-bold text-5xl  mb-10">
          Shop by <span className="text-indigo-500">
          Category
            </span>
        </h1>
        <section>
          <div className="flex w-full justify-between">
            <div className="w-4/12 ">
              
              <Link to="/shop/laptop" className="shadow-2xl rounded-xl">
                <img src="https://i.imgur.com/TNkKIv4.png"/>
                <h1 className="font-readex text-xl flex justify-end p-8">True Laptop Solution</h1>
              </Link>
              <Link to="/shop/watch" className="mt-20 shadow-2xl rounded-xl ">
                <img src="https://i.imgur.com/edPiuwr.png"/>
                <h1 className="font-readex text-xl p-8 flex justify-end">Not just stylisht</h1>

              </Link>
            </div>
            <div className="w-7/12 flex ">
              <Link to="/shop/phone" className="h-full flex justify-center flex-col shadow-2xl rounded-xl ">
                <img src="https://i.imgur.com/HoaaxJa.png"/>
                <h1 className="font-readex text-xl flex justify-center p-8">Your <span className="text-indigo-500">&nbsp;day&nbsp;</span> to day life</h1>
              </Link>
              <Link to="/shop/tablet" className="h-full flex justify-center flex-col ml-20 shadow-2xl rounded-xl">
                <h1 className="font-readex text-xl flex justify-center p-8">Empower your work</h1>
                <img src="https://i.imgur.com/st9acvJ.png"/>
              </Link>
            </div>
          </div>
        </section>
        <h1 className="font-readex font-bold text-5xl  mb-10 mt-10">
          <span className="text-indigo-500">Top Rate</span> Products
        </h1>
        <section>
          <TopRateProductsSwipper products={topRateProducts} />
        </section>
      </div>
    </>
  );
};

export default MainPage;

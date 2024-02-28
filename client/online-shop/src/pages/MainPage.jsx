import { useState } from "react";
import { useEffect } from "react";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import {
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { getAllProducts, addToCart, getTopRateProducts, getSearchResults } from "../api/Api";
import ProductItem from "../templates/ProductItem";
import TopRateProductsSwipper from "../components/TopRateProductsSwipper";
// import { addToCart } from "../api/cart/cartApi";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [topRateProducts, setTopRateProducts] = useState([]);

  useEffect(() => {
    getAllProducts(setProducts);
    getTopRateProducts( setTopRateProducts);
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
        <h1 className="font-roboto font-bold text-5xl  mb-10">
          Shop by Category
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <div className="border-cyan-300 border-4 rounded-xl">
            <Link to="/Shop/phone">
              <div className="flex justify-center items-center">
                <span className="font-roboto font-bold items-center text-3xl">
                  Phones
                </span>
              </div>
              <img
                src="https://c.dns-shop.kz/thumb/st4/fit/160/160/21372bacc6b20ea18c530849f9177f61/775f3cdb98e5f7e7fecf8920121bdeca55794027a61db74fccde34629a2d4530.jpg"
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="border-purple-400 border-4 rounded-xl flex flex-col justify-between">
            <Link to="/Shop/tablet">
              <div className="flex justify-center items-center">
                <span className="font-roboto font-bold items-center text-3xl">
                  Tablets
                </span>
              </div>
              <img
                src="https://c.dns-shop.kz/thumb/st4/fit/160/160/4ddaedea27152d83478d75348a8e2e01/8c494b7a8171adb792c2d07e88d6dda54a98d4b9108f8ae47fb86f317ba99d00.jpg"
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="border-orange-400 border-4 rounded-xl flex flex-col justify-between">
            <Link to="/Shop/laptop">
              <div className="flex justify-center items-center">
                <span className="font-roboto font-bold items-center text-3xl">
                  Laptops
                </span>
              </div>
              <img
                src="https://c.dns-shop.kz/thumb/st1/fit/160/160/6e92389bfc5cc627c0f6895341f42c5d/1b711e14ae41a587c06b56891482e1c232647f6e78539a08389561553f7e2f03.jpg"
                className="mx-auto"
              />
            </Link>
          </div>
          <div className="border-green-400 border-4 rounded-xl flex flex-col justify-between">
            <div className="flex justify-center items-center">
              <span className="font-roboto font-bold items-center text-3xl">
                Tv
              </span>
            </div>
            <img
              src="https://c.dns-shop.kz/thumb/st4/fit/160/160/a36577f845309dfd67da714a2fd6c1ec/5a991b3a647a989aa0186cfab2cd1e938967fbfc690500641084f074131623e5.jpg"
              className="mx-auto"
            />
          </div>
        </section>
        <h1 className="font-roboto font-bold text-5xl  mb-10 mt-10">
          Top Rate Products
        </h1>
        <section>
          <TopRateProductsSwipper products={topRateProducts}/>
        </section>
      </div>
    </>
  );
};

export default MainPage;

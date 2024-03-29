import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { StarIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { addToCart } from "../api/Api";
import { succesNotify } from "../notify/notify";
import { ToastContainer } from "react-toastify";
import "../App.css";

const TopRateProductsSwipper = ({ products }) => {
  console.log(products);
  return (
    <div className="swiper-wrap">
      <Swiper
        slidesPerView={3}
        grid={{
          rows: 1,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Grid, Pagination, Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 "
      >
        {products.map((product) => (
          <div className="swiper-container" key={product.id}>
            <SwiperSlide className="swiper-img">
              <Link
                to={`/product/${product.id}`}
                className="flex flex-col justify-center"
              >
                <img
                  src={product.image}
                  className=" w-40 h-40 mx-auto group-hover:opacity-75"
                />
                <span className="text-center text-lg ">{product.title}</span>
                <span className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}$
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <div key={index}>
                      {index < product.rate ? (
                        <StarIcon
                          key={product.rate}
                          className="text-yellow-400 h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <StarIcon
                          key={product.rate}
                          className="text-gray-200 h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                  <span className="text-xs text-gray-500">
                    {product.rateCount}
                  </span>
                </div>
              </Link>
              <button
                className="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-18"
                onClick={() => {
                  addToCart(product)
                  succesNotify()} }
              >
                <ShoppingCartIcon className="h-6 w-6" />
              </button>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
      <div className="swiper-button-next">
        
      </div>
      <div className="swiper-button-prev">

      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
    
  );
};
export default TopRateProductsSwipper;

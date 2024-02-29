import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import 'swiper/css/navigation';
import { StarIcon,ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { getAllProducts,addToCart } from "../api/Api";
import ProductItem from "../templates/ProductItem";

const TopRateProductsSwipper = ({ products }) => {
  console.log(products);
  return (
    <Swiper
      slidesPerView={3}
      grid={{
        rows: 1,
      }}
      spaceBetween={30}
      pagination={{
        clickable: true,
      }}
      modules={[Grid, Pagination,Navigation]}
      navigation={true}
      className="grid grid-rows-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((product) => (
        <div className="">
      <SwiperSlide>


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
              <span className="text-xs text-gray-500">{product.rateCount}</span>
            </div>
          </Link>
          <button
            class="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-18"
            onClick={() => addToCart(product)}
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
      </SwiperSlide>

        </div>
      ))}
    </Swiper>
  );
};
export default TopRateProductsSwipper;

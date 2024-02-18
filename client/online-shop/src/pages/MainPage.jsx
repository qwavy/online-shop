import { useState } from "react";
import { useEffect } from "react";
import Header from "../layouts/Header";
import { StarIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { addToCart, getAllProducts } from "../api/products/productsApi";


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
          {products.map((product) => (
            <div className="">
              <Link to={`/product/${product.id}`} className="flex flex-col justify-center">
                <img
                  src={product.image}
                  className="w-40 h-52 mx-auto group-hover:opacity-75"
                />
                <span className="text-center text-lg ">{product.title}</span>
                <span className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}$
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <div key={index}>
                      {index < product.rating.rate ? (
                        <StarIcon
                          key={product.rating.rate}
                          className="text-yellow-400 h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <StarIcon
                          key={product.rating.rate}
                          className="text-gray-200 h-5 w-5 flex-shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                  <span className="text-xs text-gray-500">
                    {product.rating.count}
                  </span>
                </div>
              </Link>
              <button
                class="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
                onClick={() => addToCart(product)}
              >
                Button
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;

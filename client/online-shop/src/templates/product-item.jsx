import { StarIcon, ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { addToCart, getCartProducts } from "../api/Api";
import { succesNotify } from "../notify/notify";
import { starStyle } from "../cva/cva";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
export const ProductItem = ({ products }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const handleAddToCart = (product) => {
    succesNotify();
    addToCart(product);

    console.log(cartProducts);
  };

  useEffect(() => {
    getCartProducts().then((response) => setCartProducts(response));
  }, []);

  return (
    <>
      {products.map((product) => (
        <div className="font-roboto" key={product.id}>
          <Link
            to={`/product/${product.id}`}
            className="flex flex-col justify-center"
            key={product.id}
          >
            <img
              src={product.image}
              className=" w-40 h-40 mx-auto group-hover:opacity-75 object-contain"
            />
            <span className="text-center text-lg ">{product.title}</span>
            <span className="mt-1 text-lg font-medium text-gray-900">
              {product.price}$
            </span>
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  <StarIcon
                    key={product.rate}
                    className={starStyle({ isYellow: index < product.rate })}
                    aria-hidden="true"
                  />
                </div>
              ))}
              <span className="text-xs text-gray-500 m-1">
                {product.rateCount}
              </span>
            </div>
          </Link>
          <button
            className="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-18"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </button>
        </div>
      ))}

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
    </>
  );
};

import { useParams } from "react-router-dom";
import { getSingleProduct, addToCart } from "../api/Api";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    getSingleProduct(productId).then((response) => setProduct(response))
  }, []);
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex">
          <img src={product.image} />
          <div className="flex flex-col p-8">
            <span className="text-3xl font-bold">{product.title}</span>
            <span className="text-3xl text-gray-500">
              {product.category}
            </span>
            <span className="text-3xl font-semibold mt-4">
              {product.price}$
            </span>
            <div className="flex mt-4 content-center items-center">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  {index < product.rate ? (
                    <StarIcon
                      key={product.rate}
                      className="text-yellow-400 h-10 w-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <StarIcon
                      key={product.rate}
                      className="text-gray-200 h-10 w-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
              <span className="text-xl text-gray-500 align-center items-center text-center">
                {product.count}
              </span>
            </div>
            <span className="text-xl text-gray-900 mt-4 font-roboto">
              {product.description}
            </span>
            <button
              className="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48 mt-4"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductPage;

import { useParams } from "react-router-dom";
import { getSingleProduct,addToCart } from "../api/Api";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "../layouts/Header";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
  ]);
  useEffect(() => {
    getSingleProduct(productId, setProduct);
    console.log(productId);
  }, []);
  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex">
          <img src={product[0].image} />
          <div className="flex flex-col p-8">
            <span className="text-3xl font-bold">{product[0].title}</span>
            <span className="text-3xl text-gray-500">{product[0].category}</span>
            <span className="text-3xl font-semibold mt-4">
              {product[0].price}$
            </span>
            <div className="flex mt-4 content-center items-center">
              {[...Array(5)].map((_, index) => (
                <div key={index}>
                  {index < product[0].rate ? (
                    <StarIcon
                      key={product[0].rate}
                      className="text-yellow-400 h-10 w-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <StarIcon
                      key={product[0].rate}
                      className="text-gray-200 h-10 w-10 flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              ))}
              <span className="text-xl text-gray-500 align-center items-center text-center">
                {product[0].count}
              </span>
            </div>
            <span className="text-xl text-gray-900 mt-4 font-roboto">
              {product[0].description}
            </span>
            <button
              class="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48 mt-4"
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

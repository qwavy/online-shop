import { useParams } from "react-router-dom";
import { getSingleProduct, addToCart, sortByCategory } from "../api/Api";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { starStyle } from "../cva/cva";
import { succesNotify } from "../notify/notify";
import TopRateProductsSwipper from "../components/top-rate-products-swiper";
import { ToastContainer } from "react-toastify";



const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [products,setProducts] = useState([])
  
  useEffect(() => {
    getSingleProduct(productId).then((response) => setProduct(response))
  }, []);
  useEffect(() => {
    sortByCategory(product.category).then((response) => setProducts(response))
    console.log(product.category)
  },[product])
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
                    <StarIcon
                      key={product.rate}
                      className={starStyle ({isYellow: index < product.rate})}
                      aria-hidden="true"
                    />
                  
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
              onClick={() => {
                addToCart(product)
                succesNotify()
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <section className="mt-20">
          <h1 className="text-5xl font-readex font-bold"> More Interesting Products</h1>
          <TopRateProductsSwipper products={products}/>
          
        </section>
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
    </>
  );
};
export default ProductPage;

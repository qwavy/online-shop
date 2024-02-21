import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { addToCart, getAllCategories } from "../api/Api";
import { sortByCategory } from "../api/Api";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories,setCategories] = useState([])
  const [sortByCategoryButton, setSortByCategoryButton] = useState("all");
  useEffect(() => {
    getAllCategories(setCategories)
  },[])

  const sortByCategoryButtonActive = (value) => {
    setSortByCategoryButton(value);
  };

  const searchProducts = (value) => {
    const copy_products = JSON.parse(JSON.stringify(products));
    const filtered = copy_products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setProducts(filtered);
  };

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <div class="mb-6">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search product
            </label>
            <input
              type="text"
              onChange={(e) => searchProducts(e.target.value)}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <button
              className={
                sortByCategoryButton === "all"
                  ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48"
                  : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
              }
              onClick={() => {
                sortByCategory("all", setProducts);
                sortByCategoryButtonActive("all");
              }}
            >
              all
            </button>
            {categories.map((category) => (
              <button
                className={
                  sortByCategoryButton === category
                    ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48"
                    : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
                }
                onClick={() => {
                  sortByCategory(category, setProducts);
                  sortByCategoryButtonActive(category);
                }}
              >
                {category}
              </button>
            ))}
            {/* <button
              className={
                sortByCategoryButton === "jeweleryActive"
                  ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48"
                  : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
              }
              onClick={() => {
                sortByCategory("jewelery", setProducts);
                sortByCategoryButtonActive("jeweleryActive");
              }}
            >
              jewelery
            </button>
            <button
              className={
                sortByCategoryButton === "men's clothingActive"
                  ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48"
                  : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
              }
              onClick={() => {
                sortByCategory("men's clothing", setProducts);
                sortByCategoryButtonActive("men's clothingActive");
              }}
            >
              men's clothing
            </button>
            <button
              className={
                sortByCategoryButton === "women's clothingActive"
                  ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48"
                  : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48"
              }
              onClick={() => {
                sortByCategory("women's clothing", setProducts);
                sortByCategoryButtonActive("women's clothingActive");
              }}
            >
              women's clothing
            </button> */}
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div className="">
              <Link
                to={`/product/${product.id}`}
                className="flex flex-col justify-center"
              >
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
          {products.map((product) => (
            <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  class="p-2 rounded-t-lg w-40 h-52 mx-auto"
                  src={product.image}
                  alt="product image"
                />
              </a>
              <div class="px-5 pb-5">
                <a href="#">
                  <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                  <div class="flex items-center space-x-1 rtl:space-x-reverse">
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      class="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    {product.rating.count}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  <button
                    class="bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-36"
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Shop;

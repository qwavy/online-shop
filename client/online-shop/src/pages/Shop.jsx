import { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { addToCart, getAllCategories } from "../api/Api";
import { sortByCategory } from "../api/Api";
import ProductItem from "../layouts/ProductItem";
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

  // const searchProducts = (value) => {
  //   const copy_products = JSON.parse(JSON.stringify(products));
  //   const filtered = copy_products.filter((product) =>
  //     product.title.toLowerCase().includes(value.toLowerCase())
  //   );
  //   setProducts(filtered);
  // };

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
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductItem products={products}/>
        </div>
      </div>
    </>
  );
};
export default Shop;

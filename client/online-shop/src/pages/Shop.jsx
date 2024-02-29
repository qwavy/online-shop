import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import Header from "../templates/Header";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  addToCart,
  getAllCategories,
  getSearchResults,
  sortByAsscendingPrice,
  sortByDescendingPrice,
  sortByPopularity,
  sortByRating,
} from "../api/Api";
import { sortByCategory } from "../api/Api";
import ProductItem from "../templates/ProductItem";
import ProductsSort from "../components/ProductsSort";
const Shop = () => {
  const { productCategory } = useParams();
  const [searchValue, setSearchValue] = useState("");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortByCategoryButton, setSortByCategoryButton] =
    useState(productCategory);
  useEffect(() => {
    getAllCategories(setCategories);
    sortByCategory(productCategory, setProducts);
    console.log(productCategory);
  }, []);

  const sortByCategoryButtonActive = (value) => {
    setSortByCategoryButton(value);
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <section>
            <div>
              <h1 className="font-roboto font-bold text-5xl  mb-10">Search</h1>
              <div className="flex justify-center mb-10">
                <input
                  className="border-2 w-full p-2 border-gray-500 rounded-xl "
                  onChange={(e) =>
                    getSearchResults(e.target.value.toLowerCase(), setProducts)
                  }
                  placeholder="Search Bar"
                />
              </div>
            </div>
            <ProductsSort sortByCategoryButton={sortByCategoryButton} setProducts={setProducts}/>
          </section>

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
              <Link to={`/shop/${category}`} key={category}>
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
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ProductItem products={products} />
        </div>
      </div>
    </>
  );
};
export default Shop;

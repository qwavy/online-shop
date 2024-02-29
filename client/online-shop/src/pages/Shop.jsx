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
import { useDebounce } from "../hooks/use-debounce";
import { CategoryButton } from "../components/category-button";
const Shop = () => {
  const { productCategory } = useParams();

  const [searchValue, setSearchValue] = useState("");
  const debounceSearchValue = useDebounce(searchValue, 500);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortByCategoryButton, setSortByCategoryButton] =
    useState(productCategory);
  useEffect(() => {
    getAllCategories().then((response) => setCategories(response))
      
    sortByCategory(productCategory, setProducts);
    console.log(productCategory);
  }, []);

  useEffect(() => {
    getSearchResults(debounceSearchValue, setProducts);
    console.log("sfjfskjl");
  }, [debounceSearchValue]);

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
                  onChange={(e) => {
                    setSearchValue(e.target.value.toLowerCase(), 500);
                  }}
                  placeholder="Search Bar"
                />
              </div>
            </div>
            <ProductsSort
              sortByCategoryButton={sortByCategoryButton}
              setProducts={setProducts}
            />
          </section>

          <div>

            {['all',...categories].map((category) => (
              <CategoryButton
                onClick={() => {
                  sortByCategory(category, setProducts);
                  sortByCategoryButtonActive(category);
                }}
                isActive={sortByCategoryButton === category}
                category={category}
                key={category}
              />
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

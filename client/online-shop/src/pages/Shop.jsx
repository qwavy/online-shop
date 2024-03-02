import { useParams } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import { useEffect, useState } from "react";
import { getAllCategories, getSearchResults } from "../api/Api";
import { sortByCategory } from "../api/Api";
import ProductItem from "../templates/product-item";
import ProductsSort from "../components/products-sort";
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
    getAllCategories().then((response) => setCategories(response));
    sortByCategory(productCategory).then((response) => setProducts(response))
    console.log(productCategory);
  }, []);

  useEffect(() => {
    getSearchResults(debounceSearchValue).then((response) => setProducts(response))
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
            {["all", ...categories].map((category) => (
              <CategoryButton
                onClick={() => {
                  sortByCategory(category).then((response) => setProducts(response));
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
export default Shop;

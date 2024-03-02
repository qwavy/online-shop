
import {sortByAsscendingPrice, sortByDescendingPrice, sortByPopularity, sortByRating,sortProducts} from '../api/Api'
import { useEffect, useState } from "react";

const ProductsSort = ({sortByCategoryButton,setProducts}) => {
  const [sortValue,setSortValue] = useState("rate")


    useEffect(() => {
        sortProducts(sortValue,sortByCategoryButton).then((response) => setProducts(response))
      },[sortValue])

    const test = () => {
    }


  return (
    <>
        <select onChange={(e) => setSortValue(e.target.value)}>
          <option value="rate">rate</option>
          <option value="popularity">popularity</option>
          <option value="asscending">asscending</option>
          <option value="descending">descending</option>
        </select>
        <button onClick={() => test()}>
            test
        </button>
    </>
  );
};
export default ProductsSort;

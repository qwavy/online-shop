
import {sortByAsscendingPrice, sortByDescendingPrice, sortByPopularity, sortByRating} from '../api/Api'
import { useEffect, useState } from "react";

const ProductsSort = ({sortByCategoryButton,setProducts}) => {
  const [sortValue,setSortValue] = useState("")


    useEffect(() => {
        if(sortValue == "rate"){
          sortByRating(sortByCategoryButton,setProducts)
        }else if(sortValue == "popularity"){
          sortByPopularity(sortByCategoryButton,setProducts)
        }
        else if(sortValue == "asscending"){
          sortByAsscendingPrice(sortByCategoryButton,setProducts)
        }else if(sortValue == "descending"){
          sortByDescendingPrice(sortByCategoryButton,setProducts)
        }
      },[sortValue])


  return (
    <>
        <select onChange={(e) => setSortValue(e.target.value)}>
          <option value="rate">rate</option>
          <option value="popularity">popularity</option>
          <option value="asscending">asscending</option>
          <option value="descending">descending</option>
        </select>
    </>
  );
};
export default ProductsSort;

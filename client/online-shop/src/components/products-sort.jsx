
import { Select } from '@headlessui/react';
import {sortProducts} from '../api/Api'
import { useEffect, useState } from "react";

const ProductsSort = ({sortByCategoryButton,setProducts}) => {
  const [sortValue,setSortValue] = useState("rate")


    useEffect(() => {
        sortProducts(sortValue,sortByCategoryButton).then((response) => setProducts(response))
      },[sortValue])

      

  return (
    <>
        {/* <select onChange={(e) => setSortValue(e.target.value)}>
          <option value="rate">rate</option>
          <option value="popularity">popularity</option>
          <option value="asscending">asscending</option>
          <option value="descending">descending</option>
        </select> */}
        
    </>
  );
};
export default ProductsSort;

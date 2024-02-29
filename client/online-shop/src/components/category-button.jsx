
import { Link } from "react-router-dom";

export const CategoryButton = ({onClick,isActive,category}) => {
  return (
    <Link to={`/shop/${category}`} key={category}>
      <button
        className={
           isActive
            ? "bg-indigo-600 font-semibold text-white py-2 px-4 border border-transparent rounded w-48 mr-5"
            : "bg-transparent hover:bg-indigo-600 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded w-48 mr-5"
        }
        onClick={onClick}
      >
        {category}
      </button>
    </Link>
  );
};


 
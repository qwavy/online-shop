
import { Link } from "react-router-dom";
import { buttonStyle } from "../cva/cva";
export const CategoryButton = ({onClick,isActive,category}) => {
  return (
    <Link to={`/shop/${category}`} key={category}>
      <button
        className={buttonStyle({isActive: isActive})}
        onClick={onClick}
      >
        {category}
      </button>
    </Link>
  );
};


 
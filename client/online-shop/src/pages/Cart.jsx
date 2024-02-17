import { useEffect, useState } from "react";
import Header from "../layouts/Header";

const Cart = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetch("https://localhost:7093/cart")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, [products]);

  const deleteItem = (item) => {
    console.log(item);
    fetch(`https://localhost:7093/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <Header />

      <button onClick={() => getCartItems()}>CART</button>
      {products.map((product) => (
        <div>
          {product.title}
          <button onClick={() => deleteItem(product)}>X</button>
        </div>
      ))}
    </div>
  );
};
export default Cart;

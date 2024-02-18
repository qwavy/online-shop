import { useEffect } from "react";

export const getAllProducts = (setProducts) => {
  fetch(`https://fakestoreapi.com/products`)
    .then((res) => res.json())
    .then((data) => setProducts(data));
};

export const getSingleProduct = (id, setProduct) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct([data]));
};

export const addToCart = (item) => {
  fetch("https://localhost:7093/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

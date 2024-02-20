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

export const getCartProducts = (setProducts) => {
  fetch("https://localhost:7093/cart")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });
};

export const orderTotalCalculate = (data, setOrderTotal) => {};

export const deleteItem = (item) => {
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

export const getCartTotal = (setOrderTotal) => {
  fetch("https://localhost:7093/cart/total")
    .then((res) => res.json())
    .then((data) => {
      setOrderTotal(data);
    });
};

export const sortByCategory = (value, setProducts) => {
  if (value == "all") {
    return fetch(`https://fakestoreapi.com/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }
  fetch(`https://fakestoreapi.com/products/category/${value}`)
    .then((res) => res.json())
    .then((data) => setProducts(data));
};

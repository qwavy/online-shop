export const getCartProducts = (setProducts) => {
  fetch("https://localhost:7093/cart")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data);
    });
};

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

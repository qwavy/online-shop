const BASE_URL = "https://localhost:7093";

const getData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const getAllProducts = async (setProducts) => {
  try {
    const data = await getData(`${BASE_URL}/product`);
    // const data = await getData(`https://30fa5ea7fed7cf6b.mokky.dev/products`);

    setProducts(data);
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};

export const getSingleProduct = async (id, setProduct) => {
  try {
    const data = await getData(`${BASE_URL}/product/${id}`);
    setProduct([data]);
  } catch (e) {
    console.log(e);
  }
};

export const getCartProducts = async (setProducts) => {
  try {
    const data = await getData(`${BASE_URL}/cart`);
    setProducts(data);
  } catch (e) {
    console.log(e);
  }
};

export const orderTotalCalculate = async (data, setOrderTotal) => {};

export const getAllCategories = async (setCategories) => {
  try {
    const data = await getData(`${BASE_URL}/products/categories`);
    setCategories(data);
  } catch (e) {
    console.log(e);
  }
};



export const deleteItem = async (item) => {
  try {
    const data = await fetchData(`${BASE_URL}/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  } catch (error) {
    console.error("Error deleting item from cart:", error);
  }
};

export const addToCart = async (item) => {
  try {
    const data = await getData(`${BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCartTotal = async (setOrderTotal) => {

  try{
    const data = await getData(`${BASE_URL}/cart/total`)
    setOrderTotal(data)
  }catch(e){
    console.log(e)
  }

};

export const sortByCategory = async (value, setProducts) => {
  try{
    if (value == "all") {
       const data = await getData(`${BASE_URL}/product`)
       return setProducts(data)
    }
    const data = await getData(`${BASE_URL}/products/category/${value}`)
    setProducts(data)
  }catch(e){
    console.log(e)
  }
};

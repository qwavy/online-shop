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

const handleError = (e) => {
  handleError(e)
  throw(e)
}

export const getAllProducts = async () => {
  try {
    const data = await getData(`${BASE_URL}/product`);
    // const data = await getData(`https://30fa5ea7fed7cf6b.mokky.dev/products`);

    return data;
  } catch (error) {
    handleError(error)
  }
};

export const getSingleProduct = async (id, ) => {
  try {
    const data = await getData(`${BASE_URL}/product/${id}`);
    return data;
  } catch (e) {
    handleError(e);
  }
};

export const getCartProducts = async () => {
  try {
    const data = await getData(`${BASE_URL}/cart`);
    return data;
  } catch (e) {
    handleError(e);
  }
};


export const getAllCategories = async () => {
  try {
    const data = await getData(`${BASE_URL}/products/categories`);

    return data;
  } catch (e) {
    handleError(e);
  }
};



export const deleteItem = async (item) => {
  try {
    const data = await getData(`${BASE_URL}/cart/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  } catch (error) {
    handleError(error)
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
    handleError(e);
  }
};

export const getCartTotal = async () => {

  try{
    const data = await getData(`${BASE_URL}/cart/total`)
    return data
  }catch(e){
    handleError(e)
  }

};

export const sortByCategory = async (value) => {
  try{
    if (value == "all") {
       const data = await getData(`${BASE_URL}/product`)
       return data
    }
    const data = await getData(`${BASE_URL}/products/category/${value}`)
    return data
  }catch(e){
    handleError(e)
  }
};

export const getTopRateProducts = async () => {
  try{
    const data = await getData(`${BASE_URL}/products/topRate/`)
    return data
  }catch(e){
    handleError(e)
  }
}

export const getSearchResults = async (value) => {
  try{
    if(value == ""){
      const data = await getData(`${BASE_URL}/product`)
      return data
    }
    const data = await getData(`${BASE_URL}/products/searchResults/${value}`)
    return data
  }
  catch(e){
    handleError(e)
    throw e
  }
}


export const sortByAsscendingPrice = async (category) => {
  try{
    const data = await getData(`${BASE_URL}/products/category/${category}/sortBy/ascending`)
    return data

  }
  catch(e){
    handleError(e)
    throw e
  }
}
export const sortByDescendingPrice = async (category) => {
  try{
    const data = await getData(`${BASE_URL}/products/category/${category}/sortBy/descending`)
    return data

  }
  catch(e){
    handleError(e)
    throw e
  }
}
export const sortByPopularity = async (category) => {
  try{
    const data = await getData(`${BASE_URL}/products/category/${category}/sortBy/popularity`)
    return data

  }
  catch(e){
    handleError(e)
    throw e
  }
}
export const sortByRating = async (category) => {
  try{
    const data = await getData(`${BASE_URL}/products/category/${category}/sortBy/rate`)
    return data

  }
  catch(e){
    handleError(e)
    throw e
  }
}


export const sortProducts = async (sortMethod , category ) => {
  try{
    const data = await getData(`${BASE_URL}/products/category/${category}?sortingMethod=${sortMethod}`)
    return data
    
  }
  catch(e){
    handleError(e)
    throw e
  }
} 
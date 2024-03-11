import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartProducts,getCartTotal } from "../api/Api";
import { ProductItem } from "../templates/product-item";

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [cartTotal,setCartTotal] = useState("")
  useEffect(() => {
    getCartProducts().then((response) => setProducts(response));
    getCartTotal().then((response) => setCartTotal(response))
  }, []);

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <section className="p-20 flex justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-5xl">Express Pay</span>
            <Link
              className="font-readex text-red-600 flex text-center items-center pb-20"
              to="https://kaspi.kz/"
            >
              Kaspi
              <img
                className="w-20"
                src="data:image/png;base64,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"
              />
            </Link>
            <span className="font-bold text-xl ">Your name</span>

            <input className="border-4" />
            <span className="font-bold text-xl ">Your Last Name</span>

            <input className="border-4" />
            <span className="font-bold text-xl ">Your Address</span>

            <input className="border-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-5xl ">Order Total</span>
            <span className="font-bold text-3xl pt-10">{cartTotal}$</span>

            
          </div>
        </section>
        <section className="p-20">
          <span className="font-bold text-5xl ">Your Cart Item</span>
          <div className="w-1/3 flex flex-col">
            <ProductItem products={products} />
          </div>
        </section>
      </div>
    </>
  );
};
export default Checkout;

import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="min-h-[700px] flex justify-center items-center text-center">
      <div>
        <img src="https://as.dns-shop.kz/cart-main/images/3a7b4f1e0537fb120a20.png" />
        <div className="flex flex-col">
          <span className="font-readex font-bold text-3xl ">Empty Cart</span>
          <button className="rounded-xl">
            <Link to="/Shop/all">
              <span className="font-readex font-bold text-xl text-indigo-500">Go to Shop</span>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCartProducts, getCartTotal, deleteItem } from "../api/Api";
import { errorNotify } from "../notify/notify";
import { ToastContainer } from "react-toastify";
import { Notify } from "../components/notify";
export default function Cart() {
  const [products, setProducts] = useState([]);
  const [orderTotal, setOrderTotal] = useState([]);

  const [showNotify,setShowNotify] = useState(false)

  useEffect(() => {
    getCartProducts().then((response) => setProducts(response));
    getCartTotal().then((response) => setOrderTotal(response));
  }, [products])

  const handleDeleteItem = (product) => {
    deleteItem(product)
    setShowNotify(true)
    setTimeout(() => {
      setShowNotify(false);
    }, 2000); 

  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {products.map((product) => (
                  <li key={product.id}>
                    <Link
                      className="flex py-6 sm:py-10"
                      to={`/product/${product.id}`}
                    >
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          className="h-24 w-48 rounded-md object-contain object-center sm:h-48 sm:w-64 "
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <a
                                  href="#"
                                  className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                  {product.title}
                                </a>
                              </h3>
                            </div>
                            <div className="mt-1 flex text-sm">
                              <p className="text-gray-500">
                                {product.category}
                              </p>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {product.price}$
                            </p>
                            <p className="mt-1 text-xs font-medium text-gray-800">
                              {product.description}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <div className="absolute right-0 top-0">
                              <button
                                type="button"
                                className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 z-2"
                              >
                                <span className="sr-only">Remove</span>
                                <XMarkIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    handleDeleteItem(product)
                                    // deleteItem(product);
                                    // errorNotify();
                                  }}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2
                id="summary-heading"
                className="text-lg font-medium text-gray-900"
              >
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {orderTotal}$
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how shipping is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">{orderTotal ? "5$" : "0$"}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a
                      href="#"
                      className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Learn more about how tax is calculated
                      </span>
                      <QuestionMarkCircleIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {orderTotal ? "8.32$" : "0$"}
                    </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    {orderTotal ? Math.ceil(orderTotal + 5 + 8.32) : 0}$
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <Link to="/checkout">
                  <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </section>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Notify showNotifyProps={showNotify} notifyType="delete" message="product deleted"/>
    </>
  );
}

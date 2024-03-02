import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './pages/main-page.jsx';
import Cart from './pages/cart.jsx';
import ProductPage from './pages/product-page.jsx';
import Shop from './pages/shop.jsx';
import Checkout from './pages/checkout.jsx';
import Layout from './templates/layout.jsx';
import 'react-toastify/dist/ReactToastify.css'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {index:true, element:<MainPage/>},
      {path:'/cart',element:<Cart/>},
      {path:'/product/:productId',element:<ProductPage/>},
      {path:'/shop/:productCategory',element:<Shop/>},
      {path:'/checkout',element:<Checkout/>},
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import MainPage from './pages/MainPage.jsx';
import Cart from './pages/Cart.jsx';
import ProductPage from './pages/ProductPage.jsx';
import Shop from './pages/Shop.jsx';
import Checkout from './pages/Checkout.jsx';
import NotFound from './pages/NotFound.jsx';
import Layout from './templates/Layout.jsx';


const router = createBrowserRouter([
  // {
  //   path: "/Home",
  //   element: <MainPage/>,
  // },
  // {
  //   path:"/cart",
  //   element:<Cart/>
  // },
  // {
  //   path:"/product/:productId",
  //   element:<ProductPage/>
  // },
  // {
  //   path:"/shop/:productCategory",
  //   element:<Shop/>
  // },
  // {
  //   path:"/checkout",
  //   element:<Checkout/>
  // },
  // {
  //   path:"/adminPanel",
  //   element:<NotFound/>
  // }
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

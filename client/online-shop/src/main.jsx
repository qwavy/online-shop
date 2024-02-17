import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Cart from './pages/Cart.jsx';
import MainPage from './pages/MainPage.jsx';
import Example from './pages/two_column_with_quantity_dropdown.jsx';


const router = createBrowserRouter([
  {
    path: "/Home",
    element: <MainPage/>,
  },
  {
    path:"/cart",
    element:<Example/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

import { useState } from 'react'

import './App.css'
import { ProductList } from './features/product/components/productList'
import LoginPage from './pages/loginPage'
import { createRoot } from "react-dom/client";
import SignupPage from './pages/signupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/cartPage';
import { Checkout } from './pages/checkout';
import { ProductDetailPage } from './pages/productDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductList/>
  },
  {
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/signup",
    element:<SignupPage/>
  },
  {
    path: "/cart",
    element:<CartPage/>
  },
  {
    path: "/checkout",
    element:<Checkout/>
  },
  {
    path: "/product-details",
    element:<ProductDetailPage/>
  },

]);


const App=()=> {
  return (
   <div className="App">
    <RouterProvider router={router} />
   </div>
  )
}

export default App

import { useState } from 'react'

import './App.css'
import { ProductList } from './features/product/productList'
import LoginPage from './pages/loginPage'
import { createRoot } from "react-dom/client";
import SignupPage from './pages/signupPage';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Cart } from './features/cart/cart';

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
    element:<Cart/>
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

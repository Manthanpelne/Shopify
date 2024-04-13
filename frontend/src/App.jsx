import './App.css'
import { ProductList } from './features/product/components/productList'
import LoginPage from './pages/loginPage'
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
import { Protected } from './features/auth/components/protected';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: 
       <ProductList/>
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
    element:
   <Protected>
     <CartPage/>
   </Protected>
    
  },
  {
    path: "/checkout",
    element:<Checkout/>
  },
  {
    path: "/product-detail/:id",
    element:<ProductDetailPage/>
  },

]);



const App=()=> {
 const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  console.log(user)

  useEffect(()=>{
    if(user){
  dispatch(fetchItemsByUserIdAsync(user.id))
    }
  },[dispatch,user])

  return (
   <div className="App">
    <RouterProvider router={router} />
   </div>
  )
}

export default App

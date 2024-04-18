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
import OrderSuccessPage from './pages/orderSuccessPage';
import { UserOrders } from './features/user/components/userOrders';
import { UserProfile } from './features/user/components/userProfile';
import UserProfilePage from './pages/userProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import { Logout } from './features/auth/components/logout';
import { ForgetPass } from './features/auth/components/forgetPassword';
import { ForgetPasswordPage } from './pages/forgotPasswordPage';
import { ProtectedAdmin } from './features/auth/components/protectedAdmin';
import { AdminProductList } from './features/admin/components/adminProductList';
import { AdminProductDetails } from './features/admin/components/adminProductDetails';
import { AdminProductFormPage } from './pages/adminProductFormPage';
import AdminOrderPage from './pages/adminOrderPage';

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
    element:<Protected>
      <ProductDetailPage/>
    </Protected>
  },

  {
    path: "/order-success/:id",
    element:<OrderSuccessPage/>
  },
  {
    path: "/myOrders",
    element:<Protected>
          <UserOrders/>
         </Protected>
  },
  {
    path: "/user-profile",
    element:<Protected>
          <UserProfilePage/>
         </Protected>
  },

  {
    path:"/logout",
    element:<Logout/>
  },
  {
    path:"/forgotPassword",
    element:<ForgetPasswordPage/>
  },

  {
    path:"/admin",
    element:<ProtectedAdmin>
      <AdminProductList/>
    </ProtectedAdmin> 
  },

  {
    path:"/admin/product-detail/:id",
    element:<ProtectedAdmin>
      <AdminProductDetails/>
    </ProtectedAdmin> 
  },
  {
    path:"/admin/product-form",
    element:<ProtectedAdmin>
      <AdminProductFormPage/>
    </ProtectedAdmin> 
  },
  
  {
    path:"/admin/product-form/edit/:id",
    element:<ProtectedAdmin>
      <AdminProductFormPage/>
    </ProtectedAdmin> 
  },

  {
    path:"/admin/orders",
    element:<ProtectedAdmin>
      <AdminOrderPage/>
    </ProtectedAdmin> 
  },
  


]);



const App=()=> {
 const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  //console.log(user)

  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id))
       dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch,user])

  return (
   <div className="App">
    <RouterProvider router={router} />
   </div>
  )
}

export default App

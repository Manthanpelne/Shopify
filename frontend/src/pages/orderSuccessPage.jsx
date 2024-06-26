import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetCartAsync } from '../features/cart/cartSlice'
import { selectLoggedInUser } from '../features/auth/authSlice'
import { resetOrder } from '../features/orders/orderSlice'
import { selectUserInfo } from '../features/user/userSlice'
import { Navigate } from 'react-router-dom'
import Footer from '../features/common/footer'

function OrderSuccessPage() {
    const params = useParams()
    const dispatch = useDispatch()
    //const user = useSelector(selectUserInfo)
    
    

    useEffect(()=>{
      //reset cart
    dispatch(resetCartAsync())
    //reset currentOrder
    dispatch(resetOrder())
    },[dispatch])

  return (
    <>
    <div>
      {!params.id && <Navigate to='/' replace={true}></Navigate>}
      <div className='flex justify-between bg-gray-100 mt-2'>
        <h1 className=" text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold">Order Success</h1>
        <Link to="/"><h1 className='text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">Order ID : {params?.id}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-700 sm:text-3xl ">Order successfully placed! 🎉🎉</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">You can check your order history in <Link to="/myOrders">My Orders</Link></p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
             to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main> 
    </div>
    <Footer/>
    </>
  )
}

export default OrderSuccessPage
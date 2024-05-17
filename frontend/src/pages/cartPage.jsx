import React from 'react'
import { Cart } from '../features/cart/cart'
import { Link } from 'react-router-dom'
import { selectLoggedInUser } from '../features/auth/authSlice'

const CartPage=()=> {
  //const user = useSelector(selectLoggedInUser)
  return (
    <div>
       <div className='flex justify-between bg-gray-100 mt-2'>
        <h1 className=" text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold">MY CART</h1>
        <Link to="/"><h1 className='text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
        <Cart/>
    </div>
  )
}

export default CartPage
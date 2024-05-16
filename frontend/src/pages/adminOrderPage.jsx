import React from 'react'
import { AdminOrders } from '../features/admin/components/adminOrders'

const AdminOrderPage=()=>{
  return (
    <> 
    <div className='flex justify-between bg-gray-800 mt-2'>
    <h1 className=" text-white m-4 p-1 text-[14px] mt-3 font-semibold">ORDERS</h1>
    <Link to="/"><h1 className='text-white m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
  </div>
    <AdminOrders/>
    </>
  )
}

export default AdminOrderPage
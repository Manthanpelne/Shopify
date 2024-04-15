
import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { fetchLoggedInUserOrders } from "../userApi"
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice"
import { selectLoggedInUser } from "../../auth/authSlice"


export const UserOrders = () => {
  const dispatch = useDispatch()
 const user = useSelector(selectLoggedInUser)
 //console.log(user)
 const orders = useSelector(selectUserOrders)
 //console.log(orders)


useEffect(()=>{
dispatch(fetchLoggedInUserOrdersAsync(user.id))
},[])

  return (
 <div>
   {orders.map((item)=>(
    <div>
      <h1>Items ordered</h1>
     <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="border-t bg-white border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {item.items.map((product) => (
                              <>
                              <h1 className="p-2 text-sm font-semibold">Product ID : {product.id}</h1>
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.title}</a>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    
                                    <div className="text-gray-500">
                                      <label htmlFor="quantity" className="inline mr-5">Quantity: {product.quantity}</label>
                                     
                                    </div>
                                   
                
                                  </div>
                                </div>
                              </li>
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    

                    <div className="border-t bg-white border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${item.totalAmount}</p>
                      </div>
                      <div className="pt-4 text-gray-500">  
                      
                                    <p className="font-semibold">Shipping Address : </p>
                                    <p className="text-sm">{item.selectedAddress.street}</p>
                        
                                    <p className="text-sm">{item.selectedAddress.state}</p>
                                    <p className="text-sm">{item.selectedAddress.pinCode}</p>
                  
                                    </div>
                      <div className="flex justify-between font-semibold pt-5">
                        <p>Delivery status</p>
                        <p className="text-red-500">{item.status}</p>
                      </div>
                    </div>
 </div>
    </div>
   ))}
 </div>
  )

}
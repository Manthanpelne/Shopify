import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrders } from "../userApi";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { discountedPrice } from "../../../app/constants";
import { selectUserInfo } from "../userSlice";
import { Link } from "react-router-dom";

export const UserOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);
  //console.log(orders)
  //console.log(orders)

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);

  return (
    <>
     <div className='flex justify-between bg-gray-100 mt-2'>
        <h1 className=" text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold">MY ORDERS</h1>
        <Link to="/"><h1 className='text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
    {orders?.length ? 
    <div>
      {orders &&
        orders.map((item) => (
          <div>
            <div className="mx-auto mt-10 border bg-white border-gray-400 max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="border bg-white border-gray-200 px-4 py-2 sm:px-6">
                <h1 className="p-2 text-sm font-semibold py-4">
                  Product ID : {item.id}
                </h1>
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {item.items.map((product) => (
                      <>
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.product.thumbnail}
                              alt={product.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.product.href}>
                                    {product.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ${discountedPrice(product.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5"
                                >
                                  Quantity: {product.quantity}
                                </label>
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
    </div> :
      <>
      <div className="lg:w-[400px] lg:h-auto border m-auto my-12">
        <img src="https://cdn-icons-png.flaticon.com/512/2424/2424106.png" alt="" />
      <h1 className="text-center text-xl font-bold">Your orders are empty!📦</h1>
        <h1 className="text-center">You haven't ordered anything yet! 🛒 </h1>
      </div>
      </>
  }
    </>
  );
};

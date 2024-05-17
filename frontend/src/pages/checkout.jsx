import React from "react";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../features/cart/cartSlice";
import { updateCartAsync, deleteItemFromCartAsync } from "../features/cart/cartSlice";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/user/userSlice";
import { createOrderAsync, selectCurrentOrder } from "../features/orders/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";
import { discountedPrice } from "../app/constants";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];


export const Checkout = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectUserInfo)
  //console.log(user)

  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()
  const items = useSelector(selectItems)
  const currentOrder = useSelector(selectCurrentOrder)
 

  const totalAmount = items.reduce((amount,item)=>discountedPrice(item.product) * item.quantity + amount, 0)
  const totalItems = items.reduce((total,item)=>item.quantity + total, 0)


  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState("cash")

const handleQuantity=(e,product)=>{
dispatch(updateCartAsync({id:product.id, quantity: +e.target.value}))
}

const handleDelete =(e,id)=>{
dispatch(deleteItemFromCartAsync(id))
}

const handleAddress = (e)=>{
  setSelectedAddress(user.addresses[e.target.value])
}


const handlePayment = (e)=>{
  console.log(e.target.value)
  setPaymentMethod(e.target.value)
}

const handleOrder = (e)=>{
  const order = {items, totalAmount, totalItems, user:user.id, paymentMethod, selectedAddress, status:"pending"}
 dispatch(createOrderAsync(order))
}


  return (
    <>
      {!items.length && <Navigate to="/products" replace={true}></Navigate> }
      {currentOrder && currentOrder.paymentMethod ==="cash" && <Navigate to={`/OrderSuccess/${currentOrder.id}`} replace={true}></Navigate> }
      {currentOrder && currentOrder.paymentMethod ==="card" && <Navigate to={`/stripe-checkout/`} replace={true}></Navigate> }
    <div className="mx-auto mt-5 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-4 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form 
          onSubmit={handleSubmit((data)=>{
            console.log(data)
            dispatch(
              updateUserAsync({...user, addresses:[...user.addresses, data]})
            );
            reset();
          })}
          >
            <div className="space-y-12 bg-white px-6">
              <div className="border-b border-gray-900/10 pb-12">
                <p className="text-center text-sm font-bold text-gray-500 pt-3">
                  CHECKOUT
                </p>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Personal Information
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                     Full name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("name",{required:"Name is required"})}
                        id="first-name"
                        autoComplete="given-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("email",{required:"Email is required"})}
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register("phone",{required:"phone is required"})}
                        type="tel"
                        autoComplete="phone"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("street",{required:"Street Address is required"})}
                        id="street-address"
                        autoComplete="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("city",{required:"City is required"})}
                        id="city"
                        autoComplete="address-level2"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("state",{required:"state is required"})}
                        id="region"
                        autoComplete="address-level1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register("pinCode",{required:"pinCode is required"})}
                        id="postal-code"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-center flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-md bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save Address
              </button>
            </div>

                <div className="pt-7">
                  <p className="text-sm font-semibold text-gray-700">
                    OR choose from existing addresses
                  </p>

                  <ul role="list" className="divide-y mt-4 divide-gray-300 border-2">
                    {user.addresses.map((person,index) => (
                      <li
                        key={index}
                        className="lg:flex justify-between gap-x-6 py-3 px-4"
                      >
                        <div className="flex min-w-0 gap-x-4">
                          <input
                          onChange={handleAddress}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            className="h-4 w-4 mt-2 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                              {person.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                              {person.state}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                              {person.pincode}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 sm:flex sm:flex-col sm:items-end lg:items-start">
                          <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                            {person.city}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-600">
                            {person.phone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900 pt-9">
                    PAYMENT METHODS
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    These are delivered via SMS to your mobile phone.
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        type="radio"
                        checked={paymentMethod === "cash"}
                        value="cash"
                        className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payments"
                        onChange={handlePayment}
                        type="radio"
                        checked={paymentMethod === "card"}
                        value="card"
                        className="h-4 w-4 border-gray-500 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
        <div className="lg:col-span-2">
        <div className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
    <div className="border-t bg-white border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {items.map((product) => (
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
                                        <a href={product.product.href}>{product.product.title}</a>
                                      </h3>
                                      <p className="ml-4">${discountedPrice(product.product)}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.product.brand}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    
                                    <div className="text-gray-500">
                                      <label htmlFor="quantity" className="inline mr-5">Quantity</label>
                                    <select name="" id="" onChange={(e)=>handleQuantity(e,product)} value={product.quantity}>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                    </select>
                                    </div>
                                   
                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={(e)=>handleDelete(e,product.id)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    

                    <div className="border-t bg-white border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalAmount}</p>
                      </div>
                      <div className="flex justify-between my-4 text-base font-medium text-gray-900">
                        <p>Total Items in cart</p>
                        <p>{totalItems}</p>
                      </div>
                      
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <button
                          onClick={handleOrder}
                          className="flex items-center w-full justify-center rounded-md border border-transparent bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Order Now
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-gray-600 hover:text-gray-800"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
 </div>
        </div>
      </div>
    </div>
    </>
  );
};

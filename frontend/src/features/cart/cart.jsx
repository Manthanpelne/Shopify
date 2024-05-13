
import {Fragment, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { deleteItemFromCartAsync, selectCartLoaded, selectItems, updateCartAsync } from "./cartSlice"
import { discountedPrice } from "../../app/constants"

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // More products...
]

  
  export const Cart = () => {
    const [open, setOpen] = useState(true)
    const dispatch = useDispatch()
    const items = useSelector(selectItems)
    const cartLoaded = useSelector(selectCartLoaded)

    const totalAmount = items.reduce((amount,item)=>discountedPrice(item.product) * item.quantity + amount, 0)
    const totalItems = items.reduce((total,item)=>item.quantity + total, 0)


const handleQuantity=(e,product)=>{
  console.log(product)
 dispatch(updateCartAsync({id:product.id, quantity: +e.target.value}))
}

const handleDelete =(e,id)=>{
 dispatch(deleteItemFromCartAsync(id))
}

  return (
    <div>
    {!items.length && cartLoaded && <Navigate to="/products" replace={true}></Navigate> }
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
                                        <a href={product.product.id}>{product.product.title}</a>
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
                        <Link to="/checkout">
                        <a
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
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
  )

}

import React, { useState } from "react";
import { NavLinks } from "./navlinks";
import { SearchBar } from "./searchBar";
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectItems } from "../cart/cartSlice";
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserInfo } from '../user/userSlice';


const navigation = [
  { name: 'Products', link: '/products', user: true },
  { name: 'Manage Products', link: '/admin-productsPage', admin: true },
  { name: 'Orders', link: '/admin/orders', admin: true },

];
const userNavigation = [
  { name: 'My Profile', link: '/user-profile' },
  { name: 'My Orders', link: '/myOrders' },
  { name: 'Log out', link: '/logout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export const NavBar = ({children}) => {
    const [open, setOpen] = useState(false)
    const items = useSelector(selectItems);
    const userInfo = useSelector(selectUserInfo);
    //console.log(userInfo)
  
  return (
    <div className="relative z-10">
      <div>
        <div className="flex bg-zinc-400 justify-between">
          <div>
            <Link to="/">
          <p className="font-semibold ml-12 mt-4 hover:text-gray-600">Shopify</p>
            </Link>
          </div>
          <div className="text-black sm:flex hidden justify-evenly space-x-9 m-4 mr-20">
            <p>Find a store</p>
            <p>Help</p>
            <p>Join Us</p>
            <Link to="/signup"><p>Sign up</p></Link>
          </div>
          <p className="md:hidden mt-3 px-11">Sign In</p>
        </div>
        <div className="flex justify-around h-20 bg-gray-600">
          <div className="z-50 md:w-auto w-full flex justify-between">
             <div className="p-3 cursor-pointer text-gray-200 hover:bg-slate-700 rounded-lg md:hidden text-3xl" onClick={()=>setOpen(!open)}>
          <ion-icon name={`${open?"close":"menu"}`}></ion-icon>
          </div>
          </div>
          <div className="mr-46">
            <ul className="md:flex hidden items-center gap-10 mt-5 ml-20">
              <NavLinks />
            </ul>
          </div>
           <SearchBar/>
        </div>
        {/*mobile*/}
        <ul className={`md:hidden bg-gray-800 absolute w-full h-full text-left mt-1 duration-500 ${open?"left-0":"left-[-110%]"}`}>
              <NavLinks />
            </ul>
      </div>
      {userInfo &&<div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-4">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                   
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) =>
                          item[userInfo.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-md font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mr-12">
                      <h1 className="text-white">Shop, Celebrate & Customize with us.</h1>
                      <p className="text-gray-200 px-10 font-bold sm:flex hidden">40% OFF on Accessories</p>
                    </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="rounded-full bg-gray-800 p-1 pr-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {items.length > 0 && (
                        <span className="inline-flex items-center mr-4 rounded-md mb-7 -ml-3 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          {items.length}
                        </span>
                      )}

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://th.bing.com/th/id/OIP.1mSyfMp-r01kxBYitbubbAHaHa?w=199&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) =>
                          item[userInfo.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={classNames(
                                item.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://th.bing.com/th/id/OIP.1mSyfMp-r01kxBYitbubbAHaHa?w=199&h=206&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {/* this should come from userInfo */}
                        {userInfo.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {userInfo.email}
                      </div>
                    </div>
                    
                    <Link to="/cart">
                      <button
                        type="button"
                        className="ml-auto px-5 flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>
                    </Link>
                    {items.length > 0 && (
                      <span className="inline-flex items-center rounded-md bg-red-50 mb-7 -ml-3 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                              <Menu key={item.name}>
                                {({ active }) => (
                                  <Link
                                    to={item.link}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-100'
                                    )}
                                  >
                                    {item.name}
                                  </Link>
                                )}
                              </Menu>
                            ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>}
    </div>
  );
};

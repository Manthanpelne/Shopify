import React from 'react'

export const SearchBar = () => {
  return (
    <div className='md:flex hidden'>
    <div className="mt-6 bg-gray-700 w-12 h-10 pt-3 m-3">
       <ion-icon name="search-outline"></ion-icon>
    </div>
    <div className='mt-6 bg-gray-700 w-12 h-10 pt-3 m-3'>
       <ion-icon name="heart-outline"></ion-icon>
    </div>
    <div className='mt-6 bg-gray-700 w-12 h-10 pt-3 m-3'>
    <ion-icon name="cart-outline"></ion-icon>
    </div>
    </div>
  )
}

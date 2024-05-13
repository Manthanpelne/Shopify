import React from 'react'
import { Link } from 'react-router-dom'

export const SearchBar = () => {
  return (
    <div className='md:flex hidden'>
    <div className="mt-6 bg-gray-400 w-12 h-10 pt-2 pl-4 m-3 hover:bg-gray-300">
       <ion-icon name="search-outline"></ion-icon>
    </div>
    <div className='mt-6 bg-gray-400 w-12 h-10 pt-2 pl-4 m-3 hover:bg-gray-300'>
       <ion-icon name="heart-outline"></ion-icon>
    </div>
      <Link to="/cart">
    <div className='mt-6 bg-gray-400 w-12 h-10 pt-2 pl-4 m-3 hover:bg-gray-300'>
    <ion-icon name="bag-handle-outline"></ion-icon>
    </div>
      </Link>
    </div>
  )
}

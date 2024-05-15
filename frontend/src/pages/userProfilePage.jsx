import React from 'react'
import { UserProfile } from '../features/user/components/userProfile'
import { Link } from 'react-router-dom'

function UserProfilePage() {
  return (
    <div>
      <div className='flex justify-between bg-gray-800 mt-2'>
        <h1 className=" text-white m-4 p-1 text-[14px] mt-3 font-semibold">MY PROFILE</h1>
        <Link to="/"><h1 className='text-white m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
        <UserProfile/>
    </div>
  )
}

export default UserProfilePage
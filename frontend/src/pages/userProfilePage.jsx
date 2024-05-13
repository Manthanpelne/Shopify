import React from 'react'
import { UserProfile } from '../features/user/components/userProfile'

function UserProfilePage() {
  return (
    <div>
        <h1 className="bg-gray-700 text-white m-4 p-2 text-[12px] mt-3">MY PROFILE</h1>
        <UserProfile/>
    </div>
  )
}

export default UserProfilePage
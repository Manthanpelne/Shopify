import { Link } from "react-router-dom"
import { ResetPass } from "../features/auth/components/resetPassword"


export const ResetPassword=()=>{
return (
    <>
     <div className='flex justify-between bg-gray-100 mt-2'>
        <h1 className=" text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold">RESET PASSWORD</h1>
        <Link to="/"><h1 className='text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
    <ResetPass/>
    </>
)
}
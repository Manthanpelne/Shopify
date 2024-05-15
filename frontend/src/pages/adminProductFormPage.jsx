import { Link } from "react-router-dom"
import { ProductForm } from "../features/admin/components/productForm"



export const AdminProductFormPage=()=>{
    return (
     <div>
         <div className='flex justify-between bg-gray-700 mt-2'>
        <h1 className=" text-white m-4 p-1 text-[14px] mt-3 font-semibold">ADD ITEMS</h1>
        <Link to="/"><h1 className='text-white m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
         <ProductForm/>
     </div>
    )
 }
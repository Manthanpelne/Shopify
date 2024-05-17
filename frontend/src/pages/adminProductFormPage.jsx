import { Link } from "react-router-dom"
import { ProductForm } from "../features/admin/components/productForm"



export const AdminProductFormPage=()=>{
    return (
     <div>
        <div className='flex justify-between bg-gray-100 mt-2'>
        <h1 className=" text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold">PRODUCT FORM</h1>
        <Link to="/"><h1 className='text-gray-700 m-4 p-1 text-[14px] mt-3 font-semibold'>HOME</h1></Link>
      </div>
         <ProductForm/>
     </div>
    )
 }
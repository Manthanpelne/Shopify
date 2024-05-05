import { AdminProductDetails } from "../features/admin/components/adminProductDetails"
import { NavBar } from "../features/navbar/header"

export const ProductDetailPage=()=>{
   return (
    <div>
        <NavBar>
        <AdminProductDetails/>
        </NavBar>
    </div>
   )
}
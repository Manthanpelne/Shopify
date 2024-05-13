import { NavBar } from "../features/navbar/header"
import { ProductDetails } from "../features/product/components/productDetails"


export const ProductDetailPage=()=>{
   return (
    <div>
        <NavBar>
        <ProductDetails/>
        </NavBar>
    </div>
   )
}
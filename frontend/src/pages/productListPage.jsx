import Footer from "../features/common/footer"
import { NavBar } from "../features/navbar/header"
import { ProductList } from "../features/product/components/productList"


export const ProductListPage=()=>{
   
    return(
        <>
        <NavBar>
            <ProductList/>
        </NavBar>
        <Footer/>
        </>
    )
}
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

export const ProtectedAdmin=({children})=>{
 const user = useSelector(selectLoggedInUser)

 if(!user){
    return <Navigate to="/login" replace={true}></Navigate>
 }else if(user && user.role!=="admin"){
    return <Navigate to="/admin" replace={true}></Navigate>
 }
 return children
}
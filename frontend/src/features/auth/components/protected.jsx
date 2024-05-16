import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";


export const Protected=({children})=>{
 const user = useSelector(selectLoggedInUser)
 //console.log(user)

 if(user?.error==="Unauthorized"){
   toast.error("Login first")
    return <Navigate to="/login" replace={true}></Navigate>
 }
 return children
}
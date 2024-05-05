import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

export const ProtectedAdmin=({children})=>{
 const user = useSelector(selectLoggedInUser)
 const userInfo = useSelector(selectUserInfo)
 console.log(userInfo)

 if(!user){
    return <Navigate to="/login" replace={true}></Navigate>
 }else if(userInfo && userInfo.role!=="admin"){
    return <Navigate to="/" replace={true}></Navigate>
 }
 return children
}
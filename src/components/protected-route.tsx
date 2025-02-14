import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function PotectedRoute({children}:{
    children:React.ReactNode;

})
{
    const user = auth.currentUser
    console.log(children);
    if(!user){
        return <Navigate to="/login"/>;
    }
    return children
}
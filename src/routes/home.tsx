import { auth } from "../firebase"
import { useNavigate } from "react-router-dom";
export default function Home() {
   const nav = useNavigate()
   function onClick(){
      auth.signOut();
      nav("/login")
   }
    return (
    <>
       <h1>
      <button onClick={onClick}>LogOut</button>
      </h1>
   </>
   )
}
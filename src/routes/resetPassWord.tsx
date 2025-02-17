
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail} from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/git-btn";
import GoogleBtn from "../components/google-btn";


export default function CreateAccount(){
    const navigate  = useNavigate();
    const[isLoading,setIsLoading] = useState(false);
    
    const[email,setEmail] = useState("");
    const [error,setError] = useState("");
     
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        
        const{target : {name,value}} = e;
         if(name === "email"){
           
            setEmail(value)
        }
    }
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(isLoading &&email === "")return;
        
        try {
            setIsLoading(true);
           await sendPasswordResetEmail(auth,email);
            alert("이메일이 전송 되었습니다.")
           navigate("/");
          } catch (e) {
            if(e  instanceof FirebaseError){
                console.log(e.message);
                setError(e.message);
            }
            console.log(e);
            // setError(e);
          } finally {
            setIsLoading(false);
          }
    }
    return(
        <>
        <Wrapper>
            <Title>ResetPassWord</Title>
       <Form onSubmit={onSubmit}>
 
    <Input
        name="email"
        value={email}
        placeholder="Email"
        type="email"
        onChange={onChange}
        required/>
 
    <Input type="submit" value={isLoading ?"Loading" : "send Email"} />
   
</Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
        Don't you have a account??<Link to="/create-account">Sing In</Link>
    </Switcher>
    <Switcher>
    Don't you remember password??<Link to="/resetPassWord">resetPassWord</Link>
    </Switcher>
    <GithubButton/>
    <GoogleBtn/>
    </Wrapper>
        </>
    )
}

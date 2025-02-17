
import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GithubButton from "../components/git-btn";


export default function CreateAccount(){
    const navigate  = useNavigate();
    const[isLoading,setIsLoading] = useState(false);
    
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [error,setError] = useState("");
     
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        
        const{target : {name,value}} = e;
         if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(isLoading &&email === ""||password === "")return;
        try {
            setIsLoading(true);
           await signInWithEmailAndPassword(auth,email,password);
           
         
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
            <Title>Log into X</Title>
       <Form onSubmit={onSubmit}>
 
    <Input
        name="email"
        value={email}
        placeholder="Email"
        type="email"
        onChange={onChange}
        required/>
    <Input
        name="password"
        value={password}
        placeholder="password"
        type="password"
        onChange={onChange}
        required/>
    <Input type="submit" value={isLoading ?"Loading" : "log in"} />
   
</Form>
    {error !== "" ? <Error>{error}</Error> : null}
    <Switcher>
        Don't you have a account??<Link to="/create-account">Sing In</Link>
    </Switcher>
    <GithubButton/>
    </Wrapper>
        </>
    )
}

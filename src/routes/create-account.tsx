import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { Error, Input, Switcher, Title, Wrapper, Form} from "../components/auth-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import GitLogin from "../components/git-btn";
import GoogleBtn from "../components/google-btn";


export default function CreateAccount(){
    const navigate  = useNavigate();
    const[isLoading,setIsLoading] = useState(false);
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const [error,setError] = useState("");
     
    function onChange(e:React.ChangeEvent<HTMLInputElement>){
        
        const{target : {name,value}} = e;
        if(name === "name"){
            setName(value)
        }else if(name === "email"){
            setEmail(value)
        }else if(name === "password"){
            setPassword(value)
        }
    }
  const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(isLoading &&name === ""||email === ""||password === "")return;
        try {
            setIsLoading(true);
           const create = await createUserWithEmailAndPassword(auth,email,password);
           console.log(create.user);
           await updateProfile(create.user,{
            displayName : name,
           });
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
        name="name"
        value={name}
        placeholder="Name" 
        type="text"
        onChange={onChange}
        required/>
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
    <Input type="submit" value={isLoading ?"Loading" : "Create Account"} />
    {error !== "" ? <Error>{error}</Error> : null}
</Form>
    <Switcher>
      Don't you have a account??<Link to="/login">Log in</Link>
    </Switcher>
    <GitLogin/>
    <GoogleBtn/>
        </Wrapper>
        </>
    )
}

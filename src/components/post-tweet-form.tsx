import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db ,stroage  } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input`
  display: none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm(){
    const[tweet,setTweet] = useState("");
    const[state,setState] = useState(false);
    const [file,setFile] = useState<File|null>(null);
    function onChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        setTweet(e.target.value);
    }
    function onFileChange(e:React.ChangeEvent<HTMLInputElement>){
        const {files} = e.target;
        const fileMaxSize = 5 * 1024* 1024;
            if(files&&files[0].size>fileMaxSize){ 
                console.log(files[0].size);
               alert("this file is to heavy")
               return;
            }
        if(files&& files.length === 1 ){
            setFile(files[0]);
        }
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || state || tweet === "" || tweet.length > 180) return;
        try {
          setState(true);
        const doc=  await addDoc(collection(db, "tweets"), {
            tweets :tweet,
            createdAt: Date.now(),
            username: user.displayName || "Anonymous",
            userId: user.uid,
            
          });
          if (file) {
            
            const locationRef = ref(
                stroage,
              `tweets/${user.uid}-${user.displayName}/${doc.id}`
            );
            const result = await uploadBytes(locationRef, file);
            const url = await getDownloadURL(result.ref);
            await updateDoc(doc, {
              photo: url,
            });
          }
          setTweet("");
          setFile(null);
          
        } catch (e) {
          console.log(e);
        } finally {
            setState(false);
        }
      };
    return (
        <Form onSubmit={onSubmit}>
            <TextArea required placeholder="textArea" value={tweet} onChange={onChange}/>
            <AttachFileButton htmlFor="file">{file ? "your image upload complete":"add photo"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={state ? "loading" : "Post Tweet"}/>
        </Form>
    );
}
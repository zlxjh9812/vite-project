import styled from "styled-components";
import { ITweet } from "./TimeLine";
import { auth, db, stroage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;`;
const Column = styled.div``;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;`;
const Username = styled.span`
  font-weight: 600;
  font-size: 15px;`;
const Payload = styled.p`
margin: 10px 0px;
  font-size: 18px;`;
const DeleteBtn = styled.button``;

export default function Tweet({username,photo,tweet,userId,id}:ITweet){
    const user = auth.currentUser;
    const btnDel = async() =>{
        const ok = confirm("Are you sure you wnat to delete this tweet?");
        if(ok && user?.uid !== userId && user !== null){
            console.log(user?.uid);
            return;
        }else{
            try{
                await deleteDoc(doc(db, "tweets", id));
                if(photo){
                    const photoRef = ref(stroage,`tweets/${user.uid}-${user.displayName}/${id}`)                     
                    console.log(photoRef.fullPath);
                    await deleteObject(photoRef);
                }
            }catch(e){
                console.log(e)
            }finally{

            }
        }
    }
    return(
        <Wrapper>
            <Column>
            <Username>{username}</Username>
            <Payload>{tweet}</Payload>
            {user?.uid !== userId ? null :  <DeleteBtn onClick={btnDel}>Delte</DeleteBtn>}
           
            </Column>
          {photo ? (
            <Column>
                <Photo  src={photo} />
            </Column>
          ) : null}
        </Wrapper>
    );
}
import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import TimeLine from "../components/TimeLine";

const Wrapper = styled.div`
   display:flex;
   gao:20px;
   overfilow-y:scroll;
   grid-templaye-rows :1fr 5fr;
`;
export default function Home() {
 
    return (
    <Wrapper>
      <PostTweetForm/>
      <TimeLine/>
   </Wrapper>
   )
}
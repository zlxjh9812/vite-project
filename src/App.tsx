import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import PotectedRoute from "./components/protected-route";
import ResetPassWord from "./routes/resetPassWord";
const router = createBrowserRouter([
 {
  path:"/",
  element : 
  <PotectedRoute>
  <Layout/>
  </PotectedRoute>,
  children:[
    {
      path:"",
      element:

        <Home/>

    },
    {
      path:"/profile",
      element:

        <Profile/>

    }
  ]
 },
 {
  path:"/login",
  element:<Login/>, 
 },
 {
  path:"/create-account",
  element:<CreateAccount/>
},
{
  path:"/resetPassWord",
  element:<ResetPassWord />
} 

])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
function App() {
 const [isLoading,setIsLoading] = useState(true);
 const init = async()=>{
  await auth.authStateReady();
  setIsLoading(false);
 }
 useEffect(()=>{
  init();
 },[])
  return (
  <Wrapper>
  <GlobalStyles/>
    {isLoading ? <LoadingScreen/> : <RouterProvider router={router} />}
  </Wrapper>
   
  );
}

export default App

<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
>>>>>>> 37ba25775cf34c2194dc6ac74c312cd0164e6484
}

export default App

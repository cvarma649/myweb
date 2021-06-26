import React from 'react';
import "./HomePage.css";
import VideoList from "../Video/VideoList";
import ProductLayout from "../Shopping/ProductLayout";
import About1 from "../AboutPage/About1";
import {useState, useEffect} from "react";


function HomePage({auth}) {
  const[greeting, setGreeting]=useState("");

  
  const [name, setName]=useState("")
  const getName = () =>{
   if(auth){
    try {
      const n= localStorage.getItem("user_name")
      setName(n)
      setGreeting(`Hello ${name}`)   
    } catch (error) {
      setGreeting("Hello There")
    }}else{
      setGreeting("Hello There")
    }
   
  }

      useEffect(()=>{
        getName()
      })
  

    return (
      <div className="home"> 
        <div className="about">
          <div className="greeting">
            {greeting}
          </div>
          <About1/>
        </div>
        <div className="product-list">
          <ProductLayout/>
        </div>
        <div className="video-list">
          <VideoList/>
        </div>
        <hr/>
        <div className="bottom">
          
          <p>© 2021 Chhavi Varma | All Rights Reserved   </p>
          <img src={`${process.env.PUBLIC_URL}/assets/Chhavi.png`} alt="chhavi-logo"/>
        </div>
      </div>
    )
}

export default HomePage;

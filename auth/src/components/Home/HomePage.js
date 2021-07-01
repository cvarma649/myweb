import React from 'react';
import "./HomePage.css";
import VideoList from "../Video/VideoList";
import ProductLayout from "../Shopping/ProductLayout";
import About1 from "../AboutPage/About1";
import {useState, useEffect} from "react";
import ProductPop from"../Shopping/ProductPop";

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
   const content= <div className="bach2">
      {`This website is a ReactJs website built with the help of NodeJs with an Express Server and Postgresql Database. An 
      Nginx was used to configure the server proxy on an AWS EC2 Ubuntu 20.0.4 server. AWS Route 53 was used to manage the DNS records.
      Mailgun services were used for transactional and contact emails via APIs. The styling is done with pure CSS. Storage facilities like Cloudinary have been used for video storage.
      A mock yet fully working online shopping segment and a video streaming segment is exhibited for better understanding of developer skills. `}</div>

    return (
      <div className="home"> 
        <div className="about">
          <div className="greeting">
            {greeting}
          </div>
          <About1/>
             <div className="pop-contain1">
         <ProductPop className="prod_pop" content={content} />
         </div>
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

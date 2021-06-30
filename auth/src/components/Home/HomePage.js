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
      {`This is a Mock Shop, connected to a real database. There are provisional tables in the database for orders and carts, dynamic to the user, but they have not been used for the sake of simplicity. 
      A Postgresql Database was set up with the help of NodeJs and ExpressJs to store all the products with
      their names, prices, descriptions, images etc. Owing to their small number, product images were stored locally via Multer and knex and then saved in the form of 
      filename and mimetype to database that can be used in urls to access the respective images. 
      Use Reducer and Use Context Hooks used for State management of the product quantity and in-cart management. 
      Ps: You will not be able to access the Cart or the Video server untill you are authenticated.`}</div>

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

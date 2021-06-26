import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./VideoList.css";
import ProductPop from "../Shopping/ProductPop";

function VideoList() {
   const [videos, setVideos]= useState([]);
   const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"
   const getVideos = async()=>{
       try {
        const res= await fetch(`${baseUrl}/uploads`,{
            method:"GET"
        })
        const jData = await res.json()
        setVideos(jData)
       } catch (err) {
           console.log(err.message)
       }
       
   }
   useEffect(()=>{
       getVideos();
   },[])
     
   const content=
   <div className="bach">
       {`This video thumbnail is actually an array, although with just one video uploaded yet.
       This array is connected to a video server created with the help of Node js Express Js and a cloud storage facility
       called Cloudinary. The public_id of each video with it's size was saved to the video table in the Postgresql Database
       to access it. Ps: i)The video you will see has been made by Yours Truly on Adobe After Effects and Adobe Premiere Pro.
       ii) You will not be able to access the Cart or the Video server untill you are authenticated.
       `}
   </div>

    return (
        <div className="big_contain">
            <div className="main-contain">
                <div className="tidle">
                    <h2>Watch An Animated Video I made</h2>
                    <div className="pop-contain">
                    <ProductPop className="prod_pop" content={content}/>
                    </div>
                </div>
                {videos.map(video=>(
                <div className="img-contain" key={video.video_id}> 
                <Link to={`/video/${video.video_id}`}><img src={video.thumbnail} alt="thumnail1"/></Link>
                </div>
           ))}
                <div className="pop-containx">
                <ProductPop className="prod_pop" content={content}/>
                </div> 
           </div>
        </div>
)}

export default VideoList;

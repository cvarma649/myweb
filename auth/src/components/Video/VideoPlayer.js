import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player';
import "dotenv";
import "./VideoPlayer.css"

function VideoPlayer(props) {
        const [video,setVideo]=useState("")
        const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"

        const getVideo=async()=>{
            try {
                const res = await fetch(`/api/v1/uploads/${props.match.params.tid}`,{
                    method:"GET"
                })
                const resvid= await res.json()
                setVideo(resvid[0])
                console.log(resvid)
            } catch (err) {
                console.log(err.message)
            }
           
        }

const hey=()=>console.log(video);

    useEffect(()=>{
        hey();
      getVideo(video.video_id);
    },[])

    return (
        <div>
            <div key={video.video_id}>
            <ReactPlayer className="react-player" url={`${process.env.REACT_APP_VIDEOURL}/${video.video}`} controls="true" width='70%'
          height='70%'/>
        </div>
        </div>
    )
}

export default VideoPlayer;

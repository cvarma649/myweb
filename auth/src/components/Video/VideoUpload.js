import React, {useState} from 'react';
import Axios from "axios";
import FormData from "form-data";
import "dotenv";
import VideoPlayer from './VideoPlayer';

function VideoUpload() {
    const [fileSelected, setFileSelected]= useState([])
    const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"
    const uploadFile=()=>{
        const formData = new FormData();
        formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`);
        formData.append('file', fileSelected);
     
        Axios.post(
            "https://api.cloudinary.com/v1_1/deets/upload", formData).then(
                response=>{
                    console.log(response);
                    try {
                        Axios.post(`/api/v1/upload`,response).then(
                            res=>console.log(res)
                        )
                    } catch (error) {
                        console.error(error.message)
                    }
                   
                }
            ).catch(error=>console.log(error.message))}
    
   
        
    return(
        <div>
            <form className="videoUploadForm"  style={{margin:"200px"}} method="post" name="upload" action="/upload" encType="multipart/form-data">
                <input name="file" id="file" type="file" accept="video/*" onChange={(e)=>setFileSelected(e.target.files[0])} />
                <button className="input_button" type="button" onClick={uploadFile} >Upload</button>
            </form>
            <div>
                <VideoPlayer/>
            </div>
        </div>
    )
}
export default VideoUpload;

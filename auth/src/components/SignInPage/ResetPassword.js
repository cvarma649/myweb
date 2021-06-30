import React,{useState} from 'react';
import {BrowserRouter as Redirect} from "react-router-dom";
import "./ResetPassword.css"

function ResetPassword(props) {
    const [password, setPassword]= useState("")
    const [password1, setPassword1]= useState("")
    const [successMessage, setSuccessMessage]=useState("")
    const baseUrl = process.env.NODE_ENV==="production"? "/api/v1":"http://localhost:5000/api/v1"

     const reset= async(e)=>{
        e.preventDefault();
        const body = {password}   
        if(password.length>0){
        console.log("Reset in progress") 
        if(password===password1){  
        const res = await fetch(`${baseUrl}/reset-password/${props.match.params.jT}`,{
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        const parseRes= await res.json()
   
        if(parseRes.resetAuth===true){
        setSuccessMessage("Password Reset! You can Sign In Now!");
        return <Redirect to="/signin"/>
        }
        else{
            setSuccessMessage("something went wrong")
        }
        }
    else{
        setSuccessMessage("Password doesn't match")
    }}
        else{
            setSuccessMessage("Type Something")
        }
    }
   
     
    return (
        <div>
            <div className="reset-contain">
            <p className="title">Reset Password</p>
            <form className="login-form12" onSubmit={reset} method="POST">
                <div className="login-input12">
                    <label htmlFor="password">New Password</label>     
                    <input id="password" value={password} onChange={e=>setPassword(e.target.value)} type="password"/> 
                </div>
                <div className="login-input12">
                    <label htmlFor="password1"> Re-Type Password</label>
                    <input id="password1" value={password1} onChange={e=>setPassword1(e.target.value)} type="password"/>
                </div>
                <div className="success-message1"><p>{successMessage}</p></div>
                <div className="submit">
                <button  type="submit">Reset Password</button>
                </div>
                
            </form>
            </div>

        </div>
    )
}

export default ResetPassword;

import React,{useState} from 'react';
import {BrowserRouter as Redirect} from "react-router-dom";
import "./ResetPassword.css"

function ResetPassword(props) {
    const [password, setPassword]= useState("")
    const [password1, setPassword1]= useState("")
    const baseUrl = process.env.NODE_ENV==="production"? "/api/v1":"http://localhost:5000"

    const reset= async(e)=>{
        e.preventDefault();     
    }
    const b=`const body = {password}
       
    const res = await fetch("/api/v1/reset/${props.match.params.token}",{
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    })
    const parseRes = await res.json();
    console.log(parseRes)
    <Redirect to="/signin"/>
    })`
     
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
                <div className="submit">
                <button  type="submit">Reset Password</button>
                </div>
                
            </form>
            </div>

        </div>
    )
}

export default ResetPassword

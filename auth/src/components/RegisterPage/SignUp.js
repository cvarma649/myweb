import React from 'react';
import {useState} from "react";
import "./SignUp.css";

function SignUp({setAuth}) {
  const [email, setEmail]= useState("");
  const [name, setName] =useState("");
  const [password, setPassword]= useState("");
  const [errResponse, setErrResponse]=useState("")
  const baseUrl = process.env.NODE_ENV === "production" ? "/api/v1":"http://localhost:5000"

  const signUp = async(e)=>{
      const body={name, email, password}
    e.preventDefault(); 
    if(email.length>0 && password.length>0){
    try {
        const response = await fetch(`${baseUrl}/signup`,{
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(body)
    })
    const parseRes = await response.json();
    if(parseRes.token){
    localStorage.setItem("token", parseRes.token);
    localStorage.setItem("user_name", parseRes.user.name)
    setAuth(true);
    console.log(parseRes)
    }else{
        setErrResponse(parseRes)
    }
    } catch (error) {
        console.error(error.message)
    }}
    }
        
    return (
        <div>
            <div className="form-container">
            <p className="title">Register</p>
            <div className="form-layout">
            <form className="login-form" onSubmit={signUp}>
                <div className="login-input">
                        <label htmlFor="name">Name</label>
                        <input id="name" value={name} onChange={e=>setName(e.target.value)} type="text"/>
                </div>
                    <div className="login-input">
                        <label htmlFor="email">Email</label>
                        <input id="email" value={email} onChange={e=>setEmail(e.target.value)} type="email"/>
                    </div>
                    <div className="login-input">
                        <label htmlFor="password">Password</label>
                        <input id="password" value={password} onChange={e=>setPassword(e.target.value)}  type="password"/>
                        <div className="error-response1">{errResponse}</div>
                        <button id="signup" type="submit" >Sign Up</button>
                    </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default SignUp
